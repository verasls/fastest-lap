import { useQuery } from "@tanstack/react-query";
import {
  getCumulativeWccStandings,
  getWccStandings,
} from "@/services/apiStandings";

export function useWccStandings({
  year,
  round,
}: {
  year: number;
  round: number;
}) {
  const {
    data: wccResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wccResults", year, round],
    queryFn: () => getWccStandings({ year, round }),
  });

  return { wccResults, isLoading, error };
}

export function useCumulativeWccStandings(year: number) {
  const {
    data: cumulativeWccResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cumulativeWccResults", year],
    queryFn: () => getCumulativeWccStandings(year),
  });

  return { cumulativeWccResults, isLoading, error };
}
