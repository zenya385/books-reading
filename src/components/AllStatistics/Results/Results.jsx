import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { langOptionsResults } from "../../../assets/langOptionsResults";
import {
  addPages,
  getPlaningTraining,
} from "../../../redux/training/trainingOperations";
import { getLang } from "../../../redux/lang/langSelector";
import s from "./Results.module.scss";
import { useFormik } from "formik";
import { getTrainingBooks } from "../../../redux/training/trainingSelectors";

const getIsValidPages = ({ trainingBooks }) => {
  const deltaPages = trainingBooks
    .map((book) => book.pagesTotal - book.pagesFinished)
    .filter((el) => el !== 0);
  const pagesToRead = deltaPages[0];
  return pagesToRead;
};

const Results = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [pages, setPages] = useState("");
  const lang = useSelector(getLang);
  const trainingBooks = useSelector(getTrainingBooks);
  const dispatch = useDispatch();
  const { date, numPages, addRes } = langOptionsResults;

  const formik = useFormik({
    initialValues: { pages: "" },
    onSubmit: ({ pages }) => {
      const lastsPages = getIsValidPages({ trainingBooks });
      pages = Number(pages);
      if (pages > lastsPages) {
        formik.setErrors({ pages: "Last only  " + lastsPages });
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
  // const onSubmitForm = (e) => {
  //   e.preventDefault();
  //   console.log({ pages: Number(pages) });
  //   dispatch(addPages({ pages: Number(pages) }));
  //   // dispatch(getPlaningTraining());
  // };

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
                console.log(startDate);
              }}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div style={{ position: "relative" }}>
            <p className={s.pages_text}>{numPages[lang]}</p>
            <input
              name="pages"
              type="text"
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
