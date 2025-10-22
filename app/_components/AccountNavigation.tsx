"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOutAction } from "../_services/actions";
import { FaSignOutAlt } from "react-icons/fa";
import { accountNavigationLinks } from "../_lib/helpers";

const AccountNavigation = () => {
  const pathname = usePathname();

  return (
    <aside className="border-r-2 border-primary-900 text-lg pr-8 h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {accountNavigationLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`py-3 px-5 cursor-pointer transition-all flex items-center gap-4 rounded-md font-semibold hover:bg-primary-900 hover:text-primary-100 text-primary-200 ${
              pathname === link.href ? "bg-primary-900" : ""
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
      <form
        action={signOutAction}
        className="py-3 px-5 rounded-md flex items-center gap-4 cursor-pointer transition-all hover:bg-primary-900 hover:text-primary-100 text-primary-200"
      >
        <FaSignOutAlt />
        <button className="cursor-pointer">Sign Out</button>
      </form>
    </aside>
  );
};

export default AccountNavigation;
