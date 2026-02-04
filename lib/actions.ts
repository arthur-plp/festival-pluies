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

  const userId = session.user.id;
  const userHasTicket = session.user.hasTicket;

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
      revalidatePath("/");
      return { status: "added" };
    }
  } catch {
    return { error: "Une erreur est survenue." };
  }
}

export async function processTicketPayment() {
  const session = await getServerSession(authOptions);

  console.log("🔍 Session reçue:", session?.user?.id);

  if (!session || !session.user) {
    console.log("❌ Pas de session");
    return { error: "Vous devez être connecté." };
  }

  if (session.user.hasTicket) {
    console.log("❌ User a déjà un ticket");
    return { error: "Vous possédez déjà un billet." };
  }

  try {
    console.log("💳 Mise à jour du user:", session.user.id);
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { hasTicket: true },
    });
    
    console.log("✅ User mis à jour:", updatedUser);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Erreur paiement:", error);
    return { error: "Une erreur est survenue lors du paiement." };
  }
}