import React, { useEffect } from "react";
import BookInfoItem from "../BookInfoItem/BookInfoItem";
import BookReviewItem from "../BookReviewItem/BookReviewItem";
import s from "./BookInfoList.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { langOptionsBookInfoList } from "../../assets/langOptionsBookInfoList";
import { getLang } from "../../redux/lang/langSelector";

const BookInfoList = ({ booksLibrary, colorIcon, review }) => {
  // console.log(booksLibrary);
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { title, author, publishYear, pagesTotal } = langOptionsBookInfoList;

  return (
    <>
      <ul
        className={s.bookList}
        style={{
          backgroundColor:
            theme === "light" ? "var(--light-theme)" : "var(--dark-theme)",
        }}
      >
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>{title[lang]}</p>

            <p className={s.author}>{author[lang]}</p>
            <p className={s.year}>{publishYear[lang]}</p>
            <p className={s.page}>{pagesTotal[lang]}</p>
          </div>
        </MediaQuery>
        {booksLibrary.map((book) => (
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
    </>
  );
};

export default BookInfoList;
