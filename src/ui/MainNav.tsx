import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
  MdOutlineHandyman,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdQuestionMark,
} from "react-icons/md";
import MainNavLink from "./MainNavLink";

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <MainNavLink to="/">
            <MdOutlineDashboard className="text-2xl text-neutral-400" />
            <span>Dashboard</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/drivers">
            <MdOutlinePerson className="text-2xl text-neutral-400" />
            <span>Drivers</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/constructors">
            <MdOutlineHandyman className="text-2xl text-neutral-400" />
            <span>Constructors</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/circuits">
            <MdOutlineLocationOn className="text-2xl text-neutral-400" />
            <span>Circuits</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/results">
            <MdOutlineEmojiEvents className="text-2xl text-neutral-400" />
            <span>Results</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/about">
            <MdQuestionMark className="text-2xl text-neutral-400" />
            <span>About</span>
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}
