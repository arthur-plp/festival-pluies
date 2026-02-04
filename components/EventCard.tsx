"use client";

import { MapPin, User, Clock, Sparkles } from "lucide-react";
import { Event } from "@/generated/prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BookingButton from "./BookingButton";

// Helper pour formater la date proprement
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

// Couleurs des badges par catégorie
const getCategoryBadgeClass = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'concert':
      return 'badge-primary';
    case 'conférence':
      return 'badge-secondary';
    case 'atelier':
      return 'badge-success';
    case 'workshop':
      return 'badge-warning';
    default:
      return 'badge-primary';
  }
};

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { data: session } = useSession();
  const [isBooked, setIsBooked] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Relancer la vérification de réservation
  const refreshBookingStatus = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Charger l'état de réservation au montage ou quand la session change
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    const checkBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/check?eventId=${event.id}`);
        if (response.ok) {
          const data = await response.json();
          setIsBooked(data.isBooked);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la réservation:", error);
      }
    };

    checkBooking();
  }, [event.id, session?.user?.id, refreshTrigger]);
  return (
    <div className="card p-0 overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
      {/* Bande de couleur selon catégorie */}
      <div 
        className="h-2 w-full transition-all duration-300 group-hover:h-3"
        style={{
          background: event.category === 'Concert' 
            ? 'var(--primary)' 
            : 'var(--secondary)'
        }}
      />

      {/* Image placeholder */}
      <div className="h-32 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--ring)]/20 flex items-center justify-center overflow-hidden relative group/image">
        <Sparkles size={48} className="text-[var(--primary)]/40 group-hover/image:scale-110 transition-transform" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Badge Catégorie */}
        <div className="mb-3">
          <span className={`${getCategoryBadgeClass(event.category)}`}>
            {event.category}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
          {event.title}
        </h3>

        {/* Infos */}
        <div className="space-y-2 text-sm text-[var(--muted-foreground)] mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[var(--primary)] flex-shrink-0" />
            <span className="truncate">{formatDate(event.startDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--primary)] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2">
              <User size={16} className="text-[var(--primary)] flex-shrink-0" />
              <span className="font-medium truncate">{event.speaker}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[var(--muted-foreground)] text-sm line-clamp-3 mb-4 flex-1">
          {event.description}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-[var(--border)] space-y-2">
          <BookingButton
            eventId={event.id}
            isBooked={isBooked}
            hasTicket={session?.user.hasTicket || false}
            isLoggedIn={!!session}
            onBookingChange={refreshBookingStatus}
          />  
        </div>
      </div>
    </div>
  );
}