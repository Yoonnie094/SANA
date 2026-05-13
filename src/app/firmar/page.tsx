"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { supabase } from "@/lib/supabase";
import { uploadAuthToIPFS } from "@/lib/ipfs";
import { motion } from "framer-motion";
import { ShieldCheck, User, Stethoscope, Clock, Database, ChevronRight, Loader2, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

function SignRequestContent() {
  const searchParams = useSearchParams();
  const reqParam = searchParams.get("req");
  
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [requestData, setRequestData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  useEffect(() => {
    if (reqParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(reqParam)));
        setRequestData(decoded);
      } catch (err) {
        console.error("Invalid request data", err);
      }
    }
  }, [reqParam]);

  const handleSign = async () => {
    if (!isConnected) {
      alert("Por favor, conecta tu billetera primero usando el botón superior.");
      return;
    }

    setIsSubmitting(true);
    try {
      const readableMessage = `SANA Protocol: Autorización de Acceso Médico

Por la presente, autorizo el acceso temporal a mis datos médicos de acuerdo a las siguientes condiciones:

👨‍⚕️ Médico: ${requestData.doctorName}
🏥 Especialidad: ${requestData.specialty}
📋 Datos Permitidos: ${requestData.requestedData.join(", ")}
⏱️ Tiempo de Acceso: ${requestData.accessTime}

Al firmar este mensaje, verifico que soy el propietario de esta identidad y otorgo los permisos temporalmente.`;

      const signature = await signMessageAsync({
        message: readableMessage,
      });

      const authPayload = {
        v: "2.0-web3-ipfs",
        patient: address,
        doctor: requestData.doctorName,
        specialty: requestData.specialty,
        permissions: requestData.requestedData,
        expiry: requestData.accessTime,
        signature: signature,
        aiProof: requestData.aiProof
      };

      const ipfsCid = await uploadAuthToIPFS(authPayload);

      const { error } = await supabase
        .from('qr_logs')
        .insert([
          { 
            doctor_name: requestData.doctorName, 
            specialty: requestData.specialty,
            requested_data: requestData.requestedData,
            access_time: requestData.accessTime,
            signature_proof: signature,
            // ipfs_cid: ipfsCid, // TODO: Add 'ipfs_cid' (text) column to 'qr_logs' table in Supabase
            created_at: new Date().toISOString()
          }
        ]);

      if (error) console.error("Supabase Log Error:", error.message);

      setSuccessData({ cid: ipfsCid, signature });

    } catch (err) {
      console.error("Signing Error:", err);
      alert("Error al firmar la transacción.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!requestData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
         <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
         <p className="text-[var(--text-muted)] text-lg">Cargando solicitud o URL inválida...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-32 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: "var(--text-main)" }}>
          Firma de <span className="text-blue-600">Autorización</span>
        </h1>
        <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
          Revisa los detalles y autoriza criptográficamente el acceso.
        </p>
      </motion.div>

      {successData ? (
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="p-10 rounded-[40px] shadow-2xl relative overflow-hidden text-center"
           style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)" }}
         >
           <ShieldCheck className="w-20 h-20 text-neon-green mx-auto mb-6" />
           <h2 className="text-2xl font-black text-[var(--text-main)] mb-2">¡Acceso Concedido!</h2>
           <p className="text-[var(--text-muted)] mb-8">El registro ha sido firmado y guardado en IPFS de forma inmutable.</p>
           
           <div className="bg-[var(--background)] border border-[var(--border-subtle)] p-6 rounded-3xl text-left space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">IPFS CID</span>
                <p className="font-mono text-sm text-[var(--cobalt)] truncate">{successData.cid}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">Signature Hash</span>
                <p className="font-mono text-sm text-[var(--text-main)] truncate">{successData.signature}</p>
              </div>
           </div>
         </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)]">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                 <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block">Médico Solicitante</span>
                <p className="font-bold text-[var(--text-main)] text-xl">{requestData.doctorName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block">Especialidad</span>
                  <p className="font-bold text-[var(--text-main)] text-sm">{requestData.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] block">Tiempo</span>
                  <p className="font-bold text-[var(--text-main)] text-sm">{requestData.accessTime}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 mb-4">
                 <Database className="w-5 h-5 text-blue-600" />
                 <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] block">Datos Solicitados</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {requestData.requestedData.map((d: string) => (
                  <span key={d} className="px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-bold border border-blue-600/20">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            
            {requestData.aiProof && !requestData.aiProof.isSuspicious && (
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex gap-4 items-start">
                 <ShieldCheck className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 block mb-1">Aprobado por IA Guardiana</span>
                    <p className="text-sm text-[var(--text-main)] opacity-80">{requestData.aiProof.reason || "Esta solicitud ha sido validada como coherente."}</p>
                 </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSign}
            disabled={isSubmitting || !isConnected}
            className="w-full py-5 rounded-[24px] font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-10 group"
            style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)", boxShadow: "0 10px 25px -5px rgba(37,99,235,0.4)" }}
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
            ) : (
              <>
                {isConnected ? "Autorizar y Firmar Mensaje" : "Conecta tu Wallet Arriba Primero"}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function SignRequestPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,71,171,0.1)_0%,transparent_70%)] -z-10" />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-12 h-12"/></div>}>
        <SignRequestContent />
      </Suspense>
    </main>
  );
}
