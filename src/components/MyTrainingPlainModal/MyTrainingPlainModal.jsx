import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlainModal.module.scss";
import {
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyTrainPlan } from "../../assets/langOptionsMyTrainPlan";

const curDate = new Date();
const today = [curDate.getFullYear(), curDate.getMonth(), curDate.getDate()];
const nextDay = [
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate() + 1,
];

const MyTrainingPlainModal = ({
  onHandleClose,
  cbAddBtn,
  bookForTraining,
  handleChangeValue,
}) => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const { training, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date(...today));
  const [endDateOrigin, setEndDateOrigin] = useState(new Date(...nextDay));

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
        </form>
      </div>
    </>
  );
};

export default MyTrainingPlainModal;
