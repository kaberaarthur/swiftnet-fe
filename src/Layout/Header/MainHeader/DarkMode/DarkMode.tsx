import SVG from "@/CommonComponent/SVG";
import { Href } from "@/Constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { setMixLayoutType } from "@/Redux/Reducers/ThemeCustomizerSlice";
import { useState, useEffect } from "react";
import { NavLink } from "reactstrap";
import Cookies from 'js-cookie';

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(() => {
    // Read the initial state from the cookie
    const cookieValue = Cookies.get('darkMode');
    return cookieValue === 'true'; // Convert the cookie value to a boolean
  });

  useEffect(() => {
    // Dispatch the current dark mode value to the store on mount
    dispatch(setMixLayoutType(darkMode ? "dark" : "light"));
  }, [darkMode, dispatch]);

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Store the new value in a cookie as a string
    Cookies.set('darkMode', String(newDarkMode), { expires: 365 }); // Expires in 365 days

    // Dispatch the theme change
    dispatch(setMixLayoutType(newDarkMode ? "dark" : "light"));
  };

  return (
    <li className="modes d-flex">
      <NavLink className={`dark-mode ${darkMode ? "active" : ""}`} href={Href} onClick={handleDarkMode}>
        <SVG className="svg-color" iconId="Moon" />
      </NavLink>
    </li>
  );
};

export default DarkMode;
