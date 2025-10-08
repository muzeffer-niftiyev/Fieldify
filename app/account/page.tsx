import { auth } from "../_services/auth";

const Page = async  () => {
  const session = await auth();

  return <div>Welcome, {session?.user?.name}</div>;
};

export default Page;
