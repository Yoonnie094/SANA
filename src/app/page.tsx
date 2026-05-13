"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { motion } from "framer-motion";
import { Smartphone, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-neon-green selection:text-slate-900">
      <Navbar />
      
      <Hero />
      
      <Features />

      {/* Trust & Stats Section */}
      <section className="py-24 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Data Integrity", value: "100%" },
              { label: "Latency", value: "<50ms" },
              { label: "Encryption", value: "AES-256" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto glass rounded-[64px] p-16 md:p-24 text-center border-white/10 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-20 h-20 text-neon-green mx-auto mb-12 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              El futuro de la salud <br /> es soberano.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Únete a la red descentralizada de SANA y recupera el control de tu información médica hoy mismo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all">
                Obtener Acceso Beta
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-3">
                Ver Whitepaper
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cobalt" />
            <span className="font-black text-xl tracking-tighter text-white">SANA</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © 2026 SANA. Built for Patient Privacy and Data Ownership.
          </p>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">GitHub</a>
             <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

