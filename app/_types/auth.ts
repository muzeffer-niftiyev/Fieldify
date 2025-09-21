import { User } from "@supabase/supabase-js"
import { ReactNode } from "react";

export type AuthType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type AuthPropsType = {
  initialUser: User | null;
  children: ReactNode;
};