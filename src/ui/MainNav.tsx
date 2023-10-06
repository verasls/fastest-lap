import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
  MdOutlineHandyman,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdShowChart,
} from "react-icons/md";
import MainNavLink from "./MainNavLink";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <MainNavLink to="/app/dashboard">
            <MdOutlineDashboard className="text-2xl text-neutral-400" />
            <span>Dashboard</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/app/drivers">
            <MdOutlinePerson className="text-2xl text-neutral-400" />
            <span>Drivers</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/app/constructors">
            <MdOutlineHandyman className="text-2xl text-neutral-400" />
            <span>Constructors</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/app/circuits">
            <MdOutlineLocationOn className="text-2xl text-neutral-400" />
            <span>Circuits</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/app/results">
            <MdOutlineEmojiEvents className="text-2xl text-neutral-400" />
            <span>Results</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/app/plots">
            <MdShowChart className="text-2xl text-neutral-400" />
            <span>Plots</span>
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
