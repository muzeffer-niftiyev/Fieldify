import UpdateProfileForm from "../_components/UpdateProfileForm";
import { auth } from "../_services/auth";
import { getUser } from "../_services/dataService";

export const metadata = {
  title: "Profile",
};

const Page = async () => {
  const session = await auth();
  const user = await getUser(session?.user.email ?? "");

  return (
    <div>
      <h2 className="text-2xl text-primary-200 mb-12">
        Update your profile data
      </h2>

      <UpdateProfileForm user={user} />
    </div>
  );
};

export default Page;
