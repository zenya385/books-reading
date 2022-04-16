import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./MyTrainingPlaining.module.scss";
import {
  changeDateEnd,
  changeDateStart,
  getDuration,
} from "../../redux/training/trainingSlice";
import { formatISO, intervalToDuration } from "date-fns";
import {
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
import AddTrainingModal from "../_modals/AddTrainingModal/AddTrainingModal";
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
const today = [curDate.getFullYear(), curDate.getMonth(), curDate.getDate()];
const nextDay = [
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate() + 1,
];

const MyTrainingPlaining = ({
  curReadBooks,
  handleSubmitBookForRead,
  bookForTraining,
  handleDeleteBook,
  handleChangeValue,
}) => {
  const books = useSelector(getTrainingBooks);
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const lang = useSelector(getLang);
  const isTrain = useSelector(getIsTrain);
  const { training, startTraining, btn } = langOptionsMyTrainPlan;

  const [startDateOrigin, setStartDateOrigin] = useState(new Date(...today));
  const [endDateOrigin, setEndDateOrigin] = useState(new Date(...nextDay));
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const onModalClose = (e) => {
    setModalOpen(false);
  };

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

  const handleSubmitBookForTraining = (e) => {
    e.preventDefault();
    // console.log(books);
    dispatch(
      addPlaningTraining({
        startDate,
        endDate,
        books: curReadBooks.map((el) => el._id),
      })
    );
  };

  const theme = useSelector(getTheme);
  const isCurReadBooks = Boolean(curReadBooks.length);
  // const isBookForTraining = Boolean(bookForTraining.length);
  // console.log("startDateOrigin", startDateOrigin);
  // console.log("startDate", startDate);
  // console.log("endDateOrigin", endDateOrigin);
  // console.log("endDate", endDate);
  return (
    <>
      <MediaQuery minWidth={768}>
        <form
          className={isTrain ? s.visuallyHidden : s.form}
          onSubmit={handleSubmitBookForRead}
        >
          <h2
            className={s.title}
            style={{
              color: theme === "light" ? "white" : "white",
            }}
          >
            {training[lang]}
          </h2>
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
              onChange={(date) => {
                return setEndDateOrigin(date);
              }}
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
          books={curReadBooks}
          colorIcon="grey"
          handleDeleteBook={handleDeleteBook}
        />
      )}
      {isTrain && (
        <ReadListWithCheckBox booksLibrary={books} colorIcon="grey" />
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
