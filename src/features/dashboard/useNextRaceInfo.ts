import { useQuery } from "@tanstack/react-query";
import { getNextRaceInfo } from "../../services/api";

export function useNextRaceInfo(currentYear: number, currentDate: string) {
  const {
    data: nextRaceInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nextRaceInfo"],
    queryFn: () => getNextRaceInfo(currentYear, currentDate),
  });

  return { nextRaceInfo, isLoading, error };
}
