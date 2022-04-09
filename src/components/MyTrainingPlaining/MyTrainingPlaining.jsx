import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
import {
  addBookForTraining,
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";
import {
  getBooksCurrentlyReadingState,
  getBooksGoingToReadState,
} from "../../redux/books/booksSelectors";
import BookInfoList from "../BookInfoList/BookInfoList";
import {
  getEndDate,
  getStartDate,
  getTrainingBooks,
} from "../../redux/training/trainingSelectors";
import { addPlaningTraning } from "../../redux/training/trainingOperations";
import { Formik } from "formik";
import { getTheme } from "../../redux/theme/themeSelector";

const MyTrainingPlaining = () => {
  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
  const [endDateOrigin, setEndDateOrigin] = useState(new Date());
  const [valueIdBook, setValueIdBook] = useState("");
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);

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

  const handleChangeValue = (e) => {
    setValueIdBook(e.target.value);
  };

  const handleSubmitBookForRead = (e) => {
    e.preventDefault();
    dispatch(addBookForTraining({ valueIdBook }));
  };

  const handleSubmitBookForTraining = (e) => {
    e.preventDefault();
    console.log(books);
    dispatch(addPlaningTraning({ startDate, endDate, books }));
  };

  console.log(booksLibrary[0].title);
  console.log(valueIdBook);
  const theme = useSelector(getTheme);
  return (
    <form onSubmit={handleSubmitBookForRead}>
      <h2 style={{
      color: theme === "light" ? "var(--title-text-color)" : "white",
    }}>Моє тренування</h2>
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
      <select value={valueIdBook} onChange={handleChangeValue}>
        {booksLibrary.map((book) => (
          <option key={book._id} value={book._id}>
            {book.title}
          </option>
        ))}
      </select>
      <input type="submit" value="Додати" />
      {/* <button type="button" onClick={()=>insertBookForRead()}>Додати</button> */}
      {Boolean(books.length) && (
        <BookInfoList booksLibrary={books} colorIcon="grey" review={0} />
      )}
      {Boolean(books.length) && (
        <button type="submit" onClick={handleSubmitBookForTraining}>
          Почати тренування
        </button>
      )}
    </form>
  );
};

export default MyTrainingPlaining;
