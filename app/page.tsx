"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Les Pluies de Juillet</h1>

      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">Bonjour, {session.user?.name} !</p>
          <div className="bg-green-100 p-4 rounded mb-4 text-green-800">
             Statut Billet : 
             <strong>{(session.user as any).hasTicket ? " ✅ Valide" : " ❌ Aucun billet"}</strong>
          </div>
          <button 
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <button 
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Se connecter / S&apos;inscrire
        </button>
      )}
    </main>
  );
}