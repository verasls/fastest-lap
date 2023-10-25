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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <MdTag className="h-6 w-6 min-w-[24px] text-red-600" />
        <p>
          Round {nextRaceData.round} - {nextRaceData.raceName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineLocationOn className="h-6 w-6 min-w-[24px] leading-3 text-red-600" />
        <p className="leading-3">
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
