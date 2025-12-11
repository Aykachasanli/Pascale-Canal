import React from "react";
import { Link } from "react-router-dom"; 
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6"; 
import logo from "../assets/images/logo-reversed.avif";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="top">
            <div className="left">
              <img src={logo} alt="logo" className="logo" />
              <p>© 2025 Pascale Canal.</p>
              <p className="author">
                Website by
                <span>
                  <Link to="https://www.remycanal.me/" target="_blank">
                    Rémy Canal
                  </Link>
                </span>
              </p>
            </div>

            <div className="columns-container">
              
              <div className="col">
                <h4 className="title">Site Map</h4>
                <ul className="footerList">
                  <li className="footerItem">
                    <Link to="/">Paintings</Link>
                  </li>
              
                
                  <li className="footerItem">
                    <Link to="/about">Who am I?</Link>
                  </li>
                 
                  <li className="footerItem">
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>

              <div className="col">
                <h4 className="title">Social networks</h4>
                <ul className="footerList">
                  <li className="footerItem social-item">
                    <Link to="https://www.instagram.com/pascale.canal/" target="_blank">
                      <FaInstagram className="icon" />
                      Instagram
                    </Link>
                  </li>
                  <li className="footerItem social-item">
                    <Link to="https://www.linkedin.com/in/pascale-canal/" target="_blank">
                      <FaLinkedinIn className="icon" />
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bottom">
        <h2 className="title">PASCALE</h2>
      </div>
    </footer>
  );
};

export default Footer;