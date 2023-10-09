import { createContext, useContext } from "react";

export interface UserInfo {
  currentYear: number;
  currentDate: string;
}

export const UserInfoContext = createContext({} as Partial<UserInfo>);

export function useUserInfoContext(): UserInfo {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("UserInfoContext was used outside of UserInfoProvider");
  }
  return context as UserInfo;
}
