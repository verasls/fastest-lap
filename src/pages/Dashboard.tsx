import NextRaceInfo from "../features/dashboard/NextRaceInfo";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <>
      <Heading type="h1">Dashboard</Heading>
      <div>
        <NextRaceInfo />
      </div>
    </>
  );
}

export default Dashboard;
