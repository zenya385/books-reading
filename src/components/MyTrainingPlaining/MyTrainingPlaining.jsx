import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
import {
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";

const MyTrainingPlaining = () => {
  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
  const [endDateOrigin, setEndDateOrigin] = useState(new Date());

  const dispatch = useDispatch();

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
    console.log(
      intervalToDuration({
        start: startDateOrigin,
        end: endDateOrigin,
      }).days
    );
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
    <form onSubmit={null}>
      <h2>Моє тренування</h2>
      <div className={s.datePicker}>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDateOrigin}
          onChange={(date) => setStartDateOrigin(date)}
        />
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={endDateOrigin}
          onChange={(date) => setEndDateOrigin(date)}
        />
      </div>
    </form>
  );
};

export default MyTrainingPlaining;
