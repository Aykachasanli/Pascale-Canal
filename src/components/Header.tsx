import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo-reversed.avif";

const navLinks = [
  { to: "/", label: "Paintings" },
  { to: "/", label: "Who am I?" },
  { to: "/contact", label: "Contact" },
  
];

const bgColorsForPath = ["/contact", "/personal"];


const Header = () => {
  const path = useLocation();
  const isBlackBg = bgColorsForPath.includes(path?.pathname);

  // Mobil menunun açıq/qapalı vəziyyətini idarə etmək üçün state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menyunun vəziyyətini dəyişdirən funksiya
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    // Menyu açılanda body-də scrollu qadağan etmək
    document.body.style.overflow = newState ? "hidden" : "unset";
  };

  const renderNavLinks = (isMobile = false) => (
    <ul className={isMobile ? "mobileNavList" : "navList"}>
      {navLinks.map((link) => (
        <li className="navItem" key={link.to + link.label}>
          <NavLink
            style={{
              color: isMobile ? "#fff" : isBlackBg ? "#fff" : "#000",
            }}
            to={link.to}
            onClick={isMobile ? toggleMenu : undefined}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className="header"
      style={{
        background: isBlackBg ? "#222222" : "white",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/" onClick={isMenuOpen ? toggleMenu : undefined}>
              <img
                style={{
                  filter: isBlackBg ? "invert(0)" : "invert(100%)",
                }}
                src={logo}
                alt="logo"
              />
            </Link>
          </div>

          <nav className="navBar desktopNav">{renderNavLinks()}</nav>

          <button
            className={`menuToggle ${isMenuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
            style={{
              background: isBlackBg ? "white" : "black",
            }}
          >
            <div className="hamburgerIcon">
              <span
                className="line top"
                style={{ background: isBlackBg ? "black" : "white" }}
              ></span>
              <span
                className="line middle"
                style={{ background: isBlackBg ? "black" : "white" }}
              ></span>
              <span
                className="line bottom"
                style={{ background: isBlackBg ? "black" : "white" }}
              ></span>
            </div>
          </button>
        </div>
      </div>

      <div className={`mobileMenuOverlay ${isMenuOpen ? "is-active" : ""}`}>
        <button className="closeButton" onClick={toggleMenu}>
          &times;
        </button>
        <nav className="mobileNav">{renderNavLinks(true)}</nav>
      </div>
    </header>
  );
};

export default Header;
