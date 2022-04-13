import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { getBooks } from "../redux/books/booksOperations";
import MyPurposeToRead from "../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../components/MyTrainingPlaining/MyTrainingPlaining";
import {
  getDurationPeriod,
  getIsTrain,
  getTrainingBooks,
} from "../redux/training/trainingSelectors";
import StatisticsResults from "../components/AllStatistics/StatisticsResults/StatisticsResults";
import Timer from "../components/Timer/Timer";
import { getBooksCurrentlyReadingState } from "../redux/books/booksSelectors";
import { getPlaningTraining } from "../redux/training/trainingOperations";
import {
  changeDateEnd,
  changeDateStart,
  resetTrain,
} from "../redux/training/trainingSlice";
import MediaQuery from "react-responsive";
import ReadListWithCheckBox from "../components/ReadListWithCheckBox/ReadListWithCheckBox";
import FailModal from "../components/FinishTrainingModal/FailModal";
import { useHistory } from "react-router-dom";
import { formatISO } from "date-fns";
import Container from "../components/Share/Container";
import Notification from "../components/Share/Notification";

const getIsTrainingFinished = (trainingBooks) => {
  if (!trainingBooks.length) return false;
  const { pagesTotal, pagesFinished } = trainingBooks[trainingBooks.length - 1];
  return pagesTotal === pagesFinished;
};

const TrainingPage = () => {
  const dispatch = useDispatch();
  const trainingBooks = useSelector(getTrainingBooks);
  // const trainingBooks = useSelector(getBooksCurrentlyReadingState);
  // const infoTraining = useSelector((state) => state.training);
  const loggedIn = useSelector(getIsLoggedIn);
  const isTrain = useSelector(getIsTrain);
  const history = useHistory();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  useEffect(() => {
    // dispatch(getBooks());
    if (!isOpenModal && getIsTrainingFinished(trainingBooks)) {
      toggleModal();
      // dispatch(resetTrain());
    }
  }, [trainingBooks]);

  useEffect(() => {
    isTrain && dispatch(getPlaningTraining());
  }, [isTrain]);

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  useEffect(() => {
    if (!isOpenModal && getIsTrainingFinished(trainingBooks)) {
      dispatch(resetTrain());
      dispatch(
        changeDateStart(formatISO(new Date(), { representation: "date" }))
      );
      dispatch(
        changeDateEnd(formatISO(new Date(), { representation: "date" }))
      );
      // history.push("/library");
      // history.push("/training");
    }
  }, [isOpenModal]);

  return (
    <Container>
      <Notification />
      <MediaQuery maxWidth={1279}>
        <div className={s.TrainingPage}>
          {isTrain && <Timer />}

          <MyPurposeToRead books={trainingBooks} isTrain={isTrain} />

          <MyTrainingPlaining />

          {isTrain && <StatisticsResults />}
          {/* лист с чекбоксом после прописания логики можно удалить */}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1280}>
        <div className={s.TrainingPage}>
          <div className={s.timerTrainingLine}>
            {isTrain && <Timer />}
            <MyTrainingPlaining />

            {/* лист с чекбоксом после прописания логики можно удалить */}
          </div>
          <div className={s.statisticMeta}>
            <MyPurposeToRead books={trainingBooks} isTrain={isTrain} />
            {isTrain && <StatisticsResults />}
          </div>
        </div>
      </MediaQuery>
      {isOpenModal && (
        <FailModal isOpenModal={isOpenModal} handleClose={toggleModal} />
      )}
    </Container>
  );
};

export default TrainingPage;
