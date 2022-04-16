import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { langOptionsResults } from "../../../assets/langOptionsResults";
import { addPages } from "../../../redux/training/trainingOperations";
import { getLang } from "../../../redux/lang/langSelector";
import { getTrainingBooks } from "../../../redux/training/trainingSelectors";
import { getBooksCurrentlyReadingState } from "../../../redux/books/booksSelectors";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import s from "./Results.module.scss";

const getIsValidPages = ({ trainingBooks }) => {
  const deltaPages = trainingBooks
    .map((book) => book.pagesTotal - book.pagesFinished)
    .filter((el) => el !== 0);
  const pagesToRead = deltaPages[0];
  return pagesToRead;
};

const getFinishedBook = ({ curReadBooks }) => {
  const deltaPages = curReadBooks.filter(
    (book) => book.pagesTotal - book.pagesFinished === 0
  );
  const finishedBook = deltaPages[deltaPages.length - 1];
  return finishedBook;
};
const getNextdBookAfterFinishedBook = ({ curReadBooks }) => {
  const deltaPages = curReadBooks.filter(
    (book) => book.pagesTotal - book.pagesFinished !== 0
  );
  const notFinishedBook = deltaPages[0];
  return notFinishedBook;
};

const Results = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const trainingBooks = useSelector(getTrainingBooks);
  const curReadBooks = useSelector(getBooksCurrentlyReadingState);
  const lang = useSelector(getLang);
  const { date, numPages, addRes } = langOptionsResults;

  const formik = useFormik({
    initialValues: { pages: "" },
    onSubmit: ({ pages }) => {
      const lastsPages = getIsValidPages({ trainingBooks });
      pages = Number(pages);
      if (pages > lastsPages) {
        formik.setErrors({ pages: "Lasts only  " + lastsPages });
        return;
      }
      dispatch(
        addPages({
          pages: Number(pages),
        })
      );
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [trainingBooks]);

  useEffect(() => {
    const finishedBookYet = getFinishedBook({ curReadBooks });
    const notFinishedBookYet = getNextdBookAfterFinishedBook({ curReadBooks });
    if (
      finishedBookYet &&
      notFinishedBookYet &&
      notFinishedBookYet.pagesFinished === 0
    ) {
      toast.success(`${finishedBookYet.title} has already finished`);
    }
  }, [curReadBooks]);

  return (
    <>
      <form className={s.form_res} action="" onSubmit={formik.handleSubmit}>
        <div className={s.inputs_div}>
          <div>
            <p className={s.data_text}>{date[lang]}</p>
            <DatePicker
              className={s.input_date}
              selected={startDate}
              disabled
              onChange={(date) => {
                setStartDate(date);
              }}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div className={s.relat}>
            <p className={s.pages_text}>{numPages[lang]}</p>
            <input
              name="pages"
              type="text"
              autoComplete="off"
              className={s.input_pages}
              value={formik.values.pages}
              onChange={formik.handleChange}
            />
            {formik.errors.pages && (
              <div className={s.errorMessage}>{formik.errors.pages}</div>
            )}
          </div>
        </div>
        <button className={s.add_res_btn} type="submit">
          {addRes[lang]}
        </button>
      </form>
    </>
  );
};

export default Results;
