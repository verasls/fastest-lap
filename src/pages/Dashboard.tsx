import Heading from "@/ui/Heading";
import NextRaceCard from "@/features/dashboard/NextRaceCard";
import LastRacesCard from "@/features/dashboard/LastRacesCard";

export default function Dashboard() {
  return (
    <>
      <Heading type="h1">Dashboard</Heading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(535px,1fr))] gap-6">
        <NextRaceCard />
        <LastRacesCard />
      </div>
    </>
  );
}
