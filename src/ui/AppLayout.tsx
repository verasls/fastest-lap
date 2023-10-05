import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[16rem_1fr]">
      <Sidebar />
      <main className="overflow-scroll bg-neutral-50 px-12 py-10">
        <div className="mx-auto my-0 flex max-w-7xl flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
