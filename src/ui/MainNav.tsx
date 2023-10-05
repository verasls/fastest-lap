import { NavLink } from "react-router-dom";

function MainNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/app">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/app/circuits">Circuits</NavLink>
        </li>
        <li>
          <NavLink to="/app/drivers">Drivers</NavLink>
        </li>
        <li>
          <NavLink to="/app/constructors">Constructors</NavLink>
        </li>
        <li>
          <NavLink to="/app/results">Results</NavLink>
        </li>
        <li>
          <NavLink to="/app/plots">Plots</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
