import { useQuery } from "@tanstack/react-query";
import { getRaceResults } from "@/services/apiResults";

export function useRaceResults({
  year,
  round,
}: {
  year: number;
  round: number;
}) {
  const {
    data: raceResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["raceResults", year, round],
    queryFn: () => getRaceResults({ year, round }),
  });

  return { raceResults, isLoading, error };
}
