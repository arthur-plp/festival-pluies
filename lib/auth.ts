import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      hasTicket: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    hasTicket: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasTicket: boolean;
  }
}

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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          hasTicket: user.hasTicket, 
        }; 
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.hasTicket = user.hasTicket;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { id: true, email: true, name: true, hasTicket: true }
        });
        
        if (freshUser) {
          session.user.id = freshUser.id;
          session.user.hasTicket = freshUser.hasTicket;
        }
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};