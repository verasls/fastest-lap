import { MdOutlineLocationOn, MdTag } from "react-icons/md";
import Spinner from "@/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Race } from "@/services/api.types";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRaceInfo } from "./useNextRaceInfo";
import { getCountryFlag, getdateDifference } from "@/lib/helpers";

function NextRaceInfo() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRaceInfo, isLoading } = useNextRaceInfo(
    currentYear as number,
    currentDate as string
  );

  if (isLoading) return <Spinner />;

  const numDays = getdateDifference(
    (nextRaceInfo as Race).date,
    currentDate as string
  );

  const countryFlag = getCountryFlag((nextRaceInfo as Race).country);

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
            Round {(nextRaceInfo as Race).round} -{" "}
            {(nextRaceInfo as Race).raceName}
          </p>
        </div>
        <div className="flex items-center">
          <MdOutlineLocationOn className="text-2xl text-red-600" />
          <p>
            {(nextRaceInfo as Race).circuitName} -{" "}
            {(nextRaceInfo as Race).country}
          </p>
          <span className="pl-1 text-2xl">{countryFlag}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default NextRaceInfo;
