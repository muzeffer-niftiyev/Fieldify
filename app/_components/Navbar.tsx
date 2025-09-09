import Logo from "./Logo";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <nav className="border-b border-primary-900 relative px-8">
      <div className="flex items-center justify-between max-w-6xl mx-auto py-3">
        <Logo />
        <Navigation />
      </div>
    </nav>
  );
};

export default Navbar;
