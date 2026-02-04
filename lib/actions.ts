"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function toggleBooking(eventId: string) {
  // 1. Récupérer la session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: "Vous devez être connecté." };
  }

  const userId = (session.user as any).id;
  const userHasTicket = (session.user as any).hasTicket;

  // 2. Vérification métier : Billet obligatoire
  if (!userHasTicket) {
    return { error: "NO_TICKET" }; // Code d'erreur spécifique qu'on gérera dans l'UI
  }

  // 3. Vérifier si déjà réservé
  const existingBooking = await prisma.booking.findUnique({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
  });

  try {
    if (existingBooking) {
      // Annuler
      await prisma.booking.delete({
        where: { id: existingBooking.id },
      });
      revalidatePath("/"); // Rafraîchir la page
      return { status: "removed" };
    } else {
      // Réserver
      await prisma.booking.create({
        data: {
          userId: userId,
          eventId: eventId,
        },
      });
      revalidatePath("/"); // Rafraîchir la page
      return { status: "added" };
    }
  } catch (e) {
    return { error: "Une erreur est survenue." };
  }
}