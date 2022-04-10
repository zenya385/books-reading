import React from "react";
import { useSelector } from "react-redux";
import { getDurationPeriod, getRemaindBooks } from "../../redux/training/trainingSelectors";
import { getTheme } from "../../redux/theme/themeSelector";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books,isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const remaindBooks = useSelector(getRemaindBooks);
  const theme = useSelector(getTheme);

  return (
    <div className={s.myPurposeToRead} style={{
      backgroundColor:
        theme === "light" ? "white" : "var(--dark-header)",
    }}>
      <h2>Моя мета прочитати</h2>
      <div
        className={s.numbersPurpose}
        style={{
          color: theme === "light" ? "black" : "black",
          // height: "100vh",
        }}
      >
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
        {/* <span style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}> {books.length}</span>
======= */}
        
       {isTrain&& <span style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}> {remaindBooks.length}</span>}

      </div>
    </div>
  );
};

export default MyPurposeToRead;
