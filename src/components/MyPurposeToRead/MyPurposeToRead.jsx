import React from "react";
import { useSelector } from "react-redux";
import { langOptionsPurposeToRead } from "../../assets/langOptionsPurposeToRead";
import { getLang } from "../../redux/lang/langSelector";
import { getTheme } from "../../redux/theme/themeSelector";
import { getDurationPeriod } from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books }) => {
  const duration = useSelector(getDurationPeriod);
  const lang = useSelector(getLang);
  const { goal } = langOptionsPurposeToRead;

  return (
    <div className={s.myPurposeToRead}>
      <h2>{goal[lang]}</h2>
      <div className={s.numbersPurpose}>
        <span>{books.length}</span>
        <span> {duration}</span>
        <span> {books.length}</span>
      </div>
    </div>
  );
};

export default MyPurposeToRead;
