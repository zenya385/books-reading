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
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyTrainPlan } from "../../assets/langOptionsMyTrainPlan";
import { addPlaningTraining } from "../../redux/training/trainingOperations";
import PurposeToReadList from "../PurposeToRead/PurposeToRead";

const MyTrainingPlaining = () => {
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const lang = useSelector(getLang);
  const { training, startTraining, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
  const [endDateOrigin, setEndDateOrigin] = useState(new Date());
  const [curReadBooks, setCurReadBooks] = useState([]);
  const [bookForTraining, setBookForTraining] = useState(booksLibrary);
  const [valueIdBook, setValueIdBook] = useState("default");

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
    setCurReadBooks((prev) => {
      console.log('prev setCurReadBooks :>> ', prev);
      return [
      ...prev,
      booksLibrary.find((book) => book._id === valueIdBook),
    ]});
    setBookForTraining((prev) => {
      console.log('prev setBookForTraining :>> ', prev);
      return prev.filter((book) => book._id !== valueIdBook);
    });
    setValueIdBook("default");
  };

  const handleSubmitBookForTraining = (e) => {
    e.preventDefault();
    console.log(books);

    dispatch(
      addPlaningTraining({
        startDate,
        endDate,
        books: curReadBooks.map((el) => el._id),
      })
    );
  };

  // console.log("bookForTraining>>>", bookForTraining);
  // console.log("curReadBooks>>>", curReadBooks);
  // console.log("books>>>", books);
  // console.log("valueIdBook>>>", valueIdBook);

  return (
    <form onSubmit={handleSubmitBookForRead}>
      <h2>{training[lang]}</h2>
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
          <select
            disabled={bookForTraining.length ? false : true}
            onChange={handleChangeValue}
          >
            <option value="default">...</option>
            {bookForTraining.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
          <button type="submit"> {btn[lang]}</button>
        </>
      )}
      {Boolean(curReadBooks.length) && (
        <PurposeToReadList
          booksLibrary={curReadBooks}
          colorIcon="grey"
          review={0}
        />
      )}
      {Boolean(curReadBooks.length) && (
        <button type="submit" onClick={handleSubmitBookForTraining}>
          {startTraining[lang]}
        </button>
      )}
    </form>
  );
};

export default MyTrainingPlaining;
