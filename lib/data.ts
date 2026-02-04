import { prisma } from "@/lib/prisma";

export async function getEvents(query?: string, category?: string) {
  const whereClause: any = {};

  if (query) {
   whereClause.OR = [
    { 
      title: { 
        contains: query, 
        mode: 'insensitive'
      } 
    },
    { 
      description: { 
        contains: query, 
        mode: 'insensitive'
      } 
    },
  ];
  }

  if (category && category !== "all") {
    whereClause.category = category;
  }

  const events = await prisma.event.findMany({
    where: whereClause,
    orderBy: {
      startDateTime: 'asc',
    },
    include: {
      bookings: true,
    }
  });

  return events;
}

export async function getMyBookings(userId: string) {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      event: true 
    },
    orderBy: {
      event: {
        startDateTime: 'asc'
      }
    }
  });

  return bookings.map(b => b.event);
}