"use client";

import { useTransition } from "react";
import { toggleBooking } from "@/lib/actions";
import { Check, Plus, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface BookingButtonProps {
  eventId: string;
  isBooked: boolean;
  hasTicket: boolean;
  isLoggedIn: boolean;
  onBookingChange?: () => void;
}

export default function BookingButton({ eventId, isBooked, hasTicket, isLoggedIn, onBookingChange }: BookingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    startTransition(async () => {
      const result = await toggleBooking(eventId);
      
      if (result.error === "NO_TICKET") {
        toast.error("\ud83d\udd10 Vous devez avoir un billet pour le festival");
      } else if (!isBooked) {
        toast.success("\u2705 \u00c9v\u00e9nement ajout\u00e9 \u00e0 votre agenda !");
        onBookingChange?.();
      } else {
        toast.success("\ud83d\udeae Vous avez \u00e9t\u00e9 d\u00e9sinscrit");
        onBookingChange?.();
      }
    });
  };

  // État 1 : Pas de billet -> Bouton verrouillé
  if (isLoggedIn && !hasTicket) {
    return (
      <button 
        onClick={handleClick}
        className="btn-outline w-full h-10 flex items-center justify-center gap-2 text-[var(--muted-foreground)] opacity-60 cursor-not-allowed"
        disabled
      >
        <Lock size={16} />
        <span>Billet requis</span>
      </button>
    );
  }

  // État 2 : Chargement
  if (isPending) {
    return (
      <button disabled className="btn-primary w-full h-10 flex justify-center items-center opacity-70">
        <Loader2 size={18} className="animate-spin" />
      </button>
    );
  }

  // État 3 : Déjà réservé
  if (isBooked) {
    return (
      <button
        onClick={handleClick}
        className="btn-secondary w-full h-10 flex items-center justify-center gap-2 group hover:bg-[var(--error)]/10 hover:text-[var(--error)] transition-all"
      >
        <span className="group-hover:hidden flex items-center gap-2 hover:cursor-pointer">
          <Check size={16} />
          Inscrit
        </span>
        <span className="hidden group-hover:flex items-center gap-2 hover:cursor-pointer">
          Se désinscrire
        </span>
      </button>
    );
  }

  // État 4 : Par défaut (Ajouter)
  return (
    <button
      onClick={handleClick}
      className="btn-primary w-full h-10 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform hover:cursor-pointer"
    >
      <Plus size={16} />
      <span>Ajouter à mon agenda</span>
    </button>
  );
}