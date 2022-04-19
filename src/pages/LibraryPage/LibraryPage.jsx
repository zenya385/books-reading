import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookForm from "../../components/BookForm/BookForm";
import {
  getBooksCurrentlyReadingState,
  getBooksFinishedReadingState,
  getBooksGoingToReadState,
  getBooksState,
  getIsLoading,
} from "../../redux/books/booksSelectors";
import BookInfoList from "../../components/BookInfoList/BookInfoList";
import { getBooks } from "../../redux/books/booksOperations";
import { getIsLoggedIn } from "../../redux/auth/authSelectors";
import InstructionModal from "../../components/InstructionModal/InstructionModal";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import s from "./LibraryPage.module.scss";
import AddBookModal from "../../components/_modals/AddBookModal/AddBookModal";
import { langOptionsLibPage } from "../../assets/langOptionsLibPage";
import { getLang } from "../../redux/lang/langSelector";
import { getTheme } from "../../redux/theme/themeSelector";
import BookReviewList from "../../components/BookReviewList/BookReviewList";
import Container from "../../components/_shared/Container/Container";
import Notification from "../../components/_shared/Notification";

const LibraryPage = () => {
  const loggedIn = useSelector(getIsLoggedIn);
  const booksGoingToRead = useSelector(getBooksGoingToReadState);
  const booksFinishedReading = useSelector(getBooksFinishedReadingState);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);
  const booksIsLoading = useSelector(getIsLoading);
  const ratingChange = useSelector(getBooksState);
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const { titleNow, titleFuture, btn } = langOptionsLibPage;

  let review = 1;

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, [ratingChange.feedback, ratingChange.rating]);

  // console.log(booksCurrentlyReading);
  const [modalOpen, setModalOpen] = React.useState(false);
  // console.log(modalOpen);
  const onModalOpen = () => {
    setModalOpen(true);
  };

  const onModalClose = (e) => {
    setModalOpen(false);
  };
  const theme = useSelector(getTheme);
  return (
    <Container>
      <Notification />
      <section className={s.section}>
        <MediaQuery maxWidth={767}>
          <AddBookModal modalOpen={modalOpen} modalClose={onModalClose} />
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <BookForm />
        </MediaQuery>

        {booksFinishedReading && Boolean(booksFinishedReading.length) && (
          <BookReviewList
            booksLibrary={booksFinishedReading}
            colorIcon="dark-grey"
            review={review}
          />
        )}
        {booksCurrentlyReading && Boolean(booksCurrentlyReading.length) && (
          <h2
            style={{
              color: theme === "light" ? "black" : "white",
            }}
          >
            {titleNow[lang]}
          </h2>
        )}
        {booksCurrentlyReading && Boolean(booksCurrentlyReading.length) && (
          <BookInfoList
            booksLibrary={booksCurrentlyReading}
            colorIcon="accent"
            review={0}
          />
        )}
        {booksGoingToRead && Boolean(booksGoingToRead.length) && (
          <h2
            className={s.title}
            style={{
              color: theme === "light" ? "black" : "white",
            }}
          >
            {titleFuture[lang]}
          </h2>
        )}
        {booksGoingToRead && Boolean(booksGoingToRead.length) && (
          <BookInfoList
            booksLibrary={booksGoingToRead}
            colorIcon="grey"
            review={0}
          />
        )}
        {!booksIsLoading &&
          booksGoingToRead.length < 1 &&
          booksCurrentlyReading.length < 1 &&
          booksFinishedReading.length < 1 && <InstructionModal />}

        <div className={s.nextBtnWrapper}>
          <Link to="/training" className={s.nextBtn}>
            {btn[lang]}
          </Link>
        </div>

        <MediaQuery maxWidth={767}>
          <button onClick={onModalOpen} className={s.modalOpenBtn}>
            <BsPlusLg style={{ width: "18px", height: "18px" }} />
          </button>
        </MediaQuery>
      </section>
    </Container>
  );
};

export default LibraryPage;
