import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar.component";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return (
    <div className={appStyle}>
      <Navbar />
      <div className="wrapper">Routes</div>
    </div>
  );
};

export default App;
