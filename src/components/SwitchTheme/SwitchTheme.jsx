import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/theme/themeSlice";
import { getTheme } from "../../redux/theme/themeSelector";
import style from "./SwitchTheme.module.css";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  return (
    <select
      name="theme"
      value={theme}
      className={style.select}
      onChange={(e) => dispatch(changeTheme(e.target.value))}
    >
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  );
};

export default SwitchTheme;
