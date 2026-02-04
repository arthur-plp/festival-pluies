"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft, CloudRain } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Icône animée */}
        <div className="relative inline-block">
          <CloudRain 
            size={120} 
            className="text-[var(--primary)] opacity-20 animate-pulse"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-[var(--primary)]">404</span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">
            Page introuvable
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-md mx-auto">
            Désolé, la page que vous recherchez semble s&apos;être perdue sous les pluies de juillet... 🌧️
          </p>
        </div>

        {/* Suggestions */}
        <div className="card bg-[var(--muted)]/30 space-y-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Suggestions pour continuer :
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Home size={18} />
              Accueil
            </Link>
            <Link href="/programme" className="btn-outline inline-flex items-center gap-2">
              <Search size={18} />
              Programme
            </Link>
          </div>
        </div>

        {/* Lien retour */}
        <button 
          onClick={() => window.history.back()}
          className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} />
          Retour à la page précédente
        </button>
      </div>
    </div>
  );
}
