import MainNav from "./MainNav";

type MobileNavProps = {
  open: boolean;
  onClick: () => void;
};

export default function MobileNav({ open, onClick }: MobileNavProps) {
  return (
    <div
      className={`${
        open ? "visible translate-x-0" : "invisible translate-x-full"
      } absolute left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-neutral-100 transition-all duration-1000 ease-in-out`}
    >
      <MainNav onClick={onClick} />
    </div>
  );
}
