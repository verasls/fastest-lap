import { createContext, useContext } from "react";

interface UserInfoType {
  currentYear: number;
  currentDate: string;
}

export const UserInfoContext = createContext({} as Partial<UserInfoType>);

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("UserInfoContext was used outside of UserInfoProvider");
  }
  return context;
}
