import React, { useEffect } from "react";
import BookReviewItem from "../BookReviewItem/BookReviewItem";
import s from "./BookReviewList.module.scss";
import MediaQuery from "react-responsive";
import { getBooks } from "../../redux/books/booksOperations";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../redux/theme/themeSelector";

const BookReviewList = ({ booksLibrary, colorIcon, review }) => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div>
      <div>
        <ul className={s.bookList}>
          <h2 style={{
          color:
            theme === "light" ? "var(--title-text-color)" : "white"
        }}>Прочитано</h2>
          <MediaQuery minWidth={768}>
            <div className={s.bookInfo}>
              <p className={s.title}>Назва книги</p>

              <p className={s.author}>Автор</p>
              <p className={s.year}>Рік</p>
              <p className={s.page}>Стор.</p>
              <p className={s.bookInfoText}>Рейтинг</p>
            </div>
          </MediaQuery>
          {booksLibrary.map((book) => (
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
          ))}

          {/* {Boolean(review)
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
            ))} */}
        </ul>
      </div>
    </div>
  );
};

export default BookReviewList;
