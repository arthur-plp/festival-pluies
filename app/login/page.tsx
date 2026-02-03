// app/login/page.tsx
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
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 border border-stone-200">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-6">
          Connexion
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700">
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="admin@test.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-stone-500">
          Pas encore de compte ?{" "}
          <a href="#" className="font-medium text-green-700 hover:text-green-600">
            S&apos;inscrire (Bientôt)
          </a>
        </p>
        
        <div className="mt-8 pt-4 border-t border-stone-100 text-xs text-stone-400 text-center">
          <p>Comptes de démo :</p>
          <p>admin@test.com / password123</p>
          <p>newbie@test.com / password123</p>
        </div>
      </div>
    </div>
  );
}