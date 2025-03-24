// import NextAuth from "next-auth"
// import { authOptions } from "@/lib/auth"

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }



import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // only server-side

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
