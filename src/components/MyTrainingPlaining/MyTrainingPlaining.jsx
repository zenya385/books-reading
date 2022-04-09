import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
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
import { addPlaningTraning } from "../../redux/training/trainingOperations";
import { Formik } from "formik";

const MyTrainingPlaining = () => {
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);

  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
  const [endDateOrigin, setEndDateOrigin] = useState(new Date());
  const [curReadBooks, setCurReadBooks] = useState([]);
  const [bookForTraining, setBookForTraining] = useState(booksLibrary);
  const [valueIdBook, setValueIdBook] = useState(bookForTraining[0]._id);

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
    // console.log(e.target.value);
    setValueIdBook(e.target.value);
  };

  const handleSubmitBookForRead = (e) => {
    e.preventDefault();

    !curReadBooks.filter((book) => book._id === valueIdBook).length &&
      setCurReadBooks((prev) => [
        ...prev,
        ...booksLibrary.filter((book) => book._id === valueIdBook),
      ]);

    setBookForTraining((prev) =>
      prev.filter((book) => book._id !== valueIdBook)
    );

    setValueIdBook(bookForTraining[0]._id);

    !books.filter((id) => id === valueIdBook).length &&
      dispatch(addBookForTraining({ valueIdBook }));
  };

  const handleSubmitBookForTraining = (e) => {
    e.preventDefault();
    console.log(books);
    dispatch(addPlaningTraning({ startDate, endDate, books }));
  };

  console.log("bookForTraining>>>", bookForTraining);
  console.log("curReadBooks>>>", curReadBooks);
  console.log("books>>>", books);
  console.log("valueIdBook>>>", valueIdBook);

  return (
    <form onSubmit={handleSubmitBookForRead}>
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
      {Boolean(bookForTraining.length) && (
        <>
          <select onChange={handleChangeValue}>
            {bookForTraining.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
          <input type="submit" value="Додати" />
        </>
      )}
      {Boolean(curReadBooks.length) && (
        <BookInfoList booksLibrary={curReadBooks} colorIcon="grey" review={0} />
      )}
      {Boolean(curReadBooks.length) && (
        <button type="submit" onClick={handleSubmitBookForTraining}>
          Почати тренування
        </button>
      )}
    </form>
  );
};

export default MyTrainingPlaining;
