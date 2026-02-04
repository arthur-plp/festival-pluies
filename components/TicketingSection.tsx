"use client";

import { useState } from "react";
import { Ticket, Check, AlertCircle, Loader } from "lucide-react";
import { processTicketPayment } from "@/lib/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TicketingSection() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  if (!session?.user) {
    return (
      <section id="ticketing" className="rounded-3xl bg-gradient-to-br from-[var(--primary)] to-indigo-700 text-white p-10 md:p-14 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                  <Ticket size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Accès au Festival</h2>
              </div>

              <p className="text-lg text-white/90">
                Obtenez votre billet d&apos;accès aux Pluies de Juillet 2026 et réservez vos événements préférés.
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Check size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Accès complet</div>
                    <div className="text-sm text-white/80">À tous les événements du festival</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Réservation prioritaire</div>
                    <div className="text-sm text-white/80">Sécurisez vos places</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">12-14 juillet 2026</div>
                    <div className="text-sm text-white/80">Accès pour les 3 jours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Connexion obligatoire */}
            <div className="card bg-white text-[var(--foreground)] p-8 space-y-6">
              <div className="space-y-1">
                <div className="text-4xl font-bold text-[var(--primary)]">15€</div>
                <div className="text-sm text-[var(--muted-foreground)]">tarif réduit étudiant</div>
              </div>

              <div className="border-t border-[var(--border)] pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Billet 3 jours</span>
                  <span className="font-semibold">15€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Frais de traitement</span>
                  <span className="font-semibold">0€</span>
                </div>
                <div className="border-t border-[var(--border)] pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-[var(--primary)]">15€</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 text-blue-900 flex items-start gap-3">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Veuillez vous connecter pour accéder à la billetterie et effectuer votre achat.
                </span>
              </div>

              <Link
                href="/login"
                className="w-full btn-primary py-3 font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Ticket size={20} />
                Se connecter pour acheter
              </Link>

              <p className="text-xs text-[var(--muted-foreground)] text-center">
                Paiement sécurisé - Simulation pour démonstration
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (session.user.hasTicket) {
    return null;
  }

  const handlePayment = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await processTicketPayment();

      if (result.success) {
        setMessage({ type: "success", text: "Paiement confirmé ! Votre billet est activé." });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage({ type: "error", text: result.error || "Une erreur est survenue." });
      }
    } catch (error) {
      console.error("Erreur paiement:", error);
      setMessage({ type: "error", text: "Une erreur est survenue." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ticketing" className="rounded-3xl bg-gradient-to-br from-[var(--primary)] to-indigo-700 text-white p-10 md:p-14 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <Ticket size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Accès au Festival</h2>
            </div>

            <p className="text-lg text-white/90">
              Obtenez votre billet d&apos;accès aux Pluies de Juillet 2026 et réservez vos événements préférés.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <Check size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Accès complet</div>
                  <div className="text-sm text-white/80">À tous les événements du festival</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Réservation prioritaire</div>
                  <div className="text-sm text-white/80">Sécurisez vos places</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">12-14 juillet 2026</div>
                  <div className="text-sm text-white/80">Accès pour les 3 jours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Paiement */}
          <div className="card bg-white text-[var(--foreground)] p-8 space-y-6">
            <div className="space-y-1">
              <div className="text-4xl font-bold text-[var(--primary)]">15€</div>
              <div className="text-sm text-[var(--muted-foreground)]">tarif réduit étudiant</div>
            </div>

            <div className="border-t border-[var(--border)] pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Billet 3 jours</span>
                <span className="font-semibold">15€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Frais de traitement</span>
                <span className="font-semibold">0€</span>
              </div>
              <div className="border-t border-[var(--border)] pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-[var(--primary)]">15€</span>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-900"
                    : "bg-green-50 text-green-900"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                ) : (
                  <Check size={20} className="flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full btn-primary py-3 font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <Ticket size={20} />
                  Obtenir mon billet
                </>
              )}
            </button>

            <p className="text-xs text-[var(--muted-foreground)] text-center">
              Paiement sécurisé - Simulation pour démonstration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
