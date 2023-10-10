import { API_URL_TIME } from "@/lib/constants";

export async function getTimeZone(
  latitute: number,
  longitude: number
): Promise<string> {
  const response = await fetch(
    `${API_URL_TIME}/get-time-zone?key=${
      import.meta.env.VITE_TZ_KEY
    }&format=json&by=position&lat=${latitute}&lng=${longitude}
`
  );

  if (!response.ok)
    throw new Error("Something went wrong with fetching timezone");

  const data = await response.json();

  return data.zoneName;
}
