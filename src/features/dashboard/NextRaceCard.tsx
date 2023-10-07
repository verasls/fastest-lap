import { MdOutlineLocationOn, MdTag } from "react-icons/md";
import Spinner from "@/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Race } from "@/services/api.types";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { getCountryFlag, getdateDifference } from "@/lib/helpers";

function NextRaceCard() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace, isLoading } = useNextRace(
    currentYear as number,
    currentDate as string
  );

  if (isLoading) return <Spinner />;

  const numDays = getdateDifference(
    (nextRace as Race).date,
    currentDate as string
  );

  const countryFlag = getCountryFlag((nextRace as Race).country);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {numDays < 3
            ? "It's already a race weekend!"
            : `Next race weekend in ${numDays} day${numDays > 1 ? "s" : ""}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export default NextRaceCard;
