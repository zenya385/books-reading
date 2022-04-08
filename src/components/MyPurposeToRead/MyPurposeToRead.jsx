import React from "react";
import { useSelector } from "react-redux";
import { getDurationPeriod, getRemaindBooks } from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books,isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const remaindBooks = useSelector(getRemaindBooks);

  return (
    <div className={s.myPurposeToRead}>
      <h2>Моя мета прочитати</h2>
      <div className={s.numbersPurpose}>
        <span>{books.length}</span>
        <span> {duration}</span>
       {isTrain&& <span> {remaindBooks.length}</span>}
      </div>
    </div>
  );
};

export default MyPurposeToRead;
