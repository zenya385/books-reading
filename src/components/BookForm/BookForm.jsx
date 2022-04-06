import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "../../redux/books/booksOperations";
export default function BookForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pagesTotal, setPagesTotal] = useState("");
  // const checkRepeatTitle = name => {
  //   return bookTitle.find(
  //     title => title.name.toLowerCase() === name.toLowerCase(),
  //   );
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;

      case "author":
        setAuthor(value);
        break;
      case "publishYear":
        setPublishYear(value);
        break;
      case "pagesTotal":
        setPagesTotal(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      title,
      author,
      publishYear,
      pagesTotal,
    };
    dispatch(
      addBook({
        title,
        author,
        publishYear,
        pagesTotal,
      })
    );
    reset();
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
    setPublishYear("");
    setPagesTotal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Назва книги
        <input
          type="text"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleChange}
          placeholder="..."
        />
      </label>
      <label>
        Автор книги
        <input
          type="text"
          name="author"
          autoComplete="off"
          value={author}
          onChange={handleChange}
          placeholder="..."
        />
      </label>
      <label>
        Рік випуску
        <input
          type="number"
          name="publishYear"
          autoComplete="off"
          value={publishYear}
          onChange={handleChange}
          placeholder="..."
        />
      </label>
      <label>
        Кількість сторінок
        <input
          type="number"
          name="pagesTotal"
          autoComplete="off"
          value={pagesTotal}
          onChange={handleChange}
          placeholder="..."
        />
      </label>

      <button type="submit">Додати</button>
    </form>
  );
}
