import Heading from "@/ui/Heading";
import NextRaceCard from "@/features/dashboard/NextRaceCard";
import LastRacesCard from "@/features/dashboard/LastRacesCard";
import WdcCard from "@/features/dashboard/WdcCard";
import WccCard from "@/features/dashboard/WccCard";

export default function Dashboard() {
  return (
    <>
      <Heading type="h1" className="pl-2">
        Dashboard
      </Heading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 sm:grid-cols-[repeat(auto-fit,minmax(535px,1fr))]">
        <NextRaceCard />
        <LastRacesCard />
        <WdcCard />
        <WccCard />
      </div>
    </>
  );
}
