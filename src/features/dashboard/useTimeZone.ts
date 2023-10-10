import { useQuery } from "@tanstack/react-query";
import { getTimeZone } from "@/services/apiTimeZone";

export function useTimeZone(latitude: number, longitude: number) {
  const {
    data: timeZone,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["timeZone"],
    queryFn: () => getTimeZone(latitude, longitude),
  });

  return { timeZone, isLoading, error };
}
