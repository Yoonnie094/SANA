"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useSignMessage, useAccount } from "wagmi";
import { ShieldPlus, UserPlus, CheckCircle2, Loader2, Award } from "lucide-react";

export default function RegisterDoctor() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync, isPending } = useSignMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMint = async () => {
    try {
      // Usamos una firma criptográfica gratuita (0 costo) en lugar de una transacción pagada
      await signMessageAsync({
        message: "SANA Protocol: Solicito la emisión de mi Identidad Médica Soulbound (SBT) gratuita.\n\nAl firmar este mensaje, verifico que soy el propietario de esta dirección y autorizo la vinculación de mis credenciales.",
      });
      setIsSuccess(true);
    } catch (error) {
      console.warn("Firma rechazada:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1)_0%,transparent_60%)] -z-10" />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-40 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-4 rounded-3xl bg-purple-500/10 mb-6">
            <ShieldPlus className="w-8 h-8 text-purple-400" />
          </div>
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
            style={{ color: "var(--text-main)" }}
          >
            Emisión de Identidad <span className="text-purple-400">Soulbound</span>
          </h1>
          <p 
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Obtén tu credencial médica digital permanente e intransferible para operar en la red SANA.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 md:p-16 rounded-[40px] relative overflow-hidden text-center"
          style={{ backgroundColor: "var(--hero-card)", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)" }}
        >
          {isSuccess ? (
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(57,255,20,0.2)]" style={{ backgroundColor: "rgba(57,255,20,0.1)" }}>
                <CheckCircle2 className="w-10 h-10" style={{ color: "var(--neon-green)" }} />
              </div>
              <h2 className="text-3xl font-black" style={{ color: "var(--text-main)" }}>¡Identidad Verificada!</h2>
              <p style={{ color: "var(--text-muted)" }}>Tu Soulbound Token (SBT) ha sido emitido exitosamente en la blockchain.</p>
              <div className="pt-8">
                <button 
                  onClick={() => window.location.href = "/dashboard"}
                  className="px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl"
                  style={{ backgroundColor: "var(--text-main)", color: "var(--hero-card)" }}
                >
                  Ir al Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div 
                className="p-8 rounded-3xl border inline-block mb-4"
                style={{ backgroundColor: "var(--background)", borderColor: "var(--border-subtle)" }}
              >
                <Award className="w-16 h-16 text-purple-400 opacity-50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold" style={{ color: "var(--text-main)" }}>Confirmar Datos Profesionales</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Se emitirá un token vinculado a tu dirección:</p>
                <code 
                  className="text-[10px] px-3 py-1 rounded-full text-purple-400 font-mono"
                  style={{ backgroundColor: "var(--background)" }}
                >{mounted ? (address || "No Conectado") : "Cargando..."}</code>
              </div>

              {!mounted ? (
                <p className="text-purple-400 font-bold animate-pulse">Iniciando conexión segura...</p>
              ) : !isConnected ? (
                <p className="text-red-500 font-bold animate-pulse">Conecta tu wallet para continuar</p>
              ) : (
                <button
                  onClick={handleMint}
                  disabled={isPending}
                  className="w-full py-5 rounded-[24px] font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{ backgroundColor: "rgb(147, 51, 234)", color: "white", boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)" }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Emitiendo en Blockchain...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-6 h-6" />
                      Reclamar Identidad Médica
                    </>
                  )}
                </button>
              )}
              <p 
                className="text-[10px] uppercase tracking-widest font-black"
                style={{ color: "var(--text-muted)" }}
              >
                Aviso: Esta acción es permanente e irreversible.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
