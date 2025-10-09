import NextAuth, {
  type NextAuthConfig,
  type Session,
  type User,
} from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./dataService";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userId: string; 
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        if (!user.email) return false;
        const currentUser = await getUser(user.email);

        if (!currentUser) {
          if (!user.name) return false;
          await createUser({ email: user.email, name: user.name });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async session({ session }) {
      const user = await getUser(session.user.email);

      session.user.userId = user.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
