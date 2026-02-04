import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ isBooked: false });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return Response.json({ error: "Missing eventId" }, { status: 400 });
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookings: {
          where: { eventId },
          select: { id: true },
        },
      },
    });

    const isBooked = user?.bookings && user.bookings.length > 0;

    return Response.json({ isBooked });
  } catch (error) {
    console.error("Erreur API /bookings/check:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
