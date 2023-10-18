import Heading from "@/ui/Heading";
import NextRaceCard from "@/features/dashboard/NextRaceCard";
import LastRacesCard from "@/features/dashboard/LastRacesCard";
import WdcCard from "@/features/dashboard/WdcCard";
import WccCard from "@/features/dashboard/WccCard";

export default function Dashboard() {
  return (
    <>
      <Heading type="h1">Dashboard</Heading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(535px,1fr))] gap-6">
        <NextRaceCard />
        <LastRacesCard />
        <WdcCard />
        <WccCard />
      </div>
    </>
  );
}
