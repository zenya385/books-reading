import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./TimerLogicOfGoals.module.scss";
import { getEndDate } from "../../../redux/training/trainingSelectors";
import { getTheme } from "../../../redux/theme/themeSelector";
import { getLang } from "../../../redux/lang/langSelector";
import { langOptionsTimerLogicOfGoals } from "../../../assets/langOptionsTimerLogicOfGoals";

const TimerLogicOfGoals = () => {
  const lang = useSelector(getLang);
  const { titleL, dayL, hourL, minL, secL } = langOptionsTimerLogicOfGoals;
  const endDate = useSelector(getEndDate);
  const oneDay = 86400000;
  const goal = new Date(endDate).getTime();
  const theme = useSelector(getTheme);
  const [, setDateTime] = useState(new Date());
  const diff = goal + oneDay - new Date().getTime();

  const days = () => {
    if (Math.floor(diff / (1000 * 60 * 60 * 24)) > 99) {
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    return "0" + Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const hours = () => {
    if (Math.floor((diff / (1000 * 60 * 60)) % 24) > 9) {
      return Math.floor((diff / (1000 * 60 * 60)) % 24);
    }
    return "0" + Math.floor((diff / (1000 * 60 * 60)) % 24);
  };
  const minutes = () => {
    if (Math.floor((diff / 1000 / 60) % 60) > 9) {
      return Math.floor((diff / 1000 / 60) % 60);
    }
    return "0" + Math.floor((diff / 1000 / 60) % 60);
  };

  const seconds = () => {
    if (Math.floor((diff / 1000) % 60) > 9) {
      return Math.floor((diff / 1000) % 60);
    }
    return "0" + Math.floor((diff / 1000) % 60);
  };

  const time = {
    days: days(),
    hours: hours(),
    minutes: minutes(),
    seconds: seconds(),
  };

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className={s.box}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
      }}
    >
      <p className={s.boxText}>{titleL[lang]}</p>

      <div className={s.dateGroup}>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`${time.days || "00"}`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`:`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`${time.hours || "00"}`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`:`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`${time.minutes || "00"}`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`:`}</div>
        <div
          className={s.date}
          style={{
            color: theme === "light" ? "#091e3f" : "var(--dark-text)",
          }}
        >{`${time.seconds || "00"}`}</div>{" "}
      </div>
      <span className={s.days}>{dayL[lang]}</span>
      <span className={s.hours}>{hourL[lang]}</span>
      <span className={s.minutes}>{minL[lang]}</span>
      <span className={s.seconds}>{secL[lang]}</span>
    </div>
  );
};

export default TimerLogicOfGoals;
