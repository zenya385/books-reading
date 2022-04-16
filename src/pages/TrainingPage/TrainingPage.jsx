import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";
import { getBooks } from "../../redux/books/booksOperations";
import MyPurposeToRead from "../../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../../components/MyTrainingPlaining/MyTrainingPlaining";
import {
  getIsTrain,
  getTrainingBooks,
} from "../../redux/training/trainingSelectors";
import StatisticsResults from "../../components/_statistics/StatisticsResults/StatisticsResults";
import Timer from "../../components/Timer/Timer";
import { getBooksGoingToReadState } from "../../redux/books/booksSelectors";
import { getPlaningTraining } from "../../redux/training/trainingOperations";
import {
  changeDateEnd,
  changeDateStart,
  resetTrain,
} from "../../redux/training/trainingSlice";
import MediaQuery from "react-responsive";
import FailModal from "../../components/_modals/FinishTrainingModal/FailModal";
import { formatISO } from "date-fns";
import Container from "../../components/_shared/Container/Container";
import Notification from "../../components/_shared/Notification";
import toast from "react-hot-toast";

const getIsTrainingFinished = (trainingBooks) => {
  if (!trainingBooks.length) return false;
  const { pagesTotal, pagesFinished } = trainingBooks[trainingBooks.length - 1];
  return pagesTotal === pagesFinished;
};

const TrainingPage = () => {
  const dispatch = useDispatch();
  const trainingBooks = useSelector(getTrainingBooks);
  const booksLibrary = useSelector(getBooksGoingToReadState);
  const loggedIn = useSelector(getIsLoggedIn);
  const isTrain = useSelector(getIsTrain);

  const [curReadBooks, setCurReadBooks] = useState([]);
  const [valueIdBook, setValueIdBook] = useState("default");
  const [bookForTraining, setBookForTraining] = useState(booksLibrary);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpenModal && getIsTrainingFinished(trainingBooks)) {
      toggleModal();
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
    }
  }, [isOpenModal]);

  useEffect(() => {
    isTrain && setCurReadBooks([]);
  }, [isTrain]);

  const handleChangeValue = (e) => {
    setValueIdBook(e.target.value);
  };

  const handleSubmitBookForRead = (e) => {
    e.preventDefault();

    setCurReadBooks((prev) => {
      // console.log("prev setCurReadBooks :>> ", prev);
      return [...prev, booksLibrary.find((book) => book._id === valueIdBook)];
    });
    setBookForTraining((prev) => {
      // console.log("prev setBookForTraining :>> ", prev);
      return prev.filter((book) => book._id !== valueIdBook);
    });
    setValueIdBook("default");
    toast.success("book adds to list");
  };
  const handleDeleteBook = (e) => {
    let idBook = e.currentTarget.value;
    setValueIdBook(e.currentTarget);
    setCurReadBooks((prev) => {
      return prev.filter((book) => book._id !== idBook);
    });
    setBookForTraining((prev) => {
      return [...prev, booksLibrary.find((book) => book._id === idBook)];
    });
    setValueIdBook("default");
    toast.error("book deletes from list");
  };

  return (
    <Container>
      <Notification />
      <MediaQuery maxWidth={1279}>
        <div className={s.TrainingPage}>
          {isTrain && <Timer />}

          <MyPurposeToRead
            books={isTrain ? trainingBooks : curReadBooks}
            isTrain={isTrain}
          />

          <MyTrainingPlaining
            curReadBooks={curReadBooks}
            handleSubmitBookForRead={handleSubmitBookForRead}
            bookForTraining={bookForTraining}
            handleDeleteBook={handleDeleteBook}
            handleChangeValue={handleChangeValue}
          />

          {isTrain && <StatisticsResults />}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1280}>
        <div className={s.TrainingPage}>
          <div className={s.timerTrainingLine}>
            {isTrain && <Timer />}
            <MyTrainingPlaining
              curReadBooks={curReadBooks}
              handleSubmitBookForRead={handleSubmitBookForRead}
              bookForTraining={bookForTraining}
              handleDeleteBook={handleDeleteBook}
              handleChangeValue={handleChangeValue}
            />
          </div>
          <div className={s.statisticMeta}>
            {isTrain && (
              <MyPurposeToRead books={trainingBooks} isTrain={isTrain} />
            )}
            {!isTrain && (
              <MyPurposeToRead books={curReadBooks} isTrain={isTrain} />
            )}
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
