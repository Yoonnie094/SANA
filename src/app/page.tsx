"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import { ArrowRight, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      {/* NUEVA SECCIÓN CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900/20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/50 dark:bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            Tu ADN. Tus Reglas. <br />
            <span className="text-blue-200">El futuro es hoy.</span>
          </h2>
          
          <p className="text-xl text-blue-100/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Únete a la primera infraestructura mundial que te devuelve el control absoluto sobre tu información genética y médica.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <button className="px-12 py-6 rounded-[2.5rem] bg-white text-blue-600 font-black text-xl hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-4">
              Crear Bóveda Médica
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-6 rounded-[2.5rem] bg-blue-700/50 dark:bg-white/5 border border-white/20 text-white font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center">
              Leer Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Refined Compact Footer */}
      <footer 
        className="py-20 px-6 border-t"
        style={{ backgroundColor: "var(--hero-bg)", borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span 
                className="text-xl font-black tracking-tighter"
                style={{ color: "var(--text-main)" }}
              >SANA</span>
            </div>
            <p 
              className="text-[13px] font-medium leading-relaxed max-w-[200px]"
              style={{ color: "var(--text-muted)" }}
            >
              Infraestructura de inteligencia médica soberana impulsada por IA y Web3.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase text-[8px] tracking-[0.3em] opacity-40" style={{ color: "var(--text-main)" }}>Ecosistema</h4>
            <ul className="space-y-3 text-[13px] font-bold" style={{ color: "var(--text-muted)" }}>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Protocolo SANA</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Bóveda Digital</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Gobernanza DAO</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase text-[8px] tracking-[0.3em] opacity-40" style={{ color: "var(--text-main)" }}>Recursos</h4>
            <ul className="space-y-3 text-[13px] font-bold" style={{ color: "var(--text-muted)" }}>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Whitepaper v1.0</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Auditorías ZKP</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Developer Portal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase text-[8px] tracking-[0.3em] opacity-40" style={{ color: "var(--text-main)" }}>Redes</h4>
            <div className="flex gap-3">
               <div 
                 className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer text-sm border"
                 style={{ backgroundColor: "var(--hero-card)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
               >𝕏</div>
               <div 
                 className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer text-sm border"
                 style={{ backgroundColor: "var(--hero-card)", borderColor: "var(--border-subtle)", color: "var(--text-main)" }}
               >👾</div>
            </div>
          </div>
        </div>
        <div 
          className="max-w-6xl mx-auto pt-10 mt-16 border-t text-center text-[8px] font-black uppercase tracking-[0.4em]"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
           © 2026 SANA MEDICAL INTELLIGENCE. GLOBAL SOVEREIGNTY SECURED.
        </div>
      </footer>
    </main>
  );
}
