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
import { resetTrain } from "../redux/training/trainingSlice";
import MediaQuery from "react-responsive";
import ReadListWithCheckBox from "../components/ReadListWithCheckBox/ReadListWithCheckBox";
import FailModal from "../components/FinishTrainingModal/FailModal";

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
    }
  }, [isOpenModal]);

  return (
    <>
      <MediaQuery maxWidth={1279}>
        <div className={s.TrainingPage}>
          {isTrain && <Timer />}
          <MyPurposeToRead books={trainingBooks} isTrain={isTrain} />
          <MyTrainingPlaining />
          {isTrain && (
            <ReadListWithCheckBox
              booksLibrary={trainingBooks}
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
            <MyTrainingPlaining />
            {isTrain && (
              <ReadListWithCheckBox
                booksLibrary={trainingBooks}
                colorIcon="grey"
                review={0}
              />
            )}
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
    </>
  );
};

export default TrainingPage;
