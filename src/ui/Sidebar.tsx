import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="pointer-events-none invisible hidden lg:pointer-events-auto lg:visible  lg:flex lg:flex-col lg:gap-9 lg:border-r lg:border-neutral-100 lg:px-6 lg:py-8">
      <Logo />
      <MainNav />
    </aside>
  );
}
