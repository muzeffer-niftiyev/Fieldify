const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-30">
      <aside className="flex flex-col items-start gap-5 text-lg">
        <button className="py-4 cursor-pointer">Profile</button>
        <button className="py-4 cursor-pointer">Reservations</button>
        <form>
          <button className="py-4 cursor-pointer">Sign Out</button>
        </form>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
