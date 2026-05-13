"use client";

import { motion } from "framer-motion";
import { Zap, Lock, Database, Shield, Activity, Fingerprint } from "lucide-react";

const features = [
  {
    title: "IA Guardián",
    description: "Algoritmos avanzados que validan la coherencia de cada solicitud de datos médicos en tiempo real.",
    icon: <Zap className="w-8 h-8 text-neon-green" />,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/5 to-transparent",
    image: "/feature-ia.png" // Placeholder for visual reference
  },
  {
    title: "Registro Inmutable",
    description: "Cada acceso queda grabado para siempre en la blockchain de SANA.",
    icon: <Lock className="w-8 h-8 text-cobalt" />,
    className: "md:col-span-1 md:row-span-1 bg-white/5",
  },
  {
    title: "Soberanía Total",
    description: "Tú decides quién ve qué, cuándo y por qué. Sin intermediarios.",
    icon: <Fingerprint className="w-8 h-8 text-white/50" />,
    className: "md:col-span-1 md:row-span-2 bg-cobalt/10 border-cobalt/20",
  },
  {
    title: "Datos Fragmentados",
    description: "Tu historial médico está encriptado y distribuido, eliminando puntos únicos de fallo.",
    icon: <Database className="w-8 h-8 text-slate-400" />,
    className: "md:col-span-1 md:row-span-1 bg-white/5",
  },
  {
    title: "Auditoría Real-Time",
    description: "Monitorea quién está consultando tu información desde cualquier dispositivo.",
    icon: <Activity className="w-8 h-8 text-neon-green/50" />,
    className: "md:col-span-2 md:row-span-1 bg-white/5",
  }
];

export default function Features() {
  return (
    <section id="vault" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
          >
            La infraestructura de la <br />
            <span className="text-cobalt">confianza digital.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Combinamos inteligencia artificial con descentralización para crear la capa de seguridad definitiva para el sector salud.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`group p-8 rounded-[32px] border border-white/10 glass flex flex-col justify-between overflow-hidden relative ${feature.className}`}
            >
              {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/[0.02] blur-3xl rounded-full transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cobalt/10 blur-3xl rounded-full" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:border-neon-green/30 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-neon-green transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-lg max-w-[90%] mb-6">{feature.description}</p>
                
                {/* Extra visual for the large card: Mock Status List */}
                {feature.className.includes("md:col-span-2") && (
                  <div className="mt-auto space-y-3 opacity-40 group-hover:opacity-100 transition-all duration-700">
                    {[
                      { label: "Neural Validation", status: "Active" },
                      { label: "Coherence Check", status: "Verified" },
                      { label: "Pattern Analysis", status: "Running" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
                        <span className="text-[10px] font-black text-neon-green uppercase">{item.status}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Card Footer Decor for small cards */}

                {!feature.className.includes("md:col-span-2") && (
                  <div className="mt-auto pt-4 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Secure Node</span>
                  </div>
                )}
              </div>

              {/* Card Decor Background */}
              {feature.className.includes("md:col-span-2") && (
                <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Shield className="w-64 h-64 text-white" />
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
