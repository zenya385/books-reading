import React from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../redux/theme/themeSelector";
import { getDurationPeriod } from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books }) => {
  const duration = useSelector(getDurationPeriod);
  const theme = useSelector(getTheme);

  return (
    <div className={s.myPurposeToRead}>
      <h2>Моя мета прочитати</h2>
      <div
        className={s.numbersPurpose}
        style={{
          color: theme === "light" ? "black" : "black",
          // height: "100vh",
        }}
      >
        <span>{books.length}</span>
        <span> {duration}</span>
        <span> {books.length}</span>
      </div>
    </div>
  );
};

export default MyPurposeToRead;
