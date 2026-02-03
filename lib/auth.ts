import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // On utilise JWT car on ne veut pas gérer les sessions en BDD pour ce projet simple
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Chercher l'utilisateur
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // 2. Vérifier le mot de passe (Hash vs Clair)
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        // 3. Retourner l'objet user (sans le mot de passe !)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          hasTicket: user.hasTicket, 
        } as any; 
      }
    })
  ],
  callbacks: {
    // Transférer les infos du User vers le Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.hasTicket = (user as any).hasTicket; // Cast rapide pour TS
      }
      return token;
    },
    // Transférer les infos du Token vers la Session (ce qu'on utilise dans les composants)
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).hasTicket = token.hasTicket;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};