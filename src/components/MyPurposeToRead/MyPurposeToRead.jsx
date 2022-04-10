import React from "react";
import { useSelector } from "react-redux";
import {
  getDurationPeriod,
  getRemaindBooks,
} from "../../redux/training/trainingSelectors";
import { getTheme } from "../../redux/theme/themeSelector";
import s from "./MyPurposeToRead.module.scss";

const MyPurposeToRead = ({ books, isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const remaindBooks = useSelector(getRemaindBooks); 
  const theme = useSelector(getTheme);

  return (
    <div className={isTrain ? s.myPurposeToRead_complete : s.myPurposeToRead} style={{
      backgroundColor:
        theme === "light" ? "white" : "var(--dark-header)",
    }}>
      <h2 className={isTrain ? s.title_complete : s.title}>
        Моя мета прочитати
      </h2>
      <div className={isTrain ? s.numbersPurpose_complete : s.numbersPurpose} style={{
          color: theme === "light" ? "black" : "black",
        }}>
        <div className={isTrain ? s.numbers_complete : s.numbers}>
          <span className={isTrain ? s.wrapper_complete : s.wrapper} style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}>
            {books.length}
          </span>
          <p className={isTrain ? s.numbers_text_complete : s.numbers_text}>
            Кількість книжок
          </p>
        </div>
        <div className={isTrain ? s.numbers_complete : s.numbers}>
          <span className={isTrain ? s.wrapper_complete : s.wrapper} style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}>
            {duration}
          </span>
          <p className={isTrain ? s.numbers_text_complete : s.numbers_text}>
            Кількість днів
          </p>
        </div>

        {isTrain && (
          <div className={s.numbers_complete}>
            <span className={s.wrapper_complete_last} style={{
      backgroundColor:
        theme === "light" ? "var(--third-bg-color)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : 'var(--dark-text)'
    }}>
              {remaindBooks.length}
            </span>
            <p className={s.numbers_text_complete}>Залишилось книжок</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurposeToRead;
