import { useNextRace } from "./useNextRace";
import { getCountryFlag, getCurrentDate } from "@/lib/helpers";
import { MdOutlineLocationOn, MdTag } from "react-icons/md";
import { Race } from "@/services/apiRaces";

export default function NextRaceInfo() {
  const currentDate = getCurrentDate();
  const { nextRace } = useNextRace(currentDate);

  const nextRaceData = nextRace as Race;

  const countryFlag = getCountryFlag(nextRaceData.country);

  return (
    <div>
      <div className="flex items-center gap-2">
        <MdTag className="text-2xl text-red-600" />
        <p>
          Round {nextRaceData.round} - {nextRaceData.raceName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-2xl text-red-600" />
        <p>
          {nextRaceData.circuitName} - {nextRaceData.country}
        </p>
        <span className="pl-1 text-2xl">{countryFlag}</span>
      </div>
    </div>
  );
}
