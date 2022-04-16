import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/theme/themeSlice";
import { getTheme } from "../../redux/theme/themeSelector";
import s from "./SwitchTheme.module.scss";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  return (
    <div className={s.switch_theme_div}>
      {theme === "light" ? (
        <button
          className={s.btnD}
          onClick={() => dispatch(changeTheme("dark"))}
        >
          &#127774;
        </button>
      ) : (
        <button
          onClick={() => dispatch(changeTheme("light"))}
          className={s.btnL}
        >
          &#127769;
        </button>
      )}
    </div>
  );
};

export default SwitchTheme;
