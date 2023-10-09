import { PropsWithChildren, useState } from "react";
import { UserInfoContext, UserInfo } from "./UserInfoContext";
import { getCurrentDate, getCurrentYear } from "@/lib/helpers";

export function UserInfoProvider({ children }: PropsWithChildren) {
  const [currentYear] = useState<number>(getCurrentYear());
  const [currentDate] = useState<string>(getCurrentDate());

  return (
    <UserInfoContext.Provider value={{ currentYear, currentDate } as UserInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}
