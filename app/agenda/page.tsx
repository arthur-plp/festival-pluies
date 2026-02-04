import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMyBookings } from "@/lib/data";
import EventCard from "@/components/EventCard";
import { redirect } from "next/navigation";
import { Calendar, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AgendaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const myEvents = await getMyBookings(session.user.id);

  return (
    <div className="space-y-12">
      {/* En-tête */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar size={32} className="text-[var(--primary)]" />
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Mon Agenda Personnel</h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
          Retrouvez ici tous les événements auxquels vous êtes inscrit. Vous pouvez vous désinscrire à tout moment.
        </p>
      </section>

      {/* Contenu principal */}
      {myEvents.length > 0 ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center space-y-2">
              <p className="text-3xl font-bold text-[var(--primary)]">{myEvents.length}</p>
              <p className="text-sm text-[var(--muted-foreground)]">Événement{myEvents.length > 1 ? 's' : ''} inscrit{myEvents.length > 1 ? 's' : ''}</p>
            </div>
            <div className="card text-center space-y-2">
              <p className="text-3xl font-bold text-[var(--primary)]">{new Date().getFullYear()}</p>
              <p className="text-sm text-[var(--muted-foreground)]">Edition du festival</p>
            </div>
            <div className="card text-center space-y-2">
              <p className="text-3xl font-bold text-[var(--primary)]">12-14 juil</p>
              <p className="text-sm text-[var(--muted-foreground)]">Dates du festival</p>
            </div>
          </div>

          {/* Grille des événements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Vos réservations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="card text-center py-16 space-y-6">
          <AlertCircle size={64} className="mx-auto text-[var(--muted-foreground)]/50" />
          <div className="space-y-2">
            <p className="text-xl font-semibold text-[var(--foreground)]">Votre agenda est vide</p>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
              Vous n’avez pas encore inscrit d’événements. Parcourez le programme complet et ajoutez vos événements préférés !
            </p>
          </div>
          <Link href="/programme" className="btn-primary inline-flex items-center gap-2 mx-auto">
            Voir la programmation
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}