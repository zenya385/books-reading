import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/books/booksOperations";
import s from "../BookForm/BookForm.module.scss";
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
    dispatch(addBook(newObj));
    reset();
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
    setPublishYear("");
    setPagesTotal("");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.form__container}>
        <label className={s.form__label}>
          Назва книги
          <input
            type="text"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChange}
            placeholder="..."
            className={s.title}
          />
        </label>
        <label className={s.form__label}>
          Автор книги
          <input
            type="text"
            name="author"
            autoComplete="off"
            value={author}
            onChange={handleChange}
            placeholder="..."
            className={s.author}
          />
        </label>
        <label className={s.form__label}>
          Рік випуску
          <input
            type="number"
            name="publishYear"
            autoComplete="off"
            value={publishYear}
            onChange={handleChange}
            placeholder="..."
            className={s.yearPages}
          />
        </label>
        <label className={s.form__label}>
          Кількість сторінок
          <input
            type="number"
            name="pagesTotal"
            autoComplete="off"
            value={pagesTotal}
            onChange={handleChange}
            placeholder="..."
            className={s.yearPages}
          />
        </label>
      </div>

      <button type="submit" className={s.form__btn}>
        Додати
      </button>
    </form>
  );
}
