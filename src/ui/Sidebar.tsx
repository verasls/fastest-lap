import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-9 border-r border-neutral-100 px-6 py-8">
      <Logo />
      <MainNav />
    </aside>
  );
}
