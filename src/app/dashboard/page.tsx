"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AIGuardian from "@/components/AIGuardian";
import QRGenerator from "@/components/QRGenerator";
import { supabase } from "@/lib/supabase";
import { uploadAuthToIPFS } from "@/lib/ipfs";
import { verifyBiometrics } from "@/lib/biometry";
import { motion } from "framer-motion";
import { useAccount, useSignTypedData } from "wagmi";
import { useRouter } from "next/navigation";
import { User, Stethoscope, Clock, Database, ChevronRight, Loader2, ShieldCheck, Fingerprint } from "lucide-react";

export default function Dashboard() {
  const { isConnected, isConnecting, address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  const [formData, setFormData] = useState({
    doctorName: "",
    specialty: "",
    accessTime: "1 hora",
    requestedData: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>(["General", "Dermatología", "Cardiología", "Pediatría", "Neurología"]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);
  
  // AI States
  const [aiResult, setAiResult] = useState<any>(null);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  // Fetch specialties from Supabase
  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const { data, error } = await supabase
          .from('specialties')
          .select('name')
          .order('name', { ascending: true });

        if (error) {
          console.warn("Supabase error (using fallbacks):", error.message);
          return;
        }
        
        if (data && data.length > 0) {
          const list = data.map(s => s.name);
          setSpecialties(list);
          setFormData(prev => ({ ...prev, specialty: list[0] }));
        }
      } catch (err) {
        console.error("Error fetching specialties (check your Supabase URL/Key):", err);
      } finally {
        setIsLoadingSpecialties(false);
      }
    }

    fetchSpecialties();
  }, []);

  const dataTypes = [
    "Diagnósticos",
    "Alergias",
    "Medicamentos",
    "Historial Psicológico",
    "Resultados de Laboratorio",
    "Imágenes Médicas"
  ];

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      requestedData: prev.requestedData.includes(type)
        ? prev.requestedData.filter(t => t !== type)
        : [...prev.requestedData, type]
    }));
    setShowAlert(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Biometric Verification (Physical Security Layer)
      const isVerified = await verifyBiometrics();
      if (!isVerified) {
        alert("Verificación biométrica fallida o cancelada.");
        setIsSubmitting(false);
        return;
      }

      // 2. AI Pre-Analysis (Neural Guardian)
      setIsAnalyzingAI(true);
      const aiResponse = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const aiData = await aiResponse.json();
      setAiResult(aiData);
      setIsAnalyzingAI(false);

      if (aiData.isSuspicious) {
        // En un caso real, podríamos bloquear aquí, pero dejamos que el usuario decida o el AIGuardian lo muestre.
        console.warn("AI detected suspicious activity:", aiData.reason);
      }

      // 3. EIP-712 Signature (Web3 Authorization Layer)
      const domain = {
        name: 'SANA Sovereignty',
        version: '1',
        chainId: 1, 
      };

      const types = {
        Authorization: [
          { name: 'doctor', type: 'string' },
          { name: 'specialty', type: 'string' },
          { name: 'data', type: 'string[]' },
          { name: 'expiry', type: 'string' },
        ],
      };

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'Authorization',
        message: {
          doctor: formData.doctorName,
          specialty: formData.specialty,
          data: formData.requestedData,
          expiry: formData.accessTime,
        },
      });

      setIsSigned(true);

      // 4. Upload to IPFS (Data Sovereignty Layer)
      const authPayload = {
        v: "2.0-web3-ipfs",
        patient: address,
        doctor: formData.doctorName,
        specialty: formData.specialty,
        permissions: formData.requestedData,
        expiry: formData.accessTime,
        signature: signature,
        aiProof: aiData
      };

      const ipfsCid = await uploadAuthToIPFS(authPayload);

      // 5. Registrar en Supabase (Auditoría Rápida)
      const { error } = await supabase
        .from('qr_logs')
        .insert([
          { 
            doctor_name: formData.doctorName, 
            specialty: formData.specialty,
            requested_data: formData.requestedData,
            access_time: formData.accessTime,
            signature_proof: signature,
            ipfs_cid: ipfsCid,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) console.error("Supabase Log Error:", error.message);

      // 6. Generar QR con Prueba Criptográfica e IPFS
      const secureData = {
        ...authPayload,
        cid: ipfsCid
      };

      setQrData(JSON.stringify(secureData));
      setShowQR(true);
    } catch (err) {
      console.error("Web3/AI Auth Error:", err);
      alert("Error en el proceso de autorización. Revisa tu consola.");
    } finally {
      setIsSubmitting(false);
      setIsAnalyzingAI(false);
    }
  };


  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,71,171,0.1)_0%,transparent_70%)] -z-10" />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Panel de <span className="text-cobalt">Soberanía</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Gestiona tus permisos médicos y genera llaves de acceso seguras.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 md:p-12 rounded-[40px] border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cobalt/5 blur-3xl -z-10" />
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cobalt/20 flex items-center justify-center">
                   <User className="w-4 h-4 text-cobalt-light" />
                </div>
                Nueva Autorización
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    Nombre del Médico
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Dr. Alejandro Ruiz"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt outline-none transition-all placeholder:text-slate-600"
                    value={formData.doctorName}
                    onChange={e => setFormData({...formData, doctorName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    Especialidad
                  </label>
                  <div className="relative">
                    <select
                      disabled={isLoadingSpecialties}
                      className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt outline-none transition-all appearance-none disabled:opacity-50"
                      value={formData.specialty}
                      onChange={e => {
                        setFormData({...formData, specialty: e.target.value});
                        setShowAlert(true);
                      }}
                    >
                      {isLoadingSpecialties ? (
                        <option>Cargando...</option>
                      ) : (
                        specialties.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)
                      )}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      {isLoadingSpecialties ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4 rotate-90" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                  Datos Solicitados
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {dataTypes.map(type => (
                    <label 
                      key={type} 
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.requestedData.includes(type)
                        ? "bg-cobalt/10 border-cobalt/40 text-white shadow-[0_0_15px_rgba(0,71,171,0.1)]"
                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        formData.requestedData.includes(type)
                        ? "bg-cobalt border-cobalt"
                        : "bg-transparent border-white/20"
                      }`}>
                        {formData.requestedData.includes(type) && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.requestedData.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                      />
                      <span className="text-sm font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                  Tiempo de Acceso
                </label>
                <div className="flex gap-4">
                  {["1 hora", "24 horas", "Solo una vez"].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({...formData, accessTime: time})}
                      className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border ${
                        formData.accessTime === time 
                        ? "bg-white text-slate-900 border-white shadow-xl scale-[1.02]" 
                        : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.requestedData.length === 0 || isLoadingSpecialties}
                className="w-full bg-cobalt text-white py-5 rounded-[24px] font-black text-lg cobalt-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-8 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                    <span className="animate-pulse">
                      {isAnalyzingAI ? "Analizando Seguridad IA..." : "Validando Blockchain..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Autorizar y Firmar
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Logic & Results Side */}
          <div className="space-y-8">
            <AIGuardian 
              specialty={formData.specialty} 
              requestedData={formData.requestedData} 
              isVisible={showAlert || formData.requestedData.length > 0} 
              aiResult={aiResult}
              isLoading={isAnalyzingAI}
            />
            
            <QRGenerator data={qrData} isVisible={showQR} />

            {/* Blockchain Audit Log Simulation */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 glass rounded-[40px] border-white/5 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-neon-green">Neural Chain Log</span>
                  <span className="text-[10px] text-slate-500 font-mono">TX_ID: 0x4f2...a9b2</span>
                </div>
                
                <div className="space-y-3 text-sm font-mono opacity-80 border-l-2 border-white/10 pl-6">
                  <p className="flex gap-3"><span className="text-cobalt">#</span> INICIALIZANDO CONTRATO...</p>
                  <p className="flex gap-3"><span className="text-cobalt">#</span> MÉDICO: {formData.doctorName.toUpperCase()}</p>
                  <p className="flex gap-3"><span className="text-cobalt">#</span> BIO-VERIFICACIÓN: EXITOSA</p>
                  <p className="flex gap-3"><span className="text-cobalt">#</span> IPFS UPLOAD: COMPLETADO</p>
                  <p className="text-neon-green mt-4 font-black">{">"} TRANSACCIÓN CONFIRMADA</p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
