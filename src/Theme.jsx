import { useContext } from "react";
import UserContext from "./UserContext";

function Theme() {
  const { theme, setTheme } = useContext(UserContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Dark Mode
    </button>
  );
}

export default Theme;
