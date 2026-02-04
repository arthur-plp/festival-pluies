import Link from "next/link";
import { Calendar, Users, Music, Mic, Palette, ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";
import HeroSection from "@/components/HeroSection";
import SearchFilters from "@/components/SearchFilters";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  // Récupérer les données
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "all";
  
  const events = await getEvents(query, category);

  return (
    <div className="space-y-20">
      <HeroSection />

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Music, label: "Concerts", value: "20+" },
          { icon: Mic, label: "Conférences", value: "15+" },
          { icon: Palette, label: "Ateliers", value: "30+" },
          { icon: Users, label: "Participants", value: "5000+" },
        ].map((stat, i) => (
          <div key={i} className="card text-center space-y-3">
            <stat.icon size={32} className="mx-auto text-[var(--primary)]" />
            <div className="text-3xl font-bold text-[var(--foreground)]">{stat.value}</div>
            <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Programmation Section */}
      <section id="programmation" className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Programmation 2026
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Découvrez les conférences, concerts et ateliers des Pluies de Juillet.
            Planifiez votre parcours engagé dès maintenant.
          </p>
        </div>

        {/* Filtres de recherche */}
        <SearchFilters />

        {/* Grille des événements */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Calendar size={48} className="mx-auto text-[var(--muted-foreground)] mb-4" />
            <p className="text-[var(--muted-foreground)]">
              Aucun événement ne correspond à votre recherche.
            </p>
          </div>
        )}

        {events.length > 6 && (
          <div className="text-center">
            <Link href="/programme" className="btn-primary inline-flex items-center gap-2">
              Voir tous les événements
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
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
