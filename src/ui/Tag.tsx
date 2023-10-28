import React from "react";

export default function Tag({children}: {children: React.ReactNode}) {
  return (
    <div className="inline-flex h-8 w-[12ch] select-none items-center justify-center rounded-md bg-red-600 px-2 text-xs text-neutral-50 shadow">
      {children}
    </div>
  );
}
