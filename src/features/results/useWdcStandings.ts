import { useQuery } from "@tanstack/react-query";
import { getWdcStandings } from "@/services/apiStandings";

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
