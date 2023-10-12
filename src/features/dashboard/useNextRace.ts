import { useQuery } from "@tanstack/react-query";
import { getNextRace } from "@/services/apiRaces";

export function useNextRace(currentDate: string) {
  const {
    data: nextRace,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nextRace"],
    queryFn: () => getNextRace(currentDate),
  });

  return { nextRace, isLoading, error };
}
