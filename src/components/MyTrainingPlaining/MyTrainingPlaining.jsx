import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
import {
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";
import { 
  getBooksGoingToReadState,
} from "../../redux/books/booksSelectors";
import {
  getDurationPeriod,
  getEndDate,
  getIsTrain,
  getStartDate,
  getTrainingBooks,
} from "../../redux/training/trainingSelectors";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyTrainPlan } from "../../assets/langOptionsMyTrainPlan";
import { addPlaningTraining } from "../../redux/training/trainingOperations";
import { getTheme } from "../../redux/theme/themeSelector";
import PurposeToReadList from "../PurposeToReadList/PurposeToReadList";
import ReadListWithCheckBox from "../ReadListWithCheckBox/ReadListWithCheckBox";
import MediaQuery from "react-responsive";
import AddTrainingModal from "../AddTrainingModal/AddTrainingModal";
import { BsPlusLg } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartLine from "../ChartLine/ChartLine";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const curDate = new Date();
const today= [
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate(),
];
const nextDay = [
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate() + 1,
];
const MyTrainingPlaining = ({ onHandleClose }) => {
  const duration=useSelector(getDurationPeriod)
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const lang = useSelector(getLang);
  const isTrain = useSelector(getIsTrain);
  const { training, startTraining, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date(...today));
  const [endDateOrigin, setEndDateOrigin] = useState(new Date(...nextDay));
  const [curReadBooks, setCurReadBooks] = useState([]);
  const [bookForTraining, setBookForTraining] = useState(booksLibrary);
  const [valueIdBook, setValueIdBook] = useState("default");
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  useEffect(() => {
    isTrain && setCurReadBooks([]);
  }, [isTrain]);

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
    setValueIdBook(e.target.value);
  };
  

  const handleSubmitBookForRead = (e) => {
    e.preventDefault();

    setCurReadBooks((prev) => {
      console.log("prev setCurReadBooks :>> ", prev);
      return [...prev, booksLibrary.find((book) => book._id === valueIdBook)];
    });
    setBookForTraining((prev) => {
      console.log("prev setBookForTraining :>> ", prev);
      return prev.filter((book) => book._id !== valueIdBook);
    });
    setValueIdBook("default");
  };

  const handleSubmitBookForTraining = (e) => {
    e.preventDefault();
    // console.log(books);
    // onHandleClose();
    dispatch(
      addPlaningTraining({
        startDate,
        endDate,
        books: curReadBooks.map((el) => el._id),
      })
    );
  };

  const handleDeleteBook = (e) => {
    let idBook=e.currentTarget.value    
    setValueIdBook(e.currentTarget);
    setCurReadBooks((prev) => {      
      return prev.filter((book) => book._id !== idBook);
    });
    setBookForTraining((prev) => {
      
      // console.log('booksLibrary.find)', booksLibrary.find((book) => book._id === idBook))
      return [
        ...prev,
        booksLibrary.find((book) => book._id === idBook),
      ];
    });
    setValueIdBook("default");
    // console.log('e.currentTarget', e.currentTarget.value)
  };


const theme = useSelector(getTheme);
  // console.log("bookForTraining>>>", bookForTraining);
  // console.log("curReadBooks>>>", curReadBooks);
  // console.log("books>>>", books);
  // console.log("valueIdBook>>>", valueIdBook);
  const isCurReadBooks = Boolean(curReadBooks.length);
  const isBookForTraining = Boolean(bookForTraining.length);
  console.log('startDateOrigin', startDateOrigin)
  console.log('startDate', startDate)
  console.log('endDateOrigin', endDateOrigin)
  console.log('endDate', endDate)
  duration>=0&&console.log('Duration', duration)  
  return (

    <>
      <MediaQuery minWidth={768}>

        {/* {!isTrain && ( */}
        <form
          className={isTrain ? s.visuallyHidden : s.form}
          onSubmit={handleSubmitBookForRead}
        >
          <h2 className={s.title} style={{
      color: theme === "light" ? "white" : "white",
    }}>{training[lang]}</h2>
          <div className={s.datePicker}>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={startDateOrigin}
              disabled
              onChange={(date) => setStartDateOrigin(date)}
              className={s.datePickerInput}
            />
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={endDateOrigin}
              onChange={(date) => {console.log('date', date)
                return setEndDateOrigin(date)}}
              className={s.datePickerInput}
            />
          </div>
          <select
            disabled={bookForTraining.length && !isTrain ? false : true}
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
          <button
            className={s.submitBtn}
            disabled={!isTrain ? false : true}
            type="submit"
          >
            {btn[lang]}
          </button>
        </form>
        {/* )} */}
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <AddTrainingModal
          modalOpen={modalOpen}
          modalClose={onModalClose}
          cbAddBtn={handleSubmitBookForRead}
          bookForTraining={bookForTraining}
          handleChangeValue={handleChangeValue}
        />
        <button onClick={onModalOpen} className={s.modalOpenBtn}>
          <BsPlusLg style={{ width: "18px", height: "18px" }} />
        </button>
      </MediaQuery>
      {isCurReadBooks && !isTrain && (
        <PurposeToReadList
          booksLibrary={curReadBooks}
          colorIcon="grey"
          review={0}
          handleDeleteBook={handleDeleteBook}
        />
      )}
      {isTrain && (
        <ReadListWithCheckBox
          booksLibrary={books}
          colorIcon="grey"
          review={0}
        />
      )}
      {isCurReadBooks && !isTrain && (
        <button
          type="submit"
          className={s.startTrainingBtn}
          onClick={handleSubmitBookForTraining}
        >
          {startTraining[lang]}
        </button>
      )}
      <ChartLine curReadBooks={!isTrain ? curReadBooks : books} />
    </>
  );
};

export default MyTrainingPlaining;
