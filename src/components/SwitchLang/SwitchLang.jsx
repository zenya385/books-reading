import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/lang/langSlice";
import { getLang } from "../../redux/lang/langSelector";
import style from "./SwitchLang.module.css";

const SwitchLang = () => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);

  return (
    <select
      className={style.select}
      // style={
      //   theme === "light" ? { color: "black" } : { color: "rgb(43, 145, 139)" }
      // }
      onChange={(e) => dispatch(changeLang(e.target.value))}
      name="lang"
      value={lang}
    >
      <option value={"en"}>EN</option>
      <option value={"ua"}>УКР</option>
    </select>
  );
};

export default SwitchLang;
