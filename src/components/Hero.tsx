"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Smartphone, Lock, Zap } from "lucide-react";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDashboardClick = () => {
    if (isConnected) router.push("/dashboard");
    else setOpen(true);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 transition-colors duration-1000"
      style={{ backgroundColor: "var(--hero-bg)" }}
    >
      {/* Luces de fondo suaves */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/10 dark:bg-cobalt/20 blur-[120px] rounded-full transition-colors duration-1000" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/10 dark:bg-cyber-purple/20 blur-[100px] rounded-full transition-colors duration-1000" />
      
      {mounted && (
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 shadow-sm transition-colors duration-500"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Health Protocol 1.0</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] transition-colors duration-500"
                style={{ color: "var(--text-main)" }}
              >
                Tu salud, <br />
                <span className="text-gradient">soberana.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl max-w-xl leading-relaxed font-medium transition-colors duration-500"
                style={{ color: "var(--text-muted)" }}
              >
                Protección de ADN digital con Inteligencia Artificial y Web3.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-6 pt-4"
              >
                <button 
                  onClick={handleDashboardClick}
                  className="group px-12 py-6 rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-4"
                  style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
                >
                  {isConnected ? "Mi Dashboard" : "Empezar Ahora"}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  className="px-10 py-6 rounded-[2.5rem] border font-black text-lg transition-all flex items-center justify-center gap-3 shadow-sm"
                  style={{ backgroundColor: "var(--hero-card)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
                >
                  <Smartphone className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                  SANA App
                </button>
              </motion.div>

              <div className="flex gap-12">
                 <div className="flex items-center gap-3 opacity-60">
                   <Zap className="w-5 h-5 text-blue-600 dark:text-green-400" />
                   <span 
                     className="text-[10px] font-black uppercase tracking-widest"
                     style={{ color: "var(--text-main)" }}
                   >Secure Sign</span>
                 </div>
                 <div className="flex items-center gap-3 opacity-60">
                   <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                   <span 
                     className="text-[10px] font-black uppercase tracking-widest"
                     style={{ color: "var(--text-main)" }}
                   >ZK-Identity</span>
                 </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:block relative"
            >
              <div 
                className="p-14 rounded-[4rem] shadow-2xl border relative overflow-hidden transition-colors duration-500"
                style={{ backgroundColor: "var(--hero-card)", borderColor: "var(--border-subtle)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 dark:from-blue-500/5 to-transparent" />
                
                <div className="flex justify-between items-start mb-20 relative">
                  <div className="w-20 h-20 bg-blue-600 dark:bg-gradient-to-br dark:from-cobalt dark:to-cyber-purple rounded-3xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em]"
                      style={{ color: "var(--text-main)" }}
                    >Health Network</p>
                    <p className="text-4xl font-black text-blue-600 dark:text-green-400 tracking-tighter">SECURED</p>
                  </div>
                </div>

                <div className="space-y-10 relative">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-4">
                      <div 
                        className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60"
                        style={{ color: "var(--text-main)" }}
                      >
                        <span>Neural Layer {i}</span>
                        <span className={i === 1 ? "text-blue-600 dark:text-green-400" : i === 2 ? "text-blue-600 dark:text-purple-400" : "text-blue-600 dark:text-cyan-400"}>Active</span>
                      </div>
                      <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${60 + i * 10}%` }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 1.5 }}
                          className={`h-full ${i === 1 ? "bg-blue-600 dark:bg-green-400" : i === 2 ? "bg-blue-600 dark:bg-purple-400" : "bg-blue-600 dark:bg-cyan-400"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 p-8 rounded-[2.5rem] bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 flex items-center justify-between transition-colors duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                    <span 
                      className="text-xs font-black uppercase tracking-[0.2em] opacity-80"
                      style={{ color: "var(--text-main)" }}
                    >Neural Link Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
