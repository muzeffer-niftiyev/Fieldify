"use client";
import Link from "next/link";
import { useAuth } from "../_context/AuthContext";

export default function Navigation() {
  const { user } = useAuth();

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
