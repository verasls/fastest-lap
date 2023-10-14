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
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["results"],
    queryFn: () => getRaceResults({ year, round }),
  });

  return { results, isLoading, error };
}
