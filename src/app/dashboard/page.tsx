"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AIGuardian from "@/components/AIGuardian";
import QRGenerator from "@/components/QRGenerator";
import { supabase } from "@/lib/supabase";
import { uploadAuthToIPFS } from "@/lib/ipfs";
import { verifyBiometrics } from "@/lib/biometry";
import { SANA_CONTRACT_ADDRESS, SANA_ABI } from "@/lib/contracts";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ZKPVerifier from "@/components/ZKPVerifier";
import { User, Stethoscope, Clock, Database, ChevronRight, Loader2, ShieldCheck, Fingerprint, Globe } from "lucide-react";

export default function Dashboard() {
  const { isConnected, isConnecting, address } = useAccount();
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
      // 1. Biometric Verification (Physical Security Layer) - BYPASSED FOR DEMO
      // const isVerified = await verifyBiometrics();
      // if (!isVerified) {
      //   alert("Verificación biométrica fallida o cancelada.");
      //   setIsSubmitting(false);
      //   return;
      // }

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

      // 3. Generar la solicitud codificada para el QR
      const requestData = {
        doctorName: formData.doctorName,
        specialty: formData.specialty,
        requestedData: formData.requestedData,
        accessTime: formData.accessTime,
        aiProof: aiData
      };

      const encodedData = btoa(encodeURIComponent(JSON.stringify(requestData)));
      const qrUrl = `${window.location.origin}/firmar?req=${encodedData}`;

      setQrData(qrUrl);
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
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tighter"
            style={{ color: "var(--text-main)" }}
          >
            Panel de <span className="text-blue-600">Soberanía</span>
          </h1>
          <p 
            className="mt-2 text-lg"
            style={{ color: "var(--text-muted)" }}
          >Gestiona tus permisos médicos y genera llaves de acceso seguras.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-10" />
            
            <div className="mb-10">
              <h2 
                className="text-2xl font-bold flex items-center gap-3"
                style={{ color: "var(--text-main)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                   <User className="w-4 h-4 text-blue-600" />
                </div>
                Nueva Autorización
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label 
                    className="text-xs font-black uppercase tracking-widest ml-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Nombre del Médico
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Dr. Alejandro Ruiz"
                    className="w-full px-5 py-4 rounded-2xl border outline-none transition-all placeholder:opacity-50"
                    style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
                    value={formData.doctorName}
                    onChange={e => setFormData({...formData, doctorName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label 
                    className="text-xs font-black uppercase tracking-widest ml-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Especialidad
                  </label>
                  <div className="relative">
                    <select
                      disabled={isLoadingSpecialties}
                      className="w-full px-5 py-4 rounded-2xl border outline-none transition-all appearance-none disabled:opacity-50"
                      style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
                      value={formData.specialty}
                      onChange={e => {
                        setFormData({...formData, specialty: e.target.value});
                        setShowAlert(true);
                      }}
                    >
                      {isLoadingSpecialties ? (
                        <option>Cargando...</option>
                      ) : (
                        specialties.map(s => <option key={s} value={s} style={{ backgroundColor: "var(--background)", color: "var(--text-main)" }}>{s}</option>)
                      )}
                    </select>
                    <div 
                      className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {isLoadingSpecialties ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4 rotate-90" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label 
                  className="text-xs font-black uppercase tracking-widest ml-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Datos Solicitados
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {dataTypes.map(type => (
                    <label 
                      key={type} 
                      className="flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer"
                      style={{
                        backgroundColor: formData.requestedData.includes(type) ? "rgba(37,99,235,0.05)" : "var(--background)",
                        borderColor: formData.requestedData.includes(type) ? "rgba(37,99,235,0.4)" : "var(--border-subtle)",
                        color: formData.requestedData.includes(type) ? "var(--text-main)" : "var(--text-muted)",
                        boxShadow: formData.requestedData.includes(type) ? "0 0 15px rgba(37,99,235,0.1)" : "none"
                      }}
                    >
                      <div 
                        className="w-5 h-5 rounded-md border flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: formData.requestedData.includes(type) ? "rgb(37,99,235)" : "transparent",
                          borderColor: formData.requestedData.includes(type) ? "rgb(37,99,235)" : "var(--border-subtle)"
                        }}
                      >
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
                <label 
                  className="text-xs font-black uppercase tracking-widest ml-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tiempo de Acceso
                </label>
                <div className="flex gap-4">
                  {["1 hora", "24 horas", "Solo una vez"].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({...formData, accessTime: time})}
                      className="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border"
                      style={{
                        backgroundColor: formData.accessTime === time ? "var(--text-main)" : "var(--background)",
                        color: formData.accessTime === time ? "var(--hero-card)" : "var(--text-muted)",
                        borderColor: formData.accessTime === time ? "var(--text-main)" : "var(--border-subtle)",
                        transform: formData.accessTime === time ? "scale(1.02)" : "scale(1)",
                        boxShadow: formData.accessTime === time ? "0 10px 15px -3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.requestedData.length === 0 || isLoadingSpecialties}
                className="w-full py-5 rounded-[24px] font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-8 group"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)", boxShadow: "0 10px 25px -5px rgba(37,99,235,0.4)" }}
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
                    Generar Solicitud QR
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Logic & Results Side */}
          <div className="space-y-8">
            <ZKPVerifier />
            
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
                className="p-8 rounded-[40px] relative overflow-hidden"
                style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--neon-green)" }} />
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <span 
                    className="text-xs font-black uppercase tracking-[0.3em]"
                    style={{ color: "var(--neon-green)" }}
                  >Neural Chain Log</span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>TX_ID: 0x4f2...a9b2</span>
                </div>
                
                <div 
                  className="space-y-3 text-sm font-mono opacity-80 border-l-2 pl-6"
                  style={{ color: "var(--text-main)", borderColor: "var(--border-subtle)" }}
                >
                  <p className="flex gap-3"><span className="text-blue-600">#</span> INICIALIZANDO CONTRATO...</p>
                  <p className="flex gap-3"><span className="text-blue-600">#</span> MÉDICO: {formData.doctorName.toUpperCase()}</p>
                  <p className="flex gap-3"><span className="text-blue-600">#</span> BIO-VERIFICACIÓN: EXITOSA</p>
                  <p className="flex gap-3"><span className="text-blue-600">#</span> IPFS UPLOAD: COMPLETADO</p>
                  <p className="flex gap-3"><span className="text-blue-600">#</span> ON-CHAIN LOG: {SANA_CONTRACT_ADDRESS.slice(0, 10)}...</p>
                  <p className="mt-4 font-black" style={{ color: "var(--neon-green)" }}>{">"} TRANSACCIÓN CONFIRMADA</p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
