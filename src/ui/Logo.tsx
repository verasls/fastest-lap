import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex flex-col items-center rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950"
    >
      <img src="/logo.png" className="h-24 w-auto" />
      <h1 className="font-logo text-2xl">Fastest Lap</h1>
    </Link>
  );
}
