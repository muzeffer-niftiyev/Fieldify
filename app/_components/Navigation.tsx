import Link from "next/link";

const Navigation = async () => {
  return (
    <div className="flex gap-14 relative z-10">
      <Link href="/fields" className="text-xl text-primary-100">
        Fields
      </Link>
      <Link href="/about" className="text-xl text-primary-100">
        About
      </Link>
      <Link href="/account" className="text-xl text-primary-100">
        Account
      </Link>
    </div>
  );
};

export default Navigation;
