import { useQuery } from "@tanstack/react-query";
import { getLastRaces } from "@/services/apiRaces";

export function useLastRaces(currentDate: string) {
  const {
    data: lastRaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lastRaces"],
    queryFn: () => getLastRaces(currentDate),
  });

  return { lastRaces, isLoading, error };
}
