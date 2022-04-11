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
  getIsTrain,
  getStartDate,
  getTrainingBooks,
} from "../../redux/training/trainingSelectors";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyTrainPlan } from "../../assets/langOptionsMyTrainPlan";
import { addPlaningTraining } from "../../redux/training/trainingOperations";
import { Formik } from "formik";
import PurposeToReadList from "../PurposeToReadList/PurposeToReadList";
import ReadListWithCheckBox from "../ReadListWithCheckBox/ReadListWithCheckBox";
import MediaQuery from "react-responsive";
import MyTrainingPlainModal from "../MyTrainingPlainModal/MyTrainingPlainModal";
import AddTrainingModal from "../AddTrainingModal/AddTrainingModal";
import { BsPlusLg } from "react-icons/bs";
import { Line } from "react-chartjs-2";
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

export const options = {
  backgroundColor: "#FF6B08",
  cubicInterpolationMode: "monotone",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      display: true,
      labels: {
        color: "rgb(255, 99, 132)",
      },
    },
    title: {
      display: false,
      text: "Кількість сторінок за день",
    },
  },
};

let labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const data = {
  labels,
  datasets: [
    {
      label: "plan",
      data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    {
      label: "fact",
      data: [0, 10, 12, 13, 15, 18, 10, 12, 15, 10, 12],

      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#FF6B08",
      backgroundColor: "#FF6B08",
    },
  ],
};
const curDate = new Date();
const nextDay = [
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate() + 1,
];
const MyTrainingPlaining = ({ onHandleClose }) => {
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const lang = useSelector(getLang);
  const isTrain = useSelector(getIsTrain);
  const { training, startTraining, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date());
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
    // console.log(e.target.value);
    setValueIdBook(e.target.value);
  };
  // const handleSubmitBookForReadModal = (e) => {
  //   e.preventDefault();
  //   setValueIdBook(books[0]);
  //   setCurReadBooks((prev) => {
  //     console.log("prev setCurReadBooks :>> ", prev);
  //     return [...prev, booksLibrary.find((book) => book._id === valueIdBook)];
  //   });
  //   setBookForTraining((prev) => {
  //     console.log("prev setBookForTraining :>> ", prev);
  //     return prev.filter((book) => book._id !== valueIdBook);
  //   });
  //   setValueIdBook("default");
  // };

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
    console.log(books);
    // onHandleClose();
    dispatch(
      addPlaningTraining({
        startDate,
        endDate,
        books: curReadBooks.map((el) => el._id),
      })
    );
  };

  console.log("bookForTraining>>>", bookForTraining);
  console.log("curReadBooks>>>", curReadBooks);
  // console.log("books>>>", books);
  // console.log("valueIdBook>>>", valueIdBook);
  const isCurReadBooks = Boolean(curReadBooks.length);
  const isBookForTraining = Boolean(bookForTraining.length);
  return (
    <>
      <MediaQuery minWidth={768}>
        {/* {!isTrain && ( */}
        <form
          className={isTrain ? s.visuallyHidden : s.form}
          onSubmit={handleSubmitBookForRead}
        >
          <h2 className={s.title}>{training[lang]}</h2>
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
              onChange={(date) => setEndDateOrigin(date)}
              className={s.datePickerInput}
            />
          </div>
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
          <button className={s.submitBtn} type="submit">
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
      {isCurReadBooks && (
        <PurposeToReadList
          booksLibrary={curReadBooks}
          colorIcon="grey"
          review={0}
        />
      )}

      {isCurReadBooks && (
        <button
          type="submit"
          className={s.startTrainingBtn}
          onClick={handleSubmitBookForTraining}
        >
          {startTraining[lang]}
        </button>
      )}
      <ChartLine curReadBooks={curReadBooks} />
    </>
  );
};

export default MyTrainingPlaining;
