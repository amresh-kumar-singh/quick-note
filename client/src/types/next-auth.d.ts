import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      token: string;
      jti: string;
      iat: number;
      exp: number;
    };
  }
}
