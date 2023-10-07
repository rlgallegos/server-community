import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, user, token }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token
        }
    }

})

export {handler as GET, handler as POST}