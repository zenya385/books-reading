import React from "react";
import BookInfoItem from "../BookInfoItem/BookInfoItem";



const BookInfoList = ({booksLibrary}) => {
  return (
    <ul>
      {booksLibrary.map((book) => (
        <BookInfoItem
          key={book._id}
          title={book.title}
          author={book.author}
          publishYear={book.publishYear}
          totalPages={book.totalPages}
        />
      ))}
    </ul>
  );
};

export default BookInfoList;


