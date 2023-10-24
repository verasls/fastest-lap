import { MdMenu, MdOutlineClose } from "react-icons/md";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

type MobileHeaderProps = {
  open: boolean;
  onClick: () => void;
};

export default function MobileHeader({ open, onClick }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-100 bg-neutral-50/95 py-2 lg:hidden">
      <Logo />
      <button className="z-50" onClick={onClick}>
        {open ? (
          <MdOutlineClose className="pr-2 text-5xl" />
        ) : (
          <MdMenu className="pr-2 text-5xl" />
        )}
      </button>
      <MobileNav open={open} onClick={onClick}/>
    </header>
  );
}
