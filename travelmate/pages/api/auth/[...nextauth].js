import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "User", email: "user@example.com" };
        if (
          credentials.username === "User" &&
          credentials.password === "password"
        ) {
          return user;
        } else {
          return null; // Authentication failed
        }
      },
    }),
  ],
});
