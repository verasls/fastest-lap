import { useQuery } from "@tanstack/react-query";
import {
  getCumulativeWccStandings,
  getWccStandings,
} from "@/services/apiStandings";

export function useWccStandings({
  season,
  round,
}: {
  season: number;
  round: number;
}) {
  const {
    data: wccResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wccResults", season, round],
    queryFn: () => getWccStandings({ season, round }),
  });

  return { wccResults, isLoading, error };
}

export function useCumulativeWccStandings(season: number) {
  const {
    data: cumulativeWccResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cumulativeWccResults", season],
    queryFn: () => getCumulativeWccStandings(season),
  });

  return { cumulativeWccResults, isLoading, error };
}
