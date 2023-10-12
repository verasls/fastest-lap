import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { getCountryFlag } from "@/lib/helpers";
import { MdOutlineLocationOn, MdTag } from "react-icons/md";
import { Race } from "@/services/apiRaces";

export default function NextRaceInfo() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace } = useNextRace(
    currentYear as number,
    currentDate as string
  );

  const countryFlag = getCountryFlag((nextRace as Race).country);

  return (
    <div>
      <div className="flex items-center">
        <MdTag className="text-2xl text-red-600" />
        <p>
          Round {(nextRace as Race).round} - {(nextRace as Race).raceName}
        </p>
      </div>
      <div className="flex items-center">
        <MdOutlineLocationOn className="text-2xl text-red-600" />
        <p>
          {(nextRace as Race).circuitName} - {(nextRace as Race).country}
        </p>
        <span className="pl-1 text-2xl">{countryFlag}</span>
      </div>
    </div>
  );
}
