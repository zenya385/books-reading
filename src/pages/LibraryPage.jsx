import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookForm from "../components/BookForm/BookForm";
import {
  getBooksCurrentlyReadingState,
  getBooksFinishedReadingState,
  getBooksGoingToReadState,
  getBooksState,
  // getBooksState,
  getIsLoading,
} from "../redux/books/booksSelectors";
import BookInfoList from "../components/BookInfoList/BookInfoList";
import { getBooks } from "../redux/books/booksOperations";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import InstructionModal from "../components/InstructionModal/InstructionModal";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { getPlaningTraning } from "../redux/training/trainingOperations";
import { BsPlusLg } from "react-icons/bs";
import s from "./LibraryPage.module.scss";
import AddBookModal from "../components/AddBookModal/AddBookModal";
import { langOptionsLibPage } from "../assets/langOptionsLibPage";
import { getLang } from "../redux/lang/langSelector";
import { getTheme } from "../redux/theme/themeSelector"
import BookReviewItem from "../components/BookReviewItem/BookReviewItem";
import BookReviewList from "../components/BookReviewList/BookReviewList";


// const booksLibrary = [
//   {
//     title: "The Book of Five Rings",
//     author: "Miyamoto Musashi",
//     publishYear: 1643,
//     totalPages: 110,
//     pagesFinished: 0,
//     _id: "507f1f77bcf86cd799439013",
//     __v: 0,
//   },
//   {
//     title: "Scrum. Революционный метод управлениями проектами.",
//     author: "Джефф Сазерленд",
//     publishYear: 1643,
//     totalPages: 25,
//     pagesFinished: 0,
//     _id: "507f1f77bcf86cd799439012",
//     __v: 0,
//   },
// ];

const LibraryPage = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
  // const fullArray = useSelector(getGoingToRead);

  const loggedIn = useSelector(getIsLoggedIn);
  const booksGoingToRead = useSelector(getBooksGoingToReadState);
  const booksFinishedReading = useSelector(getBooksFinishedReadingState);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);
  const booksIsLoading = useSelector(getIsLoading);
  const ratingChange = useSelector(getBooksState);
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const { titleDone, titleNow, titleFuture, btn } = langOptionsLibPage;

  // console.log(Boolean(booksFinishedReading.length));
  // console.log(booksGoingToRead.length);
  // console.log(booksAllLibrary);

  let review = 1;

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
      //  setTimeout( (dispatch(getPlaningTraning())),0)
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
    <>
      <section className={s.section} >
        <MediaQuery maxWidth={767}>
          <AddBookModal modalOpen={modalOpen} modalClose={onModalClose} />
        </MediaQuery>

        <MediaQuery minWidth={768}>
          <BookForm />
        </MediaQuery>


        {/* {booksFinishedReading && Boolean(booksFinishedReading.length) && (
          <h2 style={{
            color: theme === "light" ? "black" : "white",
          }}>Прочитано</h2>
        )} */}

        {booksFinishedReading && Boolean(booksFinishedReading.length) && (
          <BookReviewList
            booksLibrary={booksFinishedReading}
            colorIcon="dark-grey"
            review={review}
          />
          // <BookInfoList
          //   booksLibrary={booksFinishedReading}
          //   colorIcon="dark-grey"
          //   review={review}
          // />
        )}
        {booksCurrentlyReading && Boolean(booksCurrentlyReading.length) && (
          <h2 style={{
            color: theme === "light" ? "black" : "white",
          }}>{titleNow[lang]}</h2>

        )}
        {booksCurrentlyReading && Boolean(booksCurrentlyReading.length) && (
          <BookInfoList
            booksLibrary={booksCurrentlyReading}
            colorIcon="accent"
            review={0}
          />
        )}

        {booksGoingToRead && Boolean(booksGoingToRead.length) && (
          <h2 style={{
            color: theme === "light" ? "black" : "white",
          }}> {titleFuture[lang]}</h2>

        )}
        {booksGoingToRead && Boolean(booksGoingToRead.length) && (
          <BookInfoList
            booksLibrary={booksGoingToRead}
            colorIcon="grey"
            review={0}
          />
        )}

        {!booksIsLoading &&
          booksGoingToRead.length &&
          booksCurrentlyReading.length &&
          booksFinishedReading.length && <InstructionModal />}

        {/* {!booksIsLoading && booksGoingToRead.length === 0 && <SuccessModal />} */}
        {/* {!booksIsLoading && booksGoingToRead.length === 0 && <FailModal />} */}
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

        {/* {loggedIn && (
        <ul>
          {fullArray.map((el) => (
            <li key={el._id}>{el.title}</li>
          ))}
        </ul>
      )} */}
      </section>
    </>
  );
};

export default LibraryPage;
