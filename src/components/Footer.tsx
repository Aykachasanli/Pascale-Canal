import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import logo from "../assets/images/logo-reversed.avif";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
  };

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
                  <Link to="https://www.remycanal.me/" target="_blank">Rémy Canal</Link>
                </span>
              </p>

              <form className="form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Subscribe</button>
                </div>
                {message && (
                  <p
                    className={`${
                      message.includes("successfully") ? "success" : "error"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>

            <div className="columns">
              <div className="col">
                <h4 className="title">Site Map</h4>
                <ul className="footerList">
                  <li className="footerItem">Paintings</li>
                  <li className="footerItem">How does it work?</li>
                  <li className="footerItem">Custom order</li>
                  <li className="footerItem">Who am I?</li>
                  <li className="footerItem">My events</li>
                  <li className="footerItem">Contact</li>
                </ul>
              </div>

              <div className="col">
                <h4 className="title">Social networks</h4>
                <ul className="footerList">
                  <li className="footerItem">
                    {" "}
                    <FaInstagram className="icon"/>
                    Instagram
                  </li>
                  <li className="footerItem">
                    {" "}
                    <FaLinkedin className="icon"/>
                    LinkedIn
                  </li>
                </ul>
              </div>

              <div className="col">
                <h4 className="title">Information</h4>
                <ul className="footerList">
                  <li className="footerItem">FAQ</li>
                  <li className="footerItem">Legal notices</li>
                  <li className="footerItem">Privacy Policy</li>
                  <li className="footerItem">Terms and Conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h2 className="title">CHASN</h2>
      </div>
    </footer>
  );
};

export default Footer;
