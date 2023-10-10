import React from "react";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "./Button";

interface MainNavLinkProps {
  to: string;
  children: React.JSX.Element | React.JSX.Element[];
}

function MainNavLink({ to, children }: MainNavLinkProps) {
  const linkClass: string = `${buttonVariants({
    variant: "ghost",
  })} w-full gap-3 [&>svg]:hover:text-red-600 aria-[current=page]:bg-neutral-100 aria-[current=page]:text-neutral-900 [&>svg]:aria-[current=page]:text-red-600`.replace(
    "justify-center",
    ""
  );
  return (
    <NavLink to={to} className={linkClass}>
      {children}
    </NavLink>
  );
}

export default MainNavLink;
