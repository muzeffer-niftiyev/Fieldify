"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Navigation() {
  const [user, setUser] = useState<null | object>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  console.log(user);
  return (
    <div className="flex gap-14 relative z-10">
      <Link href="/fields" className="text-xl text-primary-100">
        Fields
      </Link>
      <Link href="/about" className="text-xl text-primary-100">
        About
      </Link>
      {user ? (
        <Link href="/account" className="text-xl text-primary-100">
          Account
        </Link>
      ) : (
        <Link href="/login" className="text-xl text-primary-100">
          Login
        </Link>
      )}
    </div>
  );
}


/// User auth context yaratmaq lazimdir