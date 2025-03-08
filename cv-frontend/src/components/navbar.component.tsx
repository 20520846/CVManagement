import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../context/theme.context";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const toggleOpenMenu = () => {
    setOpen((prev) => !prev);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume Management</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((item, index) => (
            <li
              key={item.href}
              onClick={toggleOpenMenu}
            >
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={toggleOpenMenu} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
