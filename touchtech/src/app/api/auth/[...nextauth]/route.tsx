import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
};
declare module "next-auth" {
  interface Session {
    User:{
       id: string;
       name?: string | null;
       email?: string | null;
       image?: string | null;
    }
  }
};
const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        try {
          await connectDB();
          const sessionUser = await User.findOne({
            email: session.user.email,
          });
          session.id = sessionUser._id.toString();
          session.name = sessionUser.name;
          return session;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async signIn({ profile }) {
      if (!profile) return false;
      console.log(profile);
      try {
        await connectDB();
        const emptyarr = [
          {imageName: "Pre1", imageURI : "https://touchtech-assignment2.s3.amazonaws.com/pexels-felixmittermeier-956999.jpg"},
          {imageName: "Pre2", imageURI : "https://touchtech-assignment2.s3.amazonaws.com/pexels-jessbaileydesign-743986.jpg"},
          {imageName: "Pre3", imageURI : "https://touchtech-assignment2.s3.amazonaws.com/pexels-padrinan-255379.jpg"},
          {imageName: "Pre4", imageURI : "https://touchtech-assignment2.s3.amazonaws.com/pexels-pixabay-531880.jpg"},
          {imageName: "Pre5", imageURI : "https://touchtech-assignment2.s3.amazonaws.com/pexels-veeterzy-303383.jpg"}
        ];
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            customwallpaper: emptyarr,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
