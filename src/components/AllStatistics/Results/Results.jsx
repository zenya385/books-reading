import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { langOptionsResults } from "../../../assets/langOptionsResults";
import { getLang } from "../../../redux/lang/langSelector";
import s from "./Results.module.scss";

const Results = ({ arr, setArr }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [pages, setPages] = useState("");
  const lang = useSelector(getLang);
  const { date, numPages, addRes } = langOptionsResults;

  const onSubmitForm = (e) => {
    e.preventDefault();
    setArr([
      ...arr,
      {
        date: startDate,
        pages: pages,
      },
    ]);
    console.log(arr);
  };
  return (
    <>
      <form className={s.form_res} action="" onSubmit={onSubmitForm}>
        <div className={s.inputs_div}>
          <div>
            <p className={s.data_text}>{date[lang]}</p>
            <DatePicker
              className={s.input_date}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                console.log(startDate);
              }}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div>
            <p className={s.pages_text}>{numPages[lang]}</p>
            <input
              type="text"
              className={s.input_pages}
              value={pages}
              onChange={(e) => {
                console.log(e.target.value);
                setPages(e.target.value);
              }}
            />
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
