import { Suspense } from "react";
import { getEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";
import SearchFilters from "@/components/SearchFilters";
import { Calendar, Sparkles, Filter } from "lucide-react";

export default async function ProgrammePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const events = await getEvents(params.search || "", params.category || "");

  return (
    <div className="space-y-12">
      {/* En-tête */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles size={36} className="text-[var(--primary)]" />
          <h1 className="text-4xl font-bold text-[var(--foreground)]">
            Programme Complet
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)] max-w-3xl">
          Découvrez l&apos;ensemble des événements du festival Les Pluies de Juillet.
          Explorez nos conférences sur l&apos;écologie, la littérature, l&apos;histoire,
          la gastronomie, l&apos;art et bien plus encore.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center space-y-1">
            <p className="text-2xl font-bold text-[var(--primary)]">{events.length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Événements</p>
          </div>
          <div className="card text-center space-y-1">
            <p className="text-2xl font-bold text-[var(--primary)]">9</p>
            <p className="text-xs text-[var(--muted-foreground)]">Catégories</p>
          </div>
          <div className="card text-center space-y-1">
            <p className="text-2xl font-bold text-[var(--primary)]">3</p>
            <p className="text-xs text-[var(--muted-foreground)]">Jours</p>
          </div>
          <div className="card text-center space-y-1">
            <p className="text-2xl font-bold text-[var(--primary)]">100%</p>
            <p className="text-xs text-[var(--muted-foreground)]">Gratuit</p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section>
        <Suspense
          fallback={
            <div className="card animate-pulse">
              <div className="h-12 bg-[var(--muted)] rounded"></div>
            </div>
          }
        >
          <SearchFilters />
        </Suspense>
      </section>

      {/* Liste des événements */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            {params.category
              ? `Catégorie : ${params.category}`
              : params.search
              ? `Résultats pour "${params.search}"`
              : "Tous les événements"}
          </h2>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <Filter size={18} />
            <span className="text-sm">{events.length} résultat{events.length > 1 ? "s" : ""}</span>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-16 space-y-4">
            <Calendar size={64} className="mx-auto text-[var(--muted-foreground)]/50" />
            <div className="space-y-2">
              <p className="text-xl font-semibold text-[var(--foreground)]">
                Aucun événement trouvé
              </p>
              <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou parcourez
                toutes les catégories disponibles.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Informations pratiques */}
      <section className="card space-y-4 bg-[var(--muted)]/30">
        <h3 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <Calendar size={24} className="text-[var(--primary)]" />
          Informations pratiques
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-[var(--foreground)]">📅 Dates du festival</p>
            <p className="text-[var(--muted-foreground)]">
              Du 12 au 14 juillet {new Date().getFullYear()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--foreground)]">🎟️ Accès</p>
            <p className="text-[var(--muted-foreground)]">
              Tous les événements sont gratuits sur inscription
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--foreground)]">📍 Lieu</p>
            <p className="text-[var(--muted-foreground)]">
              Centre culturel Les Pluies, 123 Avenue de la Culture
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--foreground)]">♿ Accessibilité</p>
            <p className="text-[var(--muted-foreground)]">
              Tous nos espaces sont accessibles PMR
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
