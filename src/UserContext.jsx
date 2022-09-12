import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const values = {
    theme,
    setTheme
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
