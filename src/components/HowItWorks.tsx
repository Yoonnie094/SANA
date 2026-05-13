"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldAlert, Cpu, Database, Activity } from "lucide-react";

const steps = [
  {
    title: "Soberanía de Identidad",
    subtitle: "MINTING SBT",
    description: "El médico genera su identidad Soulbound (SBT). Inmutable e intransferible.",
    icon: UserCheck,
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Análisis Neural",
    subtitle: "IA Llama 3",
    description: "Nuestra IA analiza el historial para detectar inconsistencias médicas.",
    icon: Cpu,
    color: "from-purple-600 to-fuchsia-600",
  },
  {
    title: "Autorización Biométrica",
    subtitle: "EIP-712 + WebAuthn",
    description: "El paciente aprueba el acceso con su huella o rostro, firmado on-chain.",
    icon: ShieldAlert,
    color: "from-emerald-600 to-teal-600",
  },
  {
    title: "Bóveda Descentralizada",
    subtitle: "IPFS / FILECOIN",
    description: "Los datos se sellan con un hash único y se almacenan de forma distribuida.",
    icon: Database,
    color: "from-blue-600 to-blue-800",
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-black uppercase text-[9px] tracking-[0.4em] text-blue-600 dark:text-blue-400">
              <Activity className="w-4 h-4" />
              Protocolo SANA v1.0
            </div>
            <h2 
              className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
              style={{ color: "var(--text-main)" }}
            >
              ¿Cómo funciona <br /> <span className="text-gradient">el mañana?</span>
            </h2>
          </div>
          <p 
            className="text-sm font-medium max-w-[320px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Una arquitectura diseñada paso a paso para garantizar la soberanía total de tus registros clínicos.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Línea conectora central (solo desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative group ${index % 2 !== 0 ? 'lg:translate-y-12' : 'lg:-translate-y-12'}`}
              >
                <div 
                  className="p-8 rounded-[2.5rem] flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full bg-white relative overflow-hidden"
                  style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div 
                    className="text-[9px] font-black uppercase tracking-widest mb-2 opacity-60 relative z-10"
                    style={{ color: "var(--text-main)" }}
                  >
                     {step.subtitle}
                  </div>
                  <h3 
                    className="text-xl font-black mb-4 leading-tight group-hover:text-blue-500 transition-colors relative z-10"
                    style={{ color: "var(--text-main)" }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-xs font-medium leading-relaxed relative z-10"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.description}
                  </p>

                  {/* Nodo de conexión con la línea central */}
                  <div className="hidden lg:block absolute top-[calc(50%+3rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
