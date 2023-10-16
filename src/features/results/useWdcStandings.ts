import { useQuery } from "@tanstack/react-query";
import {
  getCumulativeWdcStandings,
  getWdcStandings,
} from "@/services/apiStandings";

export function useWdcStandings({
  year,
  round,
}: {
  year: number;
  round: number;
}) {
  const {
    data: wdcResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wdcResults", year, round],
    queryFn: () => getWdcStandings({ year, round }),
  });

  return { wdcResults, isLoading, error };
}

export function useCumulativeWdcStandings(year: number) {
  const {
    data: cumulativeWdcResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cumulativeWdcResults", year],
    queryFn: () => getCumulativeWdcStandings(year),
  });

  return { cumulativeWdcResults, isLoading, error };
}
