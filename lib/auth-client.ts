import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const { signIn, signOut, signUp, useSession, getSession, admin } =
  createAuthClient({
    plugins: [adminClient()],
  });
