import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrainingBooks,
  getEndDate,
  getStartDate,
} from "../../redux/training/trainingSelectors";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
import { changeDateStart } from "../../redux/training/trainingSlice";

const MyTrainingPlaining = () => {
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  // const books = useSelector(getTrainingBooks);
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   console.log(e)
  //   console.log(dispatch)
  //   // console.log(dispatch(changeDateStart()));
  //   // return e
  //   // const { name, value } = e.target;
  //   dispatch(changeDateStart(e));
  // };

  return (
    <form onSubmit={null}>
      <h2>Моє тренування</h2>
      <div className={s.datePicker}>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={(date) => dispatch(changeDateStart(date))} //(date) => setStartDate(date)
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
