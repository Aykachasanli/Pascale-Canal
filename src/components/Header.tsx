import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo-reversed.avif";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="navBar">
            <ul className="navList">
              <li className="navItem">
                <NavLink to="/">Paintings</NavLink>
              </li>

              <li className="navItem">
                <NavLink to="/">Who am I?</NavLink>
              </li>

              <li className="navItem">
                <NavLink to="/shop">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
