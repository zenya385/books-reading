import React, { useEffect } from "react";

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
import MediaQuery from "react-responsive";
import ReadListWithCheckBox from "../components/ReadListWithCheckBox/ReadListWithCheckBox";
import AddTrainingModal from "../components/AddTrainingModal/AddTrainingModal";

const TrainingPage = () => {
  const trainingBooks = useSelector(getTrainingBooks);
  const infoTraining = useSelector((state) => state.training);
  // const error=useSelector(getError);
  const isTrain = useSelector(getIsTrain);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UseEffect");
    dispatch(getBooks());
    if (!trainingBooks.length) return;
    const { pagesTotal, pagesFinished } = trainingBooks[
      trainingBooks.length - 1
    ];
    if (pagesTotal - pagesFinished <= 0) {
      dispatch(resetTrain());
    }
  }, [trainingBooks]);

  // .map((book) => book.pagesTotal - book.pagesFinished)
  // .reduce((num, sum) => (sum += num), 0);

  // {
  //   Boolean(trainingBooks.length) && pages === 0 && dispatch(resetTrain());
  // }

  useEffect(() => {
    isTrain && dispatch(getPlaningTraining());
  }, [isTrain]);

  const duration = useSelector(getDurationPeriod);
  // for (let i = 0; i < duration; i += 1) {
  //   labels[i] = i;
  // }
  // console.log(labels);

  const loggedIn = useSelector(getIsLoggedIn);
  const books = useSelector(getTrainingBooks);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);

  // console.log(
  //   "Boolean(booksCurrentlyReading.length)>>>>",
  //   Boolean(booksCurrentlyReading.length),
  //   booksCurrentlyReading
  // );
  // console.log(
  //   "Boolean(trainingBooks.length)>>>>",
  //   Boolean(trainingBooks.length),
  //   trainingBooks
  // );

  //const isTrain=Boolean(booksCurrentlyReading.length)//&&Boolean(trainingBooks.length)

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  return (
    <>
      <MediaQuery maxWidth={1279}>
        <div className={s.TrainingPage}>
          {isTrain && <Timer />}
          <MyPurposeToRead books={books} isTrain={isTrain} />
          {!isTrain && <MyTrainingPlaining />}
          {isTrain && (
            <ReadListWithCheckBox
              booksLibrary={infoTraining.books}
              colorIcon="grey"
              review={0}
            />
          )}
          {/* лист с чекбоксом после прописания логики можно удалить */}

          {isTrain && <StatisticsResults />}
        </div>
      </MediaQuery>

      <MediaQuery minWidth={1280}>
        <div className={s.TrainingPage}>
          <div className={s.timerTrainingLine}>
            {isTrain && <Timer />}
            {!isTrain && <MyTrainingPlaining />}
            {isTrain && (
              <ReadListWithCheckBox
                booksLibrary={infoTraining.books}
                colorIcon="grey"
                review={0}
              />
            )}
            {/* лист с чекбоксом после прописания логики можно удалить */}
          </div>
          <div className={s.statisticMeta}>
            <MyPurposeToRead books={books} isTrain={isTrain} />
            {isTrain && <StatisticsResults />}
          </div>
        </div>
      </MediaQuery>
    </>
  );
};

export default TrainingPage;
