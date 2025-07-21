import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a simple example. In a real app, you would fetch the user from your database
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "superadmin",
          }
        } else if (credentials?.username === "employee" && credentials?.password === "employee") {
          return {
            id: "2",
            name: "Employee User",
            email: "employee@example.com",
            role: "employee",
          }
        } else if (credentials?.username === "office" && credentials?.password === "office") {
          return {
            id: "3",
            name: "Office User",
            email: "office@example.com",
            role: "office",
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
}
