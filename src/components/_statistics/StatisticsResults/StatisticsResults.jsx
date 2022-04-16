import React, { useState } from "react";
import { useSelector } from "react-redux";
import { langOptionsStatisticsRes } from "../../../assets/langOptionsStatisticsRes";
import { getLang } from "../../../redux/lang/langSelector";
import Results from "../Results/Results";
import Statistics from "../Statistics/Statistics";
import { getTheme } from "../../../redux/theme/themeSelector";
import s from "./StatisticsResults.module.scss";

const StatisticsResults = () => {
  const [arr, setArr] = useState([]);
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { results, stats } = langOptionsStatisticsRes;

  return (
    <div
      className={s.div_all}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
      }}
    >
      <h3
        className={s.result_text}
        style={{
          color: theme === "light" ? "#242A37" : "var(--dark-text)",
        }}
      >
        {results[lang]}
      </h3>
      <Results arr={arr} setArr={setArr} />
      <div className={s.stat_block}>
        <div className={s.stat_block_before}></div>
        <h3
          className={s.stat_text}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {stats[lang]}
        </h3>
        <div className={s.stat_block_after}></div>
      </div>
      <div className={s.scroll_block}>
        <ul className={s.stat_list}>
          <Statistics />
        </ul>
      </div>
    </div>
  );
};

export default StatisticsResults;
