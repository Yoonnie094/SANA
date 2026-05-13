"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Loader2, QrCode, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function ZKPVerifier() {
  const [request, setRequest] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "verifying" | "success">("idle");

  const generateRequest = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/zkp/generate-request");
      const data = await res.json();
      setRequest(data);
      setStatus("verifying");
    } catch (error) {
      console.error("Error generating ZKP request:", error);
      setStatus("idle");
    }
  };

  return (
    <div 
      className="p-8 rounded-[40px] relative overflow-hidden"
      style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 
          className="text-xl font-bold flex items-center gap-3"
          style={{ color: "var(--text-main)" }}
        >
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          Verificación Polygon ID
        </h3>
        <span 
          className="text-[10px] font-black uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >ZKP Protocol</span>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p 
              className="text-sm mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Para garantizar la seguridad, el médico debe demostrar que posee una Licencia Médica válida sin revelar sus datos personales mediante una Prueba de Conocimiento Cero.
            </p>
            <button
              onClick={generateRequest}
              className="w-full py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
              style={{ 
                backgroundColor: "rgba(147, 51, 234, 0.1)", 
                borderColor: "rgba(147, 51, 234, 0.3)", 
                color: "var(--text-main)" 
              }}
            >
              <QrCode className="w-4 h-4 text-purple-500" />
              Generar Solicitud ZKP
            </button>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8"
          >
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mb-4" />
            <p 
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >Generando Circuito ZK...</p>
          </motion.div>
        )}

        {status === "verifying" && request && (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="p-4 bg-white rounded-3xl">
              <QRCodeSVG value={JSON.stringify(request)} size={180} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2 animate-pulse">Esperando Prueba del Médico...</p>
              <p className="text-[10px] text-slate-500 max-w-[200px]">El médico debe escanear este QR con su Polygon ID Wallet.</p>
            </div>
            <button 
              onClick={() => setStatus("success")} // Simulación para el demo
              className="text-[10px] text-slate-600 underline hover:text-slate-400"
            >
              (Simular Verificación Exitosa)
            </button>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-4"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(57,255,20,0.2)]" style={{ backgroundColor: "rgba(57,255,20,0.1)" }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: "var(--neon-green)" }} />
            </div>
            <h4 
              className="text-lg font-black mb-2"
              style={{ color: "var(--text-main)" }}
            >Médico Verificado</h4>
            <p 
              className="text-xs text-center"
              style={{ color: "var(--text-muted)" }}
            >La prueba ZKP ha validado la Licencia Médica de forma privada y soberana.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
