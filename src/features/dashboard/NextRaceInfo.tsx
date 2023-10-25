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
          {nextRaceData.circuitName} -{" "}
          <span className="whitespace-nowrap">
            {nextRaceData.country}
            <span className="relative top-[-1.6px] pl-1 align-middle text-2xl">
              {countryFlag}
            </span>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
