import { MdOutlineLocationOn, MdTag } from "react-icons/md";
import Heading from "@/ui/Heading";
import Spinner from "@/ui/Spinner";
import { Race } from "@/services/api.types";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRaceInfo } from "./useNextRaceInfo";
import { getdateDifference } from "@/lib/helpers";

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

  return (
    <>
      <Heading type="h2">
        {numDays < 3
          ? "It's already a race weekend!"
          : `Next race weekend in ${numDays} day${numDays > 1 ? "s" : ""}`}
      </Heading>
      <div className="flex items-center pt-2">
        <MdTag className="text-2xl text-red-700" />
        <p>
          Round {(nextRaceInfo as Race).round} -{" "}
          {(nextRaceInfo as Race).raceName}
        </p>
      </div>
      <div className="flex items-center pt-1">
        <MdOutlineLocationOn className="text-2xl text-red-700" />
        <p>
          {(nextRaceInfo as Race).circuitName} -{" "}
          {(nextRaceInfo as Race).country}
        </p>
      </div>
    </>
  );
}

export default NextRaceInfo;
