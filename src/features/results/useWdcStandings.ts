import { useQuery } from "@tanstack/react-query";
import {
  getCumulativeWdcStandings,
  getWdcStandings,
} from "@/services/apiStandings";

export function useWdcStandings({
  season,
  round,
}: {
  season: number;
  round: number;
}) {
  const {
    data: wdcResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wdcResults", season, round],
    queryFn: () => getWdcStandings({ season, round }),
  });

  return { wdcResults, isLoading, error };
}

export function useCumulativeWdcStandings(season: number) {
  const {
    data: cumulativeWdcResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cumulativeWdcResults", season],
    queryFn: () => getCumulativeWdcStandings(season),
  });

  return { cumulativeWdcResults, isLoading, error };
}
