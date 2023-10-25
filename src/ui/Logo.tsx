import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-1 rounded-md pl-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 lg:flex lg:flex-col lg:items-center"
    >
      <img
        src="/logo.png"
        className="h-10 w-auto sm:h-16 sm:w-16 lg:h-24 lg:w-24"
      />
      <h1 className="font-logo text-xl sm:text-3xl lg:text-2xl">Fastest Lap</h1>
    </Link>
  );
}
