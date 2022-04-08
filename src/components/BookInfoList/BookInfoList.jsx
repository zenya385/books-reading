import React, { useEffect } from "react";
import BookInfoItem from "../BookInfoItem/BookInfoItem";
import BookReviewItem from "../BookReviewItem/BookReviewItem";
import s from "./BookInfoList.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getBooks } from "../../redux/books/booksOperations";
import { useDispatch } from "react-redux";

const BookInfoList = ({ booksLibrary, colorIcon, review }) => {
  const dispatch = useDispatch();
  console.log(review);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <>
      <ul className={s.bookList}>
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>Назва книги</p>

            <p className={s.author}>Автор</p>
            <p className={s.year}>Рік</p>
            <p className={s.page}>Стор.</p>
          </div>
        </MediaQuery>
        {/* {booksLibrary.map((book) => (
          <BookInfoItem
            key={book._id}
            title={book.title}
            author={book.author}
            publishYear={book.publishYear}
            pagesTotal={book.pagesTotal}
            colorIcon={colorIcon}
            review={review}
            bookId={book._id}
            rating={book.rating}
            feedback={book.feedback}
          />
        ))} */}

        {Boolean(review)
          ? booksLibrary.map((book) => (
              <BookReviewItem
                key={book._id}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                pagesTotal={book.pagesTotal}
                colorIcon={colorIcon}
                review={review}
                bookId={book._id}
                rating={book.rating}
                feedback={book.feedback}
              />
            ))
          : booksLibrary.map((book) => (
              <BookInfoItem
                key={book._id}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                pagesTotal={book.pagesTotal}
                colorIcon={colorIcon}
                review={review}
                bookId={book._id}
                rating={book.rating}
                feedback={book.feedback}
              />
            ))}
      </ul>
    </>
  );
};

export default BookInfoList;
