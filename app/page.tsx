"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
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
              Les Pluies de
              <span className="block text-[var(--primary)]">Juillet</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl">
              Un festival écologique qui célèbre la musique, l&apos;art et l&apos;engagement environnemental.
              Trois jours d&apos;émotions au rythme de la nature.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary px-8 py-4" onClick={() => signIn()}>
                Réserver mon billet
              </button>
              <button className="btn-outline px-8 py-4">
                Découvrir la programmation
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-[var(--primary)]">3</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">Jours de festival</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-[var(--primary)]">40+</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">Artistes engagés</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-[var(--primary)]">100%</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">Éco-responsable</div>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="card p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Mon espace</h2>
              </div>

              {session ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-[var(--muted-foreground)]">Bienvenue,</p>
                    <p className="text-2xl font-semibold text-[var(--foreground)]">{session.user?.name}</p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-[var(--muted-foreground)]">Statut de votre billet</p>
                        {(session.user as any).hasTicket ? (
                          <span className="badge-success">Billet valide</span>
                        ) : (
                          <span className="badge-secondary">Aucun billet</span>
                        )}
                      </div>
                      <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-[var(--primary-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="btn-primary w-full py-3">Mes réservations</button>
                    <button className="btn-secondary w-full py-3" onClick={() => signOut()}>
                      Se déconnecter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    Créez votre compte pour réserver vos billets, consulter le programme personnalisé
                    et rejoindre la communauté du festival.
                  </p>

                  <button className="btn-primary w-full py-4" onClick={() => signIn()}>
                    Se connecter / S&apos;inscrire
                  </button>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full border-2 border-[var(--background)] bg-[var(--primary)] opacity-80" />
                      <div className="w-10 h-10 rounded-full border-2 border-[var(--background)] bg-[var(--primary)] opacity-60" />
                      <div className="w-10 h-10 rounded-full border-2 border-[var(--background)] bg-[var(--primary)] opacity-40" />
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--foreground)]">2 847</span> festivaliers inscrits
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Eco Commitment Section */}
      <section className="rounded-3xl bg-[var(--primary)] text-[var(--primary-foreground)] p-10 md:p-14 shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Notre engagement écologique</h2>
          <p className="text-lg md:text-xl text-white/90">
            Un festival zéro déchet, 100% énergies renouvelables, circuits courts et mobilité douce
          </p>
          <div className="grid md:grid-cols-4 gap-6 pt-8">
            <div className="rounded-xl bg-white/10 p-6">
              <div className="text-3xl mb-3">♻️</div>
              <div className="font-semibold">Zéro plastique</div>
            </div>
            <div className="rounded-xl bg-white/10 p-6">
              <div className="text-3xl mb-3">🌱</div>
              <div className="font-semibold">Bio & local</div>
            </div>
            <div className="rounded-xl bg-white/10 p-6">
              <div className="text-3xl mb-3">⚡</div>
              <div className="font-semibold">100% renouvelable</div>
            </div>
            <div className="rounded-xl bg-white/10 p-6">
              <div className="text-3xl mb-3">🚲</div>
              <div className="font-semibold">Mobilité douce</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programming Highlights */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Une programmation éclectique</h2>
          <p className="text-lg text-[var(--muted-foreground)]">Musique, talks, ateliers et expériences artistiques</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-0 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--ring)]" />
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)]">Concerts Live</h3>
              <p className="text-[var(--muted-foreground)]">
                Rock alternatif, électro organique, folk engagé... Des artistes qui ont quelque chose à dire.
              </p>
              <button className="text-[var(--primary)] font-semibold hover:opacity-80 transition-colors">
                Voir les artistes →
              </button>
            </div>
          </div>

          <div className="card p-0 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--ring)]" />
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)]">Conférences & Talks</h3>
              <p className="text-[var(--muted-foreground)]">
                Climat, biodiversité, alternatives... Rencontrez les acteurs du changement.
              </p>
              <button className="text-[var(--primary)] font-semibold hover:opacity-80 transition-colors">
                Programme complet →
              </button>
            </div>
          </div>

          <div className="card p-0 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--ring)]" />
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)]">Ateliers & Animations</h3>
              <p className="text-[var(--muted-foreground)]">
                Cuisine sauvage, permaculture, bricolage écolo... Apprenez en vous amusant.
              </p>
              <button className="text-[var(--primary)] font-semibold hover:opacity-80 transition-colors">
                S&apos;inscrire aux ateliers →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="rounded-3xl bg-[var(--secondary)] p-8 md:p-12 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center">Infos pratiques</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--foreground)]">Accès au site</h3>
                <p className="text-[var(--muted-foreground)]">
                  Parc naturel des Boucles de la Seine
                  <br />
                  Navettes gratuites depuis la gare
                  <br />
                  Parking vélos sécurisé
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--foreground)]">Hébergement</h3>
                <p className="text-[var(--muted-foreground)]">
                  Camping sur place (gratuit)
                  <br />
                  Hébergements partenaires à Rouen
                  <br />
                  Aires de bivouac aménagées
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--foreground)]">Horaires</h3>
                <p className="text-[var(--muted-foreground)]">
                  Vendredi 18h - 2h
                  <br />
                  Samedi 14h - 3h
                  <br />
                  Dimanche 14h - minuit
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--foreground)]">Restauration</h3>
                <p className="text-[var(--muted-foreground)]">
                  Food trucks bio et locaux
                  <br />
                  Vaisselle compostable uniquement
                  <br />
                  Options végétariennes et vegan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="rounded-3xl bg-[var(--card)] border border-[var(--border)] p-10 md:p-12 text-center shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Restez informé·e</h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Recevez les dernières news, les artistes annoncés et les infos exclusives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Votre email" className="input h-12 flex-1" />
            <button className="btn-primary px-6 py-3 whitespace-nowrap">S&apos;abonner</button>
          </div>
        </div>
      </section>
    </div>
  );
}
