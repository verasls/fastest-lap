import Heading from "@/ui/Heading";
import NextRaceInfo from "@/features/dashboard/NextRaceInfo";

function Dashboard() {
  return (
    <>
      <Heading type="h1">Dashboard</Heading>
      <div
        id="dash"
        className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-6"
      >
        <NextRaceInfo />
        <div>Dash 2</div>
      </div>
    </>
  );
}

export default Dashboard;
