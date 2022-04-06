import React from "react";
import BookInfoItem from "../BookInfoItem/BookInfoItem";
import s from './BookInfoList.module.scss'



const BookInfoList = ({booksLibrary, colorIcon}) => {
  return (
    <ul>
      <div className={s.bookInfo}>
      <p className="author-book">Назва книги</p>
      <p className="author-book">Автор</p>
      <p className="publishYear-book">Рік</p>
      <p className="pagesTotal-book">Стор</p>
      </div>
      {booksLibrary.map((book) => (
        <BookInfoItem
          key={book._id}
          title={book.title}
          author={book.author}
          publishYear={book.publishYear}
          pagesTotal={book.pagesTotal}
          colorIcon={colorIcon}
        />
      ))}
    </ul>
  );
};

export default BookInfoList;


