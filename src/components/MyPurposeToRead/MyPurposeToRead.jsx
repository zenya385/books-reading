import React from "react";
import { useSelector } from "react-redux";
import { langOptionsMyPurposeToRead } from "../../assets/langOptionsMyPurposeToRead";
import { getLang } from "../../redux/lang/langSelector";
import {
  getDurationPeriod,
  getRemaindBooks,
} from "../../redux/training/trainingSelectors";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books, isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const lang = useSelector(getLang);
  const { goal } = langOptionsMyPurposeToRead;
  const remaindBooks = useSelector(getRemaindBooks);

  return (
    <div className={s.myPurposeToRead}>
      <h2>{goal[lang]}</h2>
      <div className={s.numbersPurpose}>
        <span>{books.length}</span>
        <span> {duration}</span>
        {isTrain && <span> {remaindBooks.length}</span>}
      </div>
    </div>
  );
};

export default MyPurposeToRead;
