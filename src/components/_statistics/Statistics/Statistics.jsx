import React from "react";
import { useSelector } from "react-redux";
import { langOptionsStatistics } from "../../../assets/langOptionsStatistics";
import { getLang } from "../../../redux/lang/langSelector";
import { getStats } from "../../../redux/training/trainingSelectors";
import s from "./Statisctics.module.scss";
import { getTheme } from "../../../redux/theme/themeSelector";

const Statistics = () => {
  const arr = useSelector(getStats);
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { pages } = langOptionsStatistics;

  const func = (num) => {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  return (
    <>
      {arr.map((stat, index) => (
        <li key={index} className={s.stat_item}>
          <p
            className={s.stat_date_text}
            style={{
              color: theme === "light" ? "#242A37" : "var(--dark-text)",
            }}
          >
            {func(JSON.stringify(new Date(stat.time).getDate()))}.
            {func(JSON.stringify(new Date(stat.time).getMonth() + 1))}.
            {JSON.stringify(new Date(stat.time).getFullYear())}
          </p>
          <p className={s.stat_time_text}>
            {func(JSON.stringify(new Date(stat.time).getHours()))}:
            {func(JSON.stringify(new Date(stat.time).getMinutes()))}:
            {func(JSON.stringify(new Date(stat.time).getSeconds()))}
          </p>
          <p
            className={s.stat_pages_text}
            style={{
              color: theme === "light" ? "#242A37" : "var(--dark-text)",
            }}
          >
            {stat.pagesCount}{" "}
            <span
              className="stat_pages_span"
              style={{ color: theme === "light" ? "#898F9F" : "#898F9F" }}
            >
              {pages[lang]}
            </span>
          </p>
        </li>
      ))}
    </>
  );
};

export default Statistics;
