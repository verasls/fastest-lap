import { useQuery } from "@tanstack/react-query";
import { getNextRace } from "@/services/api";

export function useNextRace(currentYear: number, currentDate: string) {
  const {
    data: nextRace,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nextRace"],
    queryFn: () => getNextRace(currentYear, currentDate),
  });

  return { nextRace, isLoading, error };
}
