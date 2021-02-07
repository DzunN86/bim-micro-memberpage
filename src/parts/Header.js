import React from "react";
import propTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";

import { ReactComponent as Logo } from "assets/images/logo.svg";

function Header({ onLight, location }) {
  const linkColor = onLight ? "text-white sm:text-gray-900 " : "text-white";

  const [toggleMenu, setToggleMenu] = React.useState(false);

  const linkCTA =
    location.pathname.indexOf("/login") > -1 ? `/register` : `/login`;
  const textCTA = location.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";

  const classNameLogo = onLight
    ? toggleMenu
      ? "on-dark"
      : "on-light"
    : "on-light";
  return (
    <header
      className={[
        "flex justify-between items-center",
        toggleMenu ? "fixed w-full -mx-4 px-4" : "",
      ].join(" ")}
    >
      <div style={{ height: 54 }} className="z-50">
        <Logo className={classNameLogo}></Logo>
      </div>
      <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div>
      <ul
        className={[
          "transition-all duration-200 items-center fixed inset-0 bg-indigo-1000 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible",
          toggleMenu ? "opacity-100 visible z-20" : "opacity-0 invisible",
        ].join(" ")}
      >
        <li className="leading-10">
          <Link
            to="/"
            className={[
              linkColor,
              " hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Home
          </Link>
        </li>
        <li className="leading-10">
          <Link
            to="/"
            className={[
              linkColor,
              " hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Pricing
          </Link>
        </li>
        <li className="leading-10">
          <Link
            to="/"
            className={[
              linkColor,
              " hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Features
          </Link>
        </li>
        <li className="leading-10">
          <Link
            to="/"
            className={[
              linkColor,
              " hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Story
          </Link>
        </li>
        <li className="leading-10 mt-6">
          <Link
            to={linkCTA}
            className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium ml-6"
          >
            {textCTA}
          </Link>
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
