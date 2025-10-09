import AccountNavigation from "../_components/AccountNavigation";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-24 h-full">
      <AccountNavigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
