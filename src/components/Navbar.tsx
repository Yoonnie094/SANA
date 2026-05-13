"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6">
      <div 
        className="max-w-6xl mx-auto backdrop-blur-md rounded-3xl px-8 py-4 flex items-center justify-between transition-colors duration-500 shadow-xl shadow-blue-500/5"
        style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border-subtle)", borderWidth: "1px" }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span 
            className="text-2xl font-black tracking-tighter transition-colors duration-500"
            style={{ color: "var(--text-main)" }}
          >
            SANA
          </span>
        </Link>
        
        <div 
          className="hidden md:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:text-blue-500 transition-colors">Inicio</Link>
          <Link href="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link>
          <Link href="/register-doctor" className="hover:text-blue-500 transition-colors">Soy Médico</Link>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => (
              <button
                onClick={show}
                className="px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all active:scale-95"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
              >
                {isConnected ? ensName ?? truncatedAddress : "Conectar Wallet"}
              </button>
            )}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </nav>
  );
}
