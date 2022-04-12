import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/lang/langSlice";
import { getLang } from "../../redux/lang/langSelector";
import style from "./SwitchLang.module.scss";
import { getTheme } from "../../redux/theme/themeSelector";

const SwitchLang = () => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const theme = useSelector(getTheme);

  return (
    <select
      className={style.select}
      style={
        theme === "light" ? { color: "black" } : { color: "white" }
      }
      onChange={(e) => dispatch(changeLang(e.target.value))}
      name="lang"
      value={lang}
    >
      <option value={"en"}>ENG</option>
      <option value={"ua"}>УКР</option>
    </select>
  );
};

export default SwitchLang;
