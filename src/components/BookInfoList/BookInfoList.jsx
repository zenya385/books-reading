import React from "react";
import BookInfoItem from "../BookInfoItem/BookInfoItem";
import s from "./BookInfoList.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";

const BookInfoList = ({ booksLibrary, colorIcon, review }) => {
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
        {booksLibrary.map((book) => (
          <BookInfoItem
            key={book._id}
            title={book.title}
            author={book.author}
            publishYear={book.publishYear}
            pagesTotal={book.pagesTotal}
            colorIcon={colorIcon}
            review={review}
          />
        ))}
      </ul>
    </>

  );
};

export default BookInfoList;
