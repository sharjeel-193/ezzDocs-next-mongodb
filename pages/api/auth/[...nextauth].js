import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../util/mongodb"

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),

    ],
    adapter: MongoDBAdapter(clientPromise),
    // adapter: MongoDBAdapter({
    //     db: (await clientPromise).db("myFirstDatabase"),
    // }),
    // database: process.env.MONGODB_URI,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async session({ session, token, user }) {
            session.user._id = user.id;
            return session;
        },
    },
    
})