import { Button } from "@/ui/Button";
import { NavLink } from "react-router-dom";

function ResultsButton() {
  return (
    <Button className="bg-red-600 hover:bg-red-500" size="sm" asChild>
      <NavLink to="/app/results">Results</NavLink>
    </Button>
  );
}

export default ResultsButton;
