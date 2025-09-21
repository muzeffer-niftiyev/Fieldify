"use client";
import { createContext, useContext, useState } from "react";
import { AuthPropsType, AuthType } from "../_types/auth";
import { User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ initialUser, children }: AuthPropsType) {
  const [user, setUser] = useState<User | null>(initialUser);

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
