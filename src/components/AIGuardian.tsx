"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldCheck, Cpu, Activity, Loader2, FileText } from "lucide-react";

interface AIGuardianProps {
  specialty: string;
  requestedData: string[];
  isVisible: boolean;
  aiResult?: {
    isSuspicious: boolean;
    reason: string;
    coherenceScore: number;
    medicalSummary: string;
  };
  isLoading?: boolean;
}

export default function AIGuardian({ specialty, requestedData, isVisible, aiResult, isLoading }: AIGuardianProps) {
  const isSuspicious = aiResult?.isSuspicious ?? false;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative overflow-hidden p-8 rounded-[40px] border-2 shadow-2xl transition-colors duration-500 ${
            isLoading 
            ? "border-blue-600/30"
            : isSuspicious 
              ? "border-red-500/30" 
              : "border-green-500/30"
          }`}
          style={{ 
            backgroundColor: isLoading ? "var(--background)" : isSuspicious ? "var(--background)" : "var(--background)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)"
          }}
        >
          {/* Decorative scanner effect */}
          {!isLoading && (
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className={`absolute left-0 right-0 h-1 blur-md -z-10 ${
                isSuspicious ? "bg-red-500/40" : "bg-neon-green/40"
              }`}
            />
          )}

          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className={`p-4 rounded-3xl ${
              isLoading 
              ? "bg-cobalt/20 animate-pulse" 
              : isSuspicious ? "bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "bg-neon-green/20 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            }`}>
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-cobalt-light animate-spin" />
              ) : isSuspicious ? (
                <AlertTriangle className="w-8 h-8 text-red-400" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-neon-green" />
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-black tracking-tight ${
                  isLoading ? "text-cobalt-light" : isSuspicious ? "text-red-400" : "text-neon-green"
                }`}>
                  {isLoading 
                    ? "Consultando Red Neuronal..." 
                    : isSuspicious ? "Alerta de Privacidad Crítica" : "Análisis de Coherencia IA"}
                </h3>
                <div className="flex items-center gap-2">
                   <Activity className={`w-4 h-4 ${isSuspicious ? "text-red-400" : "text-green-500"} animate-pulse`} />
                   <span 
                     className="text-[10px] font-black uppercase tracking-widest"
                     style={{ color: "var(--text-muted)" }}
                   >Live Guard</span>
                </div>
              </div>

              <p 
                className="text-lg leading-relaxed"
                style={{ color: isSuspicious ? "var(--text-main)" : "var(--text-muted)" }}
              >
                {isLoading 
                  ? "SANA AI está evaluando la solicitud médica en tiempo real para garantizar tu soberanía de datos..."
                  : aiResult?.reason || "Análisis completado. Los datos solicitados son consistentes con el perfil profesional del médico."}
              </p>

              {aiResult?.medicalSummary && !isSuspicious && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl border flex gap-3 items-center"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)" }}
                >
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <span 
                      className="text-[10px] font-black uppercase tracking-widest block"
                      style={{ color: "var(--text-muted)" }}
                    >Resumen para Médico</span>
                    <p 
                      className="text-sm italic"
                      style={{ color: "var(--text-main)" }}
                    >"{aiResult.medicalSummary}"</p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div 
                  className="p-3 rounded-2xl border"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)" }}
                >
                  <div 
                    className="text-[8px] font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >Coherence Score</div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="flex-grow h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--border-subtle)" }}
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${aiResult?.coherenceScore || 0}%` }}
                        className={`h-full ${isSuspicious ? "bg-red-500" : "bg-green-500"}`}
                      />
                    </div>
                    <span 
                      className="text-[10px] font-bold uppercase"
                      style={{ color: "var(--text-main)" }}
                    >{aiResult?.coherenceScore || 0}%</span>
                  </div>
                </div>
                <div 
                  className="p-3 rounded-2xl border"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)" }}
                >
                  <div 
                    className="text-[8px] font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >Privacy Proof</div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-3 h-3 ${isSuspicious ? "text-red-400" : "text-green-500"}`} />
                    <span 
                      className="text-[10px] font-bold uppercase"
                      style={{ color: "var(--text-main)" }}
                    >Valid & Sovereign</span>
                  </div>
                </div>
              </div>
              
              {isSuspicious && (
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40">
                    Bloquear Acceso
                  </button>
                  <button 
                    className="border px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors backdrop-blur-sm"
                    style={{ backgroundColor: "var(--hero-card)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
                  >
                    Ver Protocolo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Neural link decoration */}
          <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-20">
             <Cpu className="w-4 h-4" style={{ color: "var(--text-main)" }} />
             <span 
               className="text-[8px] font-black uppercase tracking-widest"
               style={{ color: "var(--text-main)" }}
             >Neural Guardian v4.5</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

