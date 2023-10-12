import React from "react";

type HeadingProps = {
  type: "h1" | "h2" | "h3";
  children: React.ReactNode;
};

export default function Heading({ type, children }: HeadingProps) {
  switch (type) {
    case "h1":
      return <h1 className="text-3xl font-semibold">{children}</h1>;
    case "h2":
      return <h2 className="text-xl font-semibold">{children}</h2>;
    case "h3":
      return <h3 className="text-xl font-medium">{children}</h3>;
  }
}
