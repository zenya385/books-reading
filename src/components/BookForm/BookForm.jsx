import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { langOptionsBookForm } from "../../assets/langOptionsBookForm";
import { addBook } from "../../redux/books/booksOperations";
import { getLang } from "../../redux/lang/langSelector";
import { addBookValidationSchema } from "../../validation/BookFormValid";
import s from "../BookForm/BookForm.module.scss";

export default function BookForm({ onHandleClose }) {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const {
    title,
    author,
    publishYear,
    pagesTotal,
    pageAdd,
  } = langOptionsBookForm;

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          author: "",
          publishYear: "",
          pagesTotal: "",
        }}
        validationSchema={addBookValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("values", values);
          dispatch(addBook(values));
          resetForm();
          console.log("values", values);
          onHandleClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.form__container}>
              <label className={s.form__label}>
                {title[lang]}
                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className={s.title}
                />
                <ErrorMessage
                  component="div"
                  name="title"
                  className={s.errorMessage}
                />
              </label>
              <label className={s.form__label}>
                {author[lang]}
                <input
                  type="text"
                  name="author"
                  autoComplete="off"
                  value={values.author}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className={s.author}
                />
                <ErrorMessage
                  component="div"
                  name="author"
                  className={s.errorMessage}
                />
              </label>
              <label className={s.form__label}>
                {publishYear[lang]}
                <input
                  type="number"
                  name="publishYear"
                  autoComplete="off"
                  value={values.publishYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className={s.yearPages}
                />
                <ErrorMessage
                  component="div"
                  name="publishYear"
                  className={s.errorMessage}
                />
              </label>
              <label className={s.form__label}>
                {pagesTotal[lang]}
                <input
                  type="number"
                  name="pagesTotal"
                  autoComplete="off"
                  value={values.pagesTotal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className={s.yearPages}
                />
                <ErrorMessage
                  component="div"
                  name="pagesTotal"
                  className={s.errorMessage}
                />
              </label>
            </div>

            <button type="submit" className={s.form__btn}>
              {pageAdd[lang]}
            </button>
          </form>
        )}
      </Formik>
    </>

    // <form onSubmit={handleSubmit} className={s.form}>
    //   <div className={s.form__container}>
    //     <label className={s.form__label}>
    //       Назва книги
    //       <input
    //         type="text"
    //         name="title"
    //         autoComplete="off"
    //         value={title}
    //         onChange={handleChange}
    //         placeholder="..."
    //         className={s.title}
    //       />
    //     </label>
    //     <label className={s.form__label}>
    //       Автор книги
    //       <input
    //         type="text"
    //         name="author"
    //         autoComplete="off"
    //         value={author}
    //         onChange={handleChange}
    //         placeholder="..."
    //         className={s.author}
    //       />
    //     </label>
    //     <label className={s.form__label}>
    //       Рік випуску
    //       <input
    //         type="number"
    //         name="publishYear"
    //         autoComplete="off"
    //         value={publishYear}
    //         onChange={handleChange}
    //         placeholder="..."
    //         className={s.yearPages}
    //       />
    //     </label>
    //     <label className={s.form__label}>
    //       Кількість сторінок
    //       <input
    //         type="number"
    //         name="pagesTotal"
    //         autoComplete="off"
    //         value={pagesTotal}
    //         onChange={handleChange}
    //         placeholder="..."
    //         className={s.yearPages}
    //       />
    //     </label>
    //   </div>

    //   <button type="submit" className={s.form__btn}>
    //     Додати
    //   </button>
    // </form>
  );
}
