import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    // toast.success('Logged out successfully!');
    navigate("/login");
  };
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // CSS for active link
  // const activeLinkStyle =
  //   "relative after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:transform after:origin-left";
  const activeLinkStyle =
    "null";

  return (
    <div className="navbar bg-base-100 Header">
      <div className="navbar-start">
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleMenu} className="lg:hidden hamberger-small">
            <label className="swap swap-rotate Hamburger_Icon">
              {isOpen ? (
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              )}
            </label>
          </button>

          <ul
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text- font-semibold ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <Link to={"/"} className={isActive("/") ? activeLinkStyle : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/blogs"}
                className={isActive("/blogs") ? activeLinkStyle : ""}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to={"/gallery"}
                className={isActive("/gallery") ? activeLinkStyle : ""}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={isActive("/about") ? activeLinkStyle : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={"/contact-me"}
                className={isActive("/contact-me") ? activeLinkStyle : ""}
              >
                Contact Me
              </Link>
            </li>
          </ul>
        </div>
        <Link className="text-xl hamberger-small" to={"/"}>
          <img src="/raj-logo.png" alt="Raj" width={120} height={50} />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base font-semibold">
          <li>
            <Link to={"/"} className={isActive("/") ? activeLinkStyle : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/blogs"}
              className={isActive("/blogs") ? activeLinkStyle : ""}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to={"/gallery"}
              className={isActive("/gallery") ? activeLinkStyle : ""}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className={isActive("/about") ? activeLinkStyle : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/contact-me"}
              className={isActive("/contact-me") ? activeLinkStyle : ""}
            >
              Contact Me
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="px-2">
          <label className="grid cursor-pointer place-items-center">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        {/* {isLoggedIn ? (
                    <button onClick={handleLogout} className="btn">Logout</button>
                ) : (
                    <Link to="/signup" className="btn">Sign Up</Link>
                )} */}
      </div>
    </div>
  );
};

export default Header;
