import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { isAdmin, isCustomer } from "@/lib/auth/roles";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Runs during login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },


    async session({ session, token }) {
      // Send JWT data to client/server session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "CUSTOMER";
        session.user.email = token.email as string;
        session.user.name = token.name as string | null;
      }
      return session;
    },


    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;


      // Public routes
      const publicRoutes = [
        "/signin",
        "/signup",
        "/sign-in",
        "/sign-up",
        "/admin/login",
        "/admin/sign-up",
      ];


      if (publicRoutes.includes(pathname)) {
        return true;
      }


      // Not logged in
      if (!isLoggedIn) {
        return false;
      }


      const role = auth.user.role;


      // CUSTOMER trying to access admin
      if (
        pathname.startsWith("/admin") &&
        !isAdmin(role)
      ) {
        return NextResponse.redirect(
          new URL("/dashboard", request.nextUrl)
        );
      }


      // ADMIN trying to access customer dashboard
      if (
        pathname.startsWith("/dashboard") &&
        isAdmin(role)
      ) {
        return NextResponse.redirect(
          new URL("/admin", request.nextUrl)
        );
      }

      if (pathname.startsWith("/dashboard") && !isCustomer(role)) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
      }


      return true;
    },
  },

  providers: [],
};