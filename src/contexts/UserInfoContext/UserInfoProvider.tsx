import { PropsWithChildren, useState } from "react";
import { getCurrentDate, getCurrentYear } from "../../lib/helpers";
import { UserInfoContext } from "./UserInfoContext";

export function UserInfoProvider({ children }: PropsWithChildren) {
  const [currentYear] = useState<number>(getCurrentYear);
  const [currentDate] = useState<string>(getCurrentDate);

  return (
    <UserInfoContext.Provider value={{ currentYear, currentDate }}>
      {children}
    </UserInfoContext.Provider>
  );
}
