
import React , { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from '../../redux/books/booksOperations'
export default function BookForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [totalPages, setTotalPages] = useState("");
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
      case "totalPages":
        setTotalPages(value);
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
      totalPages,
    };
    dispatch(addBook(newObj));
    reset();
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
    setPublishYear("");
    setTotalPages("");
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
          name="totalPages"
          autoComplete="off"
          value={totalPages}
          onChange={handleChange}
          placeholder="..."
        />
      </label>

      <button type="submit">Додати</button>
    </form>
  );
}


