import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || "placeholder",
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ravitonyja@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validEmail = process.env.ADMIN_EMAIL || "ravitonyja@gmail.com";
        const validPassword = process.env.ADMIN_PASSWORD || "Ravi@2003";

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          return { id: "1", name: "Admin", email: validEmail, role: "admin" };
        }
        
        // If Google Auth is used but we want to restrict to specific emails, we can do it in callbacks
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Restrict access to only the authorized admin email
      const validEmail = process.env.ADMIN_EMAIL || "ravitonyja@gmail.com";
      if (user.email === validEmail) {
        return true;
      }
      return false; // Display Access Denied if someone else tries to login with Google
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET || "shangai-kitchen-ultra-secret-key-2026",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
