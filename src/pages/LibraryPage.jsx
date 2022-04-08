import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookForm from "../components/BookForm/BookForm";
import {
  getBooksCurrentlyReadingState,
  getBooksFinishedReadingState,
  getBooksGoingToReadState,
  // getGoingToRead,
} from "../redux/books/booksSelectors";

import BookInfoList from "../components/BookInfoList/BookInfoList";

import { getBooks } from "../redux/books/booksOperations";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { Link } from "react-router-dom";
import { getPlaningTraning } from "../redux/training/trainingOperations";

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
  const dispatch = useDispatch();

  // console.log(Boolean(booksFinishedReading.length));
  // console.log(booksGoingToRead.length);
  // console.log(booksAllLibrary);

  let review = 1;

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    //  setTimeout( (dispatch(getPlaningTraning())),0)
    }, []);

console.log(booksCurrentlyReading);

  return (
    <>
      <BookForm />
      {booksFinishedReading&&Boolean(booksFinishedReading.length) && <h2>Прочитано</h2>}
      {booksFinishedReading&&Boolean(booksFinishedReading.length) && (
        <BookInfoList
          booksLibrary={booksFinishedReading}
          colorIcon="dark-grey"
          review={review}
        />
      )}
      {booksCurrentlyReading&&Boolean(booksCurrentlyReading.length)&& <h2>Читаю</h2>}
      {booksCurrentlyReading&&Boolean(booksCurrentlyReading.length) && (
        <BookInfoList
          booksLibrary={booksCurrentlyReading}
          colorIcon="accent"
          review={0}
        />
      )}
      {booksGoingToRead&&Boolean(booksGoingToRead.length) && <h2>Маю намір прочитати</h2>}
      {booksGoingToRead&&Boolean(booksGoingToRead.length) && (
        <BookInfoList
          booksLibrary={booksGoingToRead}
          colorIcon="grey"
          review={0}
        />
      )}
      {/* <a href="/training">Далі</a> */}
      <Link to="/training">Next</Link>

      {/* {loggedIn && (
        <ul>
          {fullArray.map((el) => (
            <li key={el._id}>{el.title}</li>
          ))}
        </ul>
      )} */}
    </>
  );
};

export default LibraryPage;
