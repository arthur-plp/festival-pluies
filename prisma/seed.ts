import { prisma } from "../lib/prisma.js";
import { hash } from "bcrypt";

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: await hash("password123", 10),
      name: "Admin User",
      hasTicket: true
    }
  });

  const newbieUser = await prisma.user.upsert({
    where: { email: "newbie@test.com" },
    update: {},
    create: {
      email: "newbie@test.com",
      password: await hash("password123", 10),
      name: "Newbie User",
      hasTicket: false
    }
  });

  console.log({ adminUser, newbieUser });

  const conferences = [
    {
      title: "L'avenir de l'écologie en Normandie",
      description: "Une discussion approfondie sur les défis et opportunités pour l'écologie en Normandie.",
      speaker: "Dr. Jeanne Dupont",
      category: "Écologie",
      startDateTime: new Date(2026, 6, 6, 10, 0, 0),
      endDateTime: new Date(2026, 6, 6, 11, 0, 0),
      capacity: 100,
      location: "Salle A"
    },
    {
      title: "Poésie normande contemporaine",
      description: "Lecture et analyse de poèmes d'auteurs normands modernes.",
      speaker: "Marie Lefebvre",
      category: "Littérature",
      startDateTime: new Date(2026, 6, 6, 14, 0, 0),
      endDateTime: new Date(2026, 6, 6, 15, 30, 0),
      capacity: 80,
      location: "Salle B"
    },
    {
      title: "Histoire du Débarquement",
      description: "Retour sur les événements de juin 1944 et leur impact sur la région.",
      speaker: "Prof. Pierre Martin",
      category: "Histoire",
      startDateTime: new Date(2026, 6, 6, 16, 0, 0),
      endDateTime: new Date(2026, 6, 6, 17, 30, 0),
      capacity: 150,
      location: "Grande Salle"
    },
    {
      title: "La cuisine normande revisitée",
      description: "Atelier culinaire autour des spécialités régionales.",
      speaker: "Chef Antoine Dubois",
      category: "Gastronomie",
      startDateTime: new Date(2026, 6, 7, 10, 0, 0),
      endDateTime: new Date(2026, 6, 7, 12, 0, 0),
      capacity: 50,
      location: "Atelier 1"
    },
    {
      title: "Biodiversité marine en Manche",
      description: "Exploration de la richesse des écosystèmes marins normands.",
      speaker: "Dr. Sophie Leroy",
      category: "Écologie",
      startDateTime: new Date(2026, 6, 7, 14, 0, 0),
      endDateTime: new Date(2026, 6, 7, 15, 0, 0),
      capacity: 120,
      location: "Salle A"
    },
    {
      title: "L'impressionnisme à Giverny",
      description: "Visite virtuelle des jardins de Monet et analyse de son œuvre.",
      speaker: "Isabelle Morel",
      category: "Art",
      startDateTime: new Date(2026, 6, 7, 16, 0, 0),
      endDateTime: new Date(2026, 6, 7, 17, 0, 0),
      capacity: 100,
      location: "Salle B"
    },
    {
      title: "Architecture des abbayes normandes",
      description: "Découverte du patrimoine architectural religieux de la région.",
      speaker: "Architecte Jean Rousseau",
      category: "Architecture",
      startDateTime: new Date(2026, 6, 8, 10, 0, 0),
      endDateTime: new Date(2026, 6, 8, 11, 30, 0),
      capacity: 90,
      location: "Salle C"
    },
    {
      title: "Le cidre normand : traditions et innovations",
      description: "De la pomme à la bouteille, comprendre la fabrication du cidre.",
      speaker: "Marc Leblanc",
      category: "Gastronomie",
      startDateTime: new Date(2026, 6, 8, 14, 0, 0),
      endDateTime: new Date(2026, 6, 8, 15, 30, 0),
      capacity: 70,
      location: "Atelier 2"
    },
    {
      title: "Musique traditionnelle normande",
      description: "Concert et présentation des instruments traditionnels.",
      speaker: "Ensemble Les Ménestrels",
      category: "Musique",
      startDateTime: new Date(2026, 6, 8, 18, 0, 0),
      endDateTime: new Date(2026, 6, 8, 19, 30, 0),
      capacity: 200,
      location: "Grande Salle"
    },
    {
      title: "Vikings en Normandie",
      description: "L'héritage viking dans la culture et l'histoire normande.",
      speaker: "Dr. Lars Bergström",
      category: "Histoire",
      startDateTime: new Date(2026, 6, 9, 10, 0, 0),
      endDateTime: new Date(2026, 6, 9, 11, 30, 0),
      capacity: 110,
      location: "Salle A"
    },
    {
      title: "Photographie de paysages normands",
      description: "Techniques et conseils pour capturer la beauté de la région.",
      speaker: "Photographe Claire Dumas",
      category: "Art",
      startDateTime: new Date(2026, 6, 9, 14, 0, 0),
      endDateTime: new Date(2026, 6, 9, 16, 0, 0),
      capacity: 60,
      location: "Atelier 1"
    },
    {
      title: "Changement climatique en Normandie",
      description: "Impact local et solutions pour l'avenir.",
      speaker: "Dr. Thomas Bernard",
      category: "Écologie",
      startDateTime: new Date(2026, 6, 9, 16, 30, 0),
      endDateTime: new Date(2026, 6, 9, 18, 0, 0),
      capacity: 130,
      location: "Grande Salle"
    },
    {
      title: "Contes et légendes de Normandie",
      description: "Séance de contes pour toute la famille.",
      speaker: "Conteur Paul Girard",
      category: "Littérature",
      startDateTime: new Date(2026, 6, 10, 10, 0, 0),
      endDateTime: new Date(2026, 6, 10, 11, 0, 0),
      capacity: 80,
      location: "Salle B"
    },
    {
      title: "Fromages normands : un savoir-faire unique",
      description: "Dégustation et découverte des fromages AOC de Normandie.",
      speaker: "Maître fromager Henri Petit",
      category: "Gastronomie",
      startDateTime: new Date(2026, 6, 10, 14, 0, 0),
      endDateTime: new Date(2026, 6, 10, 15, 30, 0),
      capacity: 50,
      location: "Atelier 2"
    },
    {
      title: "Théâtre normand moderne",
      description: "Représentation d'une pièce contemporaine en langue normande.",
      speaker: "Troupe Le Rideau Vert",
      category: "Théâtre",
      startDateTime: new Date(2026, 6, 10, 18, 0, 0),
      endDateTime: new Date(2026, 6, 10, 20, 0, 0),
      capacity: 180,
      location: "Grande Salle"
    },
    {
      title: "Le Mont-Saint-Michel : histoire et architecture",
      description: "Exploration de la merveille normande.",
      speaker: "Historien François Mercier",
      category: "Histoire",
      startDateTime: new Date(2026, 6, 11, 10, 0, 0),
      endDateTime: new Date(2026, 6, 11, 11, 30, 0),
      capacity: 140,
      location: "Salle A"
    },
    {
      title: "Aquarelle : peindre les falaises d'Étretat",
      description: "Atelier pratique de peinture aquarelle.",
      speaker: "Artiste Émilie Laurent",
      category: "Art",
      startDateTime: new Date(2026, 6, 11, 14, 0, 0),
      endDateTime: new Date(2026, 6, 11, 16, 30, 0),
      capacity: 40,
      location: "Atelier 1"
    },
    {
      title: "Agriculture durable en Normandie",
      description: "Pratiques agricoles respectueuses de l'environnement.",
      speaker: "Agriculteur Jacques Renault",
      category: "Écologie",
      startDateTime: new Date(2026, 6, 11, 17, 0, 0),
      endDateTime: new Date(2026, 6, 11, 18, 30, 0),
      capacity: 100,
      location: "Salle C"
    },
    {
      title: "Festival de jazz normand",
      description: "Concert de clôture avec des artistes locaux et internationaux.",
      speaker: "Quartet Jazz Attitude",
      category: "Musique",
      startDateTime: new Date(2026, 6, 11, 20, 0, 0),
      endDateTime: new Date(2026, 6, 11, 22, 0, 0),
      capacity: 250,
      location: "Grande Salle"
    },
    {
      title: "Randonnées littéraires sur le GR21",
      description: "Marche commentée le long des falaises avec lectures poétiques.",
      speaker: "Guide Sylvie Blanc",
      category: "Littérature",
      startDateTime: new Date(2026, 6, 12, 9, 0, 0),
      endDateTime: new Date(2026, 6, 12, 12, 0, 0),
      capacity: 30,
      location: "Départ Parking"
    },
  ];

  for (const conf of conferences) {
    await prisma.event.create({
      data: conf
    });
  }

  console.log({ conferences });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
