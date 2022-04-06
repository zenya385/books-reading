import React from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import {
  getTrainingBooks,
  getEndDate,
  getStartDate,

} from "../../redux/training/trainingSelectors";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";

const MyTrainingPlaining = () => {
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const books = useSelector(getTrainingBooks);

  return (
    <form onSubmit={null}>
      <h2>Моє тренування</h2>
      <div className={s.datePicker}>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={null} //(date) => setStartDate(date)
        />
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={endDate}
          onChange={null} //(date) => setEndDate(date)
        />
      </div>
    </form>
  );
};

export default MyTrainingPlaining;
