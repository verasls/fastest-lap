import { Button } from "@/ui/Button";
import { NavLink } from "react-router-dom";

export default function ResultsButton() {
  return (
    <Button className="w-[13ch] bg-red-600 hover:bg-red-600" size="sm" asChild>
      <NavLink to="/app/results">Results</NavLink>
    </Button>
  );
}
