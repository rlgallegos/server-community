import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    // theme: {
    //     colorScheme: "dark", // "auto" | "dark" | "light"
    //     brandColor: "FFF", // Hex color code
    //     logo: "", // Absolute URL to image
    //     buttonText: "000" // Hex color code
    // },
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/oauth/update`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              });
              return res.ok
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