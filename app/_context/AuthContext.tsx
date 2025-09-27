"use client";
import { createContext, useContext, useState } from "react";
import { AuthPropsType, AuthType } from "../_types/auth";
import { User } from "@supabase/supabase-js";
import { supabase } from "../_utils/supabase/client";

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ initialUser, children }: AuthPropsType) {
  const [user, setUser] = useState<User | undefined>(initialUser);

  supabase.auth.onAuthStateChange((_, session) => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(undefined);
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Couldn't get user data!");
  }
  return context;
};
