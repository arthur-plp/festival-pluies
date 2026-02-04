"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [callbackUrl] = useState(() => searchParams.get("callbackUrl") || "/");

  useEffect(() => {
    if (searchParams.get("callbackUrl")) {
      router.replace("/login");
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Appel à NextAuth
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push(callbackUrl); // Redirection vers la page d'origine
      router.refresh(); // Rafraîchit les composants serveur (navbar, etc.)
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="badge-primary w-fit">Espace personnel</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
            Connectez-vous pour accéder à votre agenda
          </h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Suivez vos réservations, préparez votre planning et recevez les infos du festival.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card">
              <p className="text-sm text-[var(--muted-foreground)]">Accès rapide</p>
              <p className="text-xl font-semibold text-[var(--foreground)]">Programme personnalisé</p>
            </div>
            <div className="card">
              <p className="text-sm text-[var(--muted-foreground)]">Communauté</p>
              <p className="text-xl font-semibold text-[var(--foreground)]">Alertes & nouveautés</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="mb-6 space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Connexion</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Accédez à votre espace personnel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)] text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="label">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="admin@test.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="label">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-[var(--border)]" />
                Se souvenir de moi
              </label>
              <span className="text-[var(--primary)] hover:opacity-80 cursor-pointer">
                Mot de passe oublié ?
              </span>
            </div>

            <button type="submit" className="btn-primary w-full">
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Pas encore de compte ?{" "}
            <span className="text-[var(--primary)] font-medium hover:opacity-80 cursor-pointer">
              S&apos;inscrire (Bientôt)
            </span>
          </div>

          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--secondary)]/40 p-3 text-xs text-[var(--muted-foreground)]">
            <p className="font-semibold text-[var(--foreground)]">Comptes de démo</p>
            <p>admin@test.com / password123</p>
            <p>newbie@test.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
