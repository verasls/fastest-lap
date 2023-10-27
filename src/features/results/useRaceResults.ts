import { useQuery } from "@tanstack/react-query";
import { getRaceResults } from "@/services/apiResults";

export function useRaceResults({
  season,
  round,
}: {
  season: number;
  round: number;
}) {
  const {
    data: raceResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["raceResults", season, round],
    queryFn: () => getRaceResults({ season, round }),
  });

  return { raceResults, isLoading, error };
}
