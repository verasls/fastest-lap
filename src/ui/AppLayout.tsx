import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

export default function AppLayout() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  function handleClick() {
    setOpenNav((open: boolean) => !open);
  }

  return (
    <div className="grid lg:h-screen lg:grid-cols-[14rem_1fr]">
      <Sidebar />
      <MobileHeader open={openNav} onClick={handleClick} />
      <main className="overflow-scroll bg-neutral-50 px-2 py-10 pt-20 sm:pt-24 md:px-12 lg:pt-10">
        <div className="mx-auto my-0 flex min-h-screen max-w-7xl flex-col gap-6 sm:gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
