"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectKitButton } from "connectkit";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-cobalt group-hover:text-neon-green transition-all duration-500" />
          <span className="text-2xl font-black tracking-tighter text-white">
            SANA
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard Médico</Link>
          <Link href="#vault" className="hover:text-white transition-colors">Bóveda Digital</Link>
        </div>

        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => {
            return (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: isConnected ? "none" : "0 0 20px rgba(0, 71, 171, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={show}
                className={`${
                  isConnected 
                    ? "bg-white/5 border border-white/10 text-white" 
                    : "bg-cobalt text-white"
                } px-6 py-2.5 rounded-xl font-bold text-sm transition-all`}
              >
                {isConnected ? ensName ?? truncatedAddress : "Conectar Wallet"}
              </motion.button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>


    </nav>
  );
}
