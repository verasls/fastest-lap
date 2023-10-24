import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
  MdOutlineHandyman,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdQuestionMark,
} from "react-icons/md";
import MainNavLink from "./MainNavLink";

export default function MainNav({ onClick }: { onClick?: () => void }) {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <MainNavLink to="/" onClick={onClick}>
            <MdOutlineDashboard className="text-2xl text-neutral-400" />
            <span>Dashboard</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/drivers" onClick={onClick}>
            <MdOutlinePerson className="text-2xl text-neutral-400" />
            <span>Drivers</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/constructors" onClick={onClick}>
            <MdOutlineHandyman className="text-2xl text-neutral-400" />
            <span>Constructors</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/circuits" onClick={onClick}>
            <MdOutlineLocationOn className="text-2xl text-neutral-400" />
            <span>Circuits</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/results" onClick={onClick}>
            <MdOutlineEmojiEvents className="text-2xl text-neutral-400" />
            <span>Results</span>
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/about" onClick={onClick}>
            <MdQuestionMark className="text-2xl text-neutral-400" />
            <span>About</span>
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}
