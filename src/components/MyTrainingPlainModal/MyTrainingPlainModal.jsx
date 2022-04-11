import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlainModal.module.scss";
import {
  addBookForTraining,
  addCurBookForTraining,
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";
import {
  // getBooksCurrentlyReadingState,
  getBooksGoingToReadState,
} from "../../redux/books/booksSelectors";
import BookInfoList from "../BookInfoList/BookInfoList";
import {
  getEndDate,
  getStartDate,
  getTrainingBooks,
} from "../../redux/training/trainingSelectors";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyTrainPlan } from "../../assets/langOptionsMyTrainPlan";
import { addPlaningTraining } from "../../redux/training/trainingOperations";
import { Formik } from "formik";
import PurposeToReadList from "../PurposeToReadList/PurposeToReadList";
import ReadListWithCheckBox from "../ReadListWithCheckBox/ReadListWithCheckBox";

const MyTrainingPlainModal = ({
  onHandleClose,
  cbAddBtn,
  bookForTraining,
  handleChangeValue,
}) => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const { training, startTraining, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
  const [endDateOrigin, setEndDateOrigin] = useState(new Date());

  useEffect(() => {
    dispatch(
      changeDateStart(
        formatISO(new Date(startDateOrigin), { representation: "date" })
      )
    );
  }, [startDateOrigin]);

  useEffect(() => {
    dispatch(
      changeDateEnd(
        formatISO(new Date(endDateOrigin), { representation: "date" })
      )
    );
  }, [endDateOrigin]);

  useEffect(() => {
    dispatch(
      getDuration(
        Number(
          intervalToDuration({
            start: startDateOrigin,
            end: endDateOrigin,
          }).days
        )
      )
    );
  }, [startDateOrigin, endDateOrigin]);

  return (
    <>
      <div className={s.wrrapper}>
        <form onSubmit={cbAddBtn} className={s.form}>
          <h2 className={s.title}>{training[lang]}</h2>
          <div className={s.datePicker}>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={startDateOrigin}
              onChange={(date) => setStartDateOrigin(date)}
              className={s.datePickerInput}
            />
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={endDateOrigin}
              onChange={(date) => setEndDateOrigin(date)}
              className={s.datePickerInput}
            />
          </div>
          {Boolean(bookForTraining.length) && (
            <>
              <select
                disabled={bookForTraining.length ? false : true}
                onChange={handleChangeValue}
                className={s.select}
              >
                <option value="default">...</option>
                {bookForTraining.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <button type="submit" className={s.submitBtn}>
                {btn[lang]}
              </button>
            </>
          )}
          {/* лист с чекбоксом после прописания логики можно удалить */}

          {/* {Boolean(curReadBooks.length) && (
        <ReadListWithCheckBox
          booksLibrary={curReadBooks}
          colorIcon="grey"
          review={0}
        />
      )} */}
        </form>
      </div>
    </>
  );
};

export default MyTrainingPlainModal;
