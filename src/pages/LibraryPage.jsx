import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookForm from "../components/BookForm/BookForm";
import {getGoingToRead, getBooksState} from '../redux/books/booksSelectors';

import BookInfoList from "../components/BookInfoList/BookInfoList";
import { getBooks } from "../redux/books/booksOperations";

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

const LibraryPage = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
  const fullArray = useSelector(getGoingToRead);
  console.log(fullArray);
  
  // const books = useSelector(getBooksState)
  // console.log(books)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks())
  }, [])
  return (
    <>
      
      {/* <BookInfoList booksLibrary={booksLibrary} /> */}
      <BookForm />
      {fullArray.lenght > 0 &&
        (<ul>
        
        {fullArray.map(el =>(<li key={el.newBook.title}>
              {el.newBook.title}
            </li>))
          }
        </ul>)}

    </>
  );

};

export default LibraryPage;
