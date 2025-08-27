import Logo from "./Logo";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <nav className=" bg-primary-900 sticky">
      <div className="flex items-center justify-between max-w-6xl mx-auto py-2">
        <Logo />
        <Navigation />
      </div>
    </nav>
  );
};

export default Navbar;
