"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--background)] via-[var(--card)] to-[var(--background)] p-8 md:p-12 shadow-sm">
      <div className="absolute inset-0 opacity-25">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_55%)]" />
      </div>

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="badge-primary gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--primary-foreground)] animate-pulse" />
            12-14 juillet 2026 • Rouen, Normandie
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] leading-tight">
            Les Pluies de Juillet
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl">
            Un festival écologique qui célèbre la musique, l&apos;art et l&apos;engagement environnemental.
            Trois jours d&apos;émotions au rythme de la nature.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#programmation" className="btn-primary flex items-center gap-2 justify-center">
              <Calendar size={20} />
              Voir la programmation
            </Link>
            {!session && (
              <button onClick={() => signIn()} className="btn-outline flex items-center gap-2 justify-center">
                Créer mon agenda
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="card p-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[var(--card-foreground)] flex items-center gap-2">
              <Sparkles size={24} className="text-[var(--primary)]" />
              {session ? `Bienvenue ${session.user?.name}` : "Rejoignez-nous"}
            </h3>
            
            {session ? (
              <div className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Gérez votre planning personnalisé et ne manquez aucun événement du festival.
                </p>
                
                <div className="rounded-lg border border-[var(--border)] p-4 bg-[var(--secondary)]/40">
                  <p className="text-sm text-[var(--muted-foreground)]">Statut billet</p>
                  <p className="text-lg font-semibold">
                    {(session.user as any).hasTicket ? "✅ Valide" : "❌ Aucun billet"}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href="/agenda" className="btn-primary w-full flex items-center gap-2 justify-center">
                    <Calendar size={18} />
                    Mon agenda
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Créez votre compte pour personnaliser votre expérience et sauvegarder vos événements favoris.
                </p>
                <button onClick={() => signIn()} className="btn-primary w-full flex items-center gap-2 justify-center">
                  Se connecter
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
