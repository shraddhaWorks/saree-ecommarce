import NextAuth from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    role: "ADMIN" | "CUSTOMER";
  }


  interface Session {

    user: {
      id: string;
      role: "ADMIN" | "CUSTOMER";
      email: string;
      name?: string | null;
    };

  }

}


declare module "next-auth/jwt" {

  interface JWT {
    id: string;
    role: "ADMIN" | "CUSTOMER";
  }

}