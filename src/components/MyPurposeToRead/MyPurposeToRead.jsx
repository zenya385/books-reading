import React from "react";
import { useSelector } from "react-redux";
import { langOptionsPurposeToRead } from "../../assets/langOptionsPurposeToRead";
import { getLang } from "../../redux/lang/langSelector";
import {
  getDurationPeriod,
  getRemaindBooks,
} from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";
import { getTheme } from "../../redux/theme/themeSelector";

const MyPurposeToRead = ({ books, isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const lang = useSelector(getLang);
  const { goal } = langOptionsPurposeToRead;
  const remaindBooks = useSelector(getRemaindBooks);
  const theme = useSelector(getTheme);
  
  return (
    <div className={s.myPurposeToRead} style={{
      backgroundColor:
        theme === "light" ? "white" : "var(--dark-header)",
    }}>
      <h2>{goal[lang]}</h2>
      <div className={s.numbersPurpose} style={{
          color: theme === "light" ? "black" : "black",
        }}>
        <span style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}>{books.length}</span>
        <span style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}> {duration}</span>
        {isTrain && <span style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}> {remaindBooks.length}</span>}
      </div>
    </div>
  );
};

export default MyPurposeToRead;
