

import React from "react";
import { useSelector } from "react-redux";
import { getStats } from "../../../redux/training/trainingSelectors";
import s from "./Statisctics.module.scss";
import { getTheme } from '../../../redux/theme/themeSelector';


const Statistics = () => {
  const arr = useSelector(getStats);
  console.log(arr);



  const func = (num) => {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

const theme = useSelector(getTheme);
  return (
    <>
      {arr.map((stat, index) => (
        <li key={index} className={s.stat_item}>
          <p className={s.stat_date_text} style={{color:theme === "light" ? "#242A37" : "var(--dark-text)",}}>
            {func(JSON.stringify(new Date(stat.date).getDate()))}.
            {func(JSON.stringify(new Date(stat.date).getMonth() + 1))}.
            {JSON.stringify(new Date(stat.date).getFullYear())}
          </p>
          <p className={s.stat_time_text}>
            {func(JSON.stringify(new Date(stat.date).getHours()))}:
            {func(JSON.stringify(new Date().getMinutes()))}:
            {func(JSON.stringify(new Date().getSeconds()))}
          </p>
          <p className={s.stat_pages_text} style={{color:theme === "light" ? "#242A37" : "var(--dark-text)",}}>
            {stat.pagesCount} <span className="stat_pages_span">стор.</span>{" "}
          </p>
        </li>
      ))}
    </>
  );
};

export default Statistics;
