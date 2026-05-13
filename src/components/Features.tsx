"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Fingerprint, BrainCircuit, Database, Lock } from "lucide-react";

const bentoFeatures = [
  {
    title: "IA Guardián Predictivo",
    description: "Análisis en tiempo real con Llama 3 para detectar anomalías y asegurar la coherencia clínica en milisegundos.",
    icon: BrainCircuit,
    color: "text-purple-500",
    size: "lg",
    bg: "bg-purple-500/5",
  },
  {
    title: "Soberanía IPFS",
    description: "Almacenamiento descentralizado e inmutable.",
    icon: Database,
    color: "text-blue-500",
    size: "md",
    bg: "bg-blue-500/5",
  },
  {
    title: "WebAuthn Biometry",
    description: "Verificación física integrada on-chain.",
    icon: Fingerprint,
    color: "text-emerald-500",
    size: "md",
    bg: "bg-emerald-500/5",
  },
  {
    title: "Zero Knowledge Proofs",
    description: "Verifica identidades médicas sin revelar información privada mediante protocolos ZKP.",
    icon: ShieldCheck,
    color: "text-cobalt",
    size: "lg",
    bg: "bg-cobalt/5",
  },
  {
    title: "Global Link",
    description: "Acceso universal seguro.",
    icon: Globe,
    color: "text-cyan-500",
    size: "md",
    bg: "bg-cyan-500/5",
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 relative" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            className="text-[9px] font-black uppercase tracking-[0.6em] text-blue-600 dark:text-blue-400"
          >
            Capabilities & Performance
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-black tracking-tighter leading-tight"
            style={{ color: "var(--text-main)" }}
          >
            Diseñado para ser <br /> <span className="text-gradient">impenetrable.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {bentoFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`w-full ${feature.size === 'lg' ? 'md:w-[calc(60%-12px)]' : 'md:w-[calc(40%-12px)]'}`}
            >
              <div 
                className={`p-10 rounded-[3rem] relative overflow-hidden group transition-all duration-500 h-full w-full hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between`}
                style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" }}
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full transition-opacity opacity-0 group-hover:opacity-40 ${feature.bg}`} />
                
                <div className="space-y-8 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 
                      className="text-2xl font-black tracking-tight"
                      style={{ color: "var(--text-main)" }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-sm font-medium leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
