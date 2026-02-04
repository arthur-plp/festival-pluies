// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CalendarDays, User, LogOut, Menu, Calendar, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-festival-green text-festival-beige shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl tracking-wider hover:text-white transition">
              LES PLUIES DE JUILLET
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/programme" className="flex items-center gap-2 hover:text-festival-ocre transition-colors">
              <Search size={18} />
              Programme
            </Link>
            
            {session && (
              <Link 
                href="/agenda" 
                className="flex items-center gap-2 hover:text-festival-ocre transition-colors"
              >
                <CalendarDays size={18} />
                Mon Agenda
              </Link>
            )}

            <div className="ml-4 border-l border-green-700 pl-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm opacity-90 hidden lg:block">
                    {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="p-2 rounded-full hover:bg-green-800 transition text-festival-beige"
                    title="Se déconnecter"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-festival-beige text-festival-green px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  Connexion
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-festival-beige hover:text-white p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/programme" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar size={18} />
              Programme
            </Link>
            
            {session && (
              <Link 
                href="/agenda" 
                className="block px-3 py-2 rounded-md hover:bg-green-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mon Agenda
              </Link>
            )}

            <div className="border-t border-green-800 mt-2 pt-2">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full text-left block px-3 py-2 rounded-md text-red-300 hover:bg-green-800"
                >
                  Se déconnecter
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="block px-3 py-2 rounded-md hover:bg-green-800 font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}