"use client";

import React, { useEffect, useState } from "react";
import { soundFx } from "@/lib/soundEffects";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SoundToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMuted(soundFx.getMuted());
    const unsubscribe = soundFx.subscribe((muted) => setIsMuted(muted));
    return () => unsubscribe();
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => soundFx.toggleMute()}
      onMouseEnter={() => soundFx.playHover(1600)}
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl group select-none ${
        isMuted
          ? "bg-slate-900/85 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500"
          : "bg-slate-950/90 border-emerald-500/50 text-emerald-400 shadow-emerald-950/30 hover:border-emerald-400"
      } ${className}`}
      aria-label={isMuted ? "Ativar efeitos sonoros" : "Desativar efeitos sonoros"}
      title={isMuted ? "Ativar efeitos sonoros" : "Desativar efeitos sonoros"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-slate-400 transition-transform group-hover:scale-110" />
        ) : (
          <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
        )}
      </div>

      <span className="text-[11px] font-bold tracking-wider uppercase">
        {isMuted ? "Som: Desligado" : "Som: Ligado"}
      </span>

      {/* Mini Equalizer animation when active */}
      {!isMuted && (
        <div className="flex items-center gap-0.5 h-3 ml-0.5">
          <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
          <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3" />
          <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
        </div>
      )}
    </button>
  );
};
