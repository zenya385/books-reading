import React, { useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { getBooks } from "../redux/books/booksOperations";
import MyPurposeToRead from "../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../components/MyTrainingPlaining/MyTrainingPlaining";
import {
  getDurationPeriod,
  getError,
  getIsTrain,
  getTrainingBooks,
} from "../redux/training/trainingSelectors";
import StatisticsResults from "../components/AllStatistics/StatisticsResults/StatisticsResults";
import Timer from "../components/Timer/Timer";
import { getBooksCurrentlyReadingState } from "../redux/books/booksSelectors";
import { duration } from "@mui/material";
import { getPlaningTraining } from "../redux/training/trainingOperations";
import BookInfoList from "../components/BookInfoList/BookInfoList";
import { useHistory } from "react-router-dom";
import { resetTrain } from "../redux/training/trainingSlice";
import ChartLine, { data, options } from "../components/ChartLine/ChartLine";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const TrainingPage = () => {
  const trainingBooks = useSelector(getTrainingBooks);
  const infoTraining = useSelector((state) => state.training);
  const loggedIn = useSelector(getIsLoggedIn);
  const books = useSelector(getTrainingBooks);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);
  // const error=useSelector(getError);
  const isTrain = useSelector(getIsTrain);
  const duration = useSelector(getDurationPeriod);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UseEffect")
    dispatch(getBooks())
    if (!trainingBooks.length) return;
    const { pagesTotal, pagesFinished } = trainingBooks[
      trainingBooks.length - 1
    ];
    if (pagesTotal-pagesFinished  <= 0) {
      dispatch(resetTrain());
    }
  }, [trainingBooks]);
 

  useEffect(() => {
    isTrain && dispatch(getPlaningTraining());
  }, [isTrain]);

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  return (
    <div className={s.TrainingPage}>
      {isTrain && <Timer />}
      <MyTrainingPlaining />
      {isTrain && (
        <BookInfoList
          booksLibrary={infoTraining.books}
          colorIcon="grey"
          review={0}
        />
      )}
      <MyPurposeToRead books={books} isTrain={isTrain} />  
      {isTrain && <StatisticsResults />}
    </div>
  );
};

export default TrainingPage;
