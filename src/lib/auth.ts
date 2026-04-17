import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Load env vars directly
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "";
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('[Auth] SignIn callback - Provider:', account?.provider);
        
        // For Google OAuth, ensure user has required fields
        if (account?.provider === "google") {
          console.log('[Auth] Google sign in - User:', user.email);
        }
        
        return true;
      } catch (error) {
        console.error('[Auth] SignIn callback error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Add user info to JWT token on sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.level = (user as any).level;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token info to session
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).level = token.level;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
