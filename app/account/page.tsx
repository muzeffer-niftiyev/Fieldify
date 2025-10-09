import { auth } from "../_services/auth";

export const metadata = {
  title: "Account",
};

const Page = async () => {
  const session = await auth();

  return <div>Welcome, {session?.user?.name}</div>;
};

export default Page;
