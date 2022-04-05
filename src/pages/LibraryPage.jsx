import React from "react";

import BookInfoList from "../components/BookInfoList/BookInfoList";

const booksLibrary = [
  {
    title: "The Book of Five Rings",
    author: "Miyamoto Musashi",
    publishYear: 1643,
    totalPages: 110,
    pagesFinished: 0,
    _id: "507f1f77bcf86cd799439013",
    __v: 0,
  },
  {
    title: "Scrum. Революционный метод управлениями проектами.",
    author: "Джефф Сазерленд",
    publishYear: 1643,
    totalPages: 25,
    pagesFinished: 0,
    _id: "507f1f77bcf86cd799439012",
    __v: 0,
  },
];

const LibraryPage = () => {
 
  return (
    <>     
         
      <BookInfoList booksLibrary={booksLibrary} />
    </>
  );
};

export default LibraryPage;
