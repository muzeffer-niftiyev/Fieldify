import { User } from "@supabase/supabase-js"
import { ReactNode } from "react";

export type AuthType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export type AuthPropsType = {
  initialUser: User | undefined;
  children: ReactNode;
};