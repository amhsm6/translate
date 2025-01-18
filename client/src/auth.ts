import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

declare module "next-auth" {
    interface Session {
        accessToken: string
    }

    interface User {
        access: string
        refresh: string
        exp: number
    }
}
 
declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
        refreshToken: string
        expiresAt: number
    }
}

export const authOptions: AuthOptions = {
    session: {
        maxAge: 2 * 3600
    },
    providers: [
        CredentialsProvider({
            id: "login",
            credentials: {
                username: { label: "Username" },
                password: { label: "Password" }
            },
            async authorize(credentials, req) {
                const resp = await fetch(
                    `${process.env.API_URL}/api/auth/login/`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials)
                    }
                );
                const data = await resp.json();

                if (!resp.ok) {
                    throw new Error(JSON.stringify(data));
                }

                const payload = jwt.decode(data.access);
                if (!payload || typeof payload === "string" || !payload.exp) {
                    throw new Error("Invalid token");
                }

                return { ...data, name: credentials?.username, exp: payload.exp };
            },
        }),
        CredentialsProvider({
            id: "register",
            credentials: {
                username: { label: "Username" },
                password: { label: "Password" }
            },
            async authorize(credentials, req) {
                const resp = await fetch(
                    `${process.env.API_URL}/api/auth/register/`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials)
                    }
                );
                const data = await resp.json();

                if (!resp.ok) {
                    throw new Error(JSON.stringify(data));
                }

                const payload = jwt.decode(data.access);
                if (!payload || typeof payload === "string" || !payload.exp) {
                    throw new Error("Invalid token");
                }

                return { ...data, name: credentials?.username, exp: payload.exp };
            },
        })
    ],
    callbacks: { // FIXME: refresh token
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access;
                token.refreshToken = user.refresh;
                token.expiresAt = user.exp;
                return token;
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        newUser: "/auth/register"
    }
};
