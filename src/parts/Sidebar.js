import React from "react";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";

import { Link, withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import users from "constants/api/users";

function Sidebar({ match, history }) {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const getNavLinkClass = (path) => {
    return match.path === path
      ? "active text-white bg-indigo-900"
      : "text-indigo-500";
  };
  const USERS = useSelector((state) => state.users);

  function logout() {
    users.logout().then(() => {
      localStorage.removeItem("BWAMICRO:token");
      history.push("/login");
    });
  }

  const sidebarStyle = {
    width: 280,
    left: window.innerWidth < 640 && !toggleMenu ? "-280px" : 0,
  };

  return (
    <>
      <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div>
      <aside
        className="transition-all duration-300 bg-indigo-1000 max-h-screen h-screen overflow-y-auto min-h-full fixed sm:relative z-50"
        style={sidebarStyle}
      >
        {toggleMenu && (
          <div
            className="overlay"
            onClick={() => setToggleMenu((prev) => !prev)}
          ></div>
        )}
        <div
          className="max-h-screen h-screen fixed bg-indig-1000 flex flex-col content-between z-50"
          style={{ width: 280 }}
        >
          <div className="flex flex-col text-center mt-8">
            <div className="border border-indigo-500 rounded-full mx-auto p-2 inline-flex  mb-3">
              <div className="rounded-full overflow-hidden">
                {USERS?.avatar ? (
                  <img
                    className="object-cover w-24 h-24"
                    src={USERS?.avatar}
                    alt={USERS?.name}
                  />
                ) : (
                  <DefaultUser className="fill-indigo-500 w-24 h-24"></DefaultUser>
                )}
              </div>
            </div>

            <h6 className="text-white text-xl">{USERS?.name ?? "Username"}</h6>
            <span className="text-indigo-500 text-sm">
              {USERS?.profession ?? "Profession"}
            </span>
          </div>

          <ul className="main-menu mt-12">
            <li>
              <Link
                className={[
                  "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/"),
                ].join(" ")}
                to="/"
              >
                My Class
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500",
                ].join(" ")}
                href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}
              >
                Library
              </a>
            </li>
            <li>
              <Link
                className={[
                  "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/transactions"),
                ].join(" ")}
                to="/transactions"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                className={[
                  "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/settings"),
                ].join(" ")}
                to="/settings"
              >
                Settings
              </Link>
            </li>
          </ul>

          <div className="my-auto"></div>

          <ul className="main-menu mt-12">
            <li>
              <button
                className={[
                  "nav-link relative text-indigo-500 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                ].join(" ")}
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default withRouter(Sidebar);
