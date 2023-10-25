import React from "react";

type HeadingProps = {
  type: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
};

export default function Heading({ type, className, children }: HeadingProps) {
  switch (type) {
    case "h1":
      return (
        <h1
          className={`text-xl font-semibold sm:text-3xl ${
            className ? className : ""
          }`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`text-lg font-semibold sm:text-xl ${
            className ? className : ""
          }`}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-lg font-medium sm:text-xl ${
            className ? className : ""
          }`}
        >
          {children}
        </h3>
      );
  }
}
