"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, Smartphone, Lock, Cpu } from "lucide-react";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      setOpen(true);
    }
  };

  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,71,171,0.15)_0%,transparent_70%)] -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cobalt/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-green/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md text-neon-green px-4 py-2 rounded-full text-sm font-bold mb-8 neon-glow"
            >
              <Cpu className="w-4 h-4" />
              <span className="tracking-wider uppercase text-[10px]">AI-Powered Privacy Layer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Tu salud, <br />
              <span className="text-cobalt">tu soberanía.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed"
            >
              Protege tus datos médicos frente a filtraciones masivas. SANA es la bóveda digital que devuelve el control total al paciente mediante IA Guardián y registros inmutables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button 
                onClick={handleDashboardClick}
                className="bg-cobalt text-white px-10 py-5 rounded-2xl font-black text-lg cobalt-glow hover:scale-105 transition-all flex items-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">
                  {isConnected ? "Ir al Dashboard" : "Explorar Dashboard"}
                </span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-sm">
                <Smartphone className="w-6 h-6 text-neon-green" />
                Download App
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative perspective-1000 hidden lg:block"
          >
            <div className="relative animate-float">
              {/* Main Vault UI Mockup */}
              <div className="glass p-8 rounded-[40px] border-white/10 shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="w-12 h-12 bg-cobalt rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Security Status</p>
                    <p className="text-neon-green font-black text-lg uppercase tracking-tighter">Active Protection</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-white/5 rounded-full w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 60 + 30}%` }}
                        transition={{ delay: 1 + i * 0.2, duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-cobalt to-cobalt-light"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                     <span className="text-xs font-bold text-slate-400 uppercase">Guardian Neural Link</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <div className="text-2xl font-black text-white">99.9%</div>
                      <div className="text-[10px] text-neon-green font-bold uppercase tracking-widest">Coherence Rate</div>
                   </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass p-5 rounded-2xl border-neon-green/20 z-20 shadow-xl"
              >
                <Lock className="w-6 h-6 text-neon-green" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass p-5 rounded-2xl border-cobalt/20 z-20 shadow-xl"
              >
                <div className="w-6 h-6 rounded-full bg-cobalt" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
