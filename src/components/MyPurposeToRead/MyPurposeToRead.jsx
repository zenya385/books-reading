import React from "react";
import { useSelector } from "react-redux";
import { getDurationPeriod } from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books }) => {
  const duration = useSelector(getDurationPeriod);

  return (
    <div className={s.myPurposeToRead}>
      <h2>Моя мета прочитати</h2>
      <div className={s.numbersPurpose}>
        <span>{books.length}</span>
        <span> {duration}</span>
        <span> {books.length}</span>
      </div>
    </div>
  );
};

export default MyPurposeToRead;
