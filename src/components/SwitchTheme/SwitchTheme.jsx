import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/theme/themeSlice";
import { getTheme } from "../../redux/theme/themeSelector";
import style from "./SwitchTheme.module.css";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  return (
    // <select
    //   name="theme"
    //   value={theme}
    //   className={style.select}
    //   onChange={(e) => dispatch(changeTheme(e.target.value))}
    // >
    //   <option value="light">light</option>
    //   <option value="dark">dark</option>
    // </select>
    <>
  {theme === "light" ? <button style={{color: 'black', fontSize: "20px", background:"transparent", border: "none"}} onClick={() => dispatch(changeTheme("dark"))}>&#127774;</button> : <button onClick={() => dispatch(changeTheme("light"))} style={{color: 'white', fontSize: "20px", background:"transparent", border: "none"}}>&#127769;</button>}
    </>
  );
};

export default SwitchTheme;
