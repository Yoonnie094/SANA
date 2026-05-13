"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Share2, ScanLine } from "lucide-react";

interface QRGeneratorProps {
  data: string;
  isVisible: boolean;
}

export default function QRGenerator({ data, isVisible }: QRGeneratorProps) {
  if (!isVisible) return null;

  let isWeb3 = false;
  let patientAddr = "";
  let proof = "";
  let cid = "";

  try {
    const parsed = JSON.parse(data);
    if (parsed.v === "2.0-web3") {
      isWeb3 = true;
      patientAddr = parsed.patient;
      proof = parsed.proof;
      cid = parsed.cid;
    }
  } catch (e) {
    // Standard data
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 p-10 rounded-[48px] relative overflow-hidden"
      style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cobalt to-transparent opacity-50" />
      
      {isWeb3 && (
        <div className="absolute top-4 left-6 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-neon-green">Sovereign Proof Active</span>
        </div>
      )}

      <div className="relative group">
        {/* Frame corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-neon-green rounded-tl-xl" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-neon-green rounded-tr-xl" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-neon-green rounded-bl-xl" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-neon-green rounded-br-xl" />

        <div className="bg-white p-6 rounded-3xl shadow-[0_0_50px_rgba(57,255,20,0.1)] relative overflow-hidden hover:scale-105 transition-transform cursor-pointer" title="Haz clic para abrir el link del QR">
          <a href={data.startsWith("http") ? data : "#"} target={data.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
            <QRCodeSVG
              value={data}
              size={220}
              level={"H"}
              includeMargin={false}
            />
            {/* Scanning line animation */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-0.5 bg-neon-green shadow-[0_0_10px_#39FF14] z-10 pointer-events-none"
            />
          </a>
        </div>
      </div>

      <div className="text-center w-full">
        <h4 
          className="text-2xl font-black tracking-tight"
          style={{ color: "var(--text-main)" }}
        >Acceso Encriptado</h4>
        {isWeb3 ? (
          <div 
            className="mt-4 p-4 rounded-2xl border text-left space-y-2"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)" }}
          >
             <div className="flex justify-between text-[10px] font-bold">
                <span className="uppercase" style={{ color: "var(--text-muted)" }}>Patient</span>
                <span className="font-mono" style={{ color: "var(--text-main)" }}>{patientAddr.slice(0, 6)}...{patientAddr.slice(-4)}</span>
             </div>
             <div className="flex justify-between text-[10px] font-bold">
                <span className="uppercase" style={{ color: "var(--text-muted)" }}>Vault CID</span>
                <span className="font-mono truncate ml-4" style={{ color: "var(--cobalt)" }}>{cid}</span>
             </div>
             <div className="flex justify-between text-[10px] font-bold">
                <span className="uppercase" style={{ color: "var(--text-muted)" }}>Sig Proof</span>
                <span className="font-mono" style={{ color: "var(--neon-green)" }}>VERIFIED ✓</span>
             </div>
          </div>
        ) : (
          <p 
            className="text-sm mt-2 max-w-[200px] mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Escanea este código para autorizar el acceso temporal a tu historial.
          </p>
        )}
      </div>


      <div className="flex gap-4 w-full">
        <button 
          className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all font-bold border hover:-translate-y-1"
          style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
        >
          <Download className="w-5 h-5 text-blue-600" />
          PNG
        </button>
        <button 
          className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all font-bold hover:-translate-y-1 shadow-xl"
          style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
        >
          <Share2 className="w-5 h-5" />
          Enviar
        </button>
      </div>

      <div 
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
         <ScanLine className="w-3 h-3" />
         Ready for scanning
      </div>
    </motion.div>
  );
}

