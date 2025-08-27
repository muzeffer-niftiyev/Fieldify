import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex gap-7">
      <Link href="/courts" className="text-lg text-primary-100">
        Courts
      </Link>
      <Link href="/about" className="text-lg text-primary-100">
        About
      </Link>
      <Link href="/account" className="text-lg text-primary-100">
        Account
      </Link>
    </div>
  );
};

export default Navigation;
