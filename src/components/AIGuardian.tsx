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
          className={`relative overflow-hidden p-8 rounded-[40px] border-2 shadow-2xl glass transition-colors duration-500 ${
            isLoading 
            ? "border-cobalt/30 bg-cobalt/5"
            : isSuspicious 
              ? "border-red-500/30 bg-red-500/5" 
              : "border-neon-green/30 bg-neon-green/5"
          }`}
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
                   <Activity className={`w-4 h-4 ${isSuspicious ? "text-red-400" : "text-neon-green"} animate-pulse`} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Guard</span>
                </div>
              </div>

              <p className={`text-lg leading-relaxed ${isSuspicious ? "text-red-200/80" : "text-slate-300"}`}>
                {isLoading 
                  ? "SANA AI está evaluando la solicitud médica en tiempo real para garantizar tu soberanía de datos..."
                  : aiResult?.reason || "Análisis completado. Los datos solicitados son consistentes con el perfil profesional del médico."}
              </p>

              {aiResult?.medicalSummary && !isSuspicious && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-center"
                >
                  <FileText className="w-5 h-5 text-cobalt-light" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Resumen para Médico</span>
                    <p className="text-sm italic text-slate-400">"{aiResult.medicalSummary}"</p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Coherence Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${aiResult?.coherenceScore || 0}%` }}
                        className={`h-full ${isSuspicious ? "bg-red-500" : "bg-neon-green"}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase">{aiResult?.coherenceScore || 0}%</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Privacy Proof</div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-3 h-3 ${isSuspicious ? "text-red-400" : "text-neon-green"}`} />
                    <span className="text-[10px] font-bold text-white uppercase">Valid & Sovereign</span>
                  </div>
                </div>
              </div>
              
              {isSuspicious && (
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40">
                    Bloquear Acceso
                  </button>
                  <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm">
                    Ver Protocolo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Neural link decoration */}
          <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-20">
             <Cpu className="w-4 h-4 text-white" />
             <span className="text-[8px] font-black uppercase tracking-widest text-white">Neural Guardian v4.5</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

