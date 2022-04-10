import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import s from "./TimerLogicOfGoals.module.scss";
import { getEndDate } from "../../../redux/training/trainingSelectors";
import { getTheme } from "../../../redux/theme/themeSelector";


const TimerLogicOfGoals = () => {
  const endDate = useSelector(getEndDate);
  const oneDay = 86400000;
  const goal = new Date(endDate).getTime();

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

  const theme = useSelector(getTheme);
  console.log(time);
  return (
    <div className={s.box} style={{
      backgroundColor:
        theme === "light" ? "white" : "var(--dark-header)",  
    }}>
      <div className={s.dateGroup}>
        <div className={classnames(s.date, s.days)} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`${time.days ||
          "00"}`}</div>
        <div className={s.date} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`:`}</div>
        <div className={classnames(s.date, s.hours)} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`${time.hours ||
          "00"}`}</div>
        <div className={s.date} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`:`}</div>
        <div className={classnames(s.date, s.minutes)} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`${time.minutes ||
          "00"}`}</div>
        <div className={s.date} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`:`}</div>
        <div className={classnames(s.date, s.seconds)} style={{
      color:
        theme === "light" ? "#091e3f" : "var(--dark-text)",  
    }}>{`${time.seconds ||
          "00"}`}</div>
      </div>
    </div>
  );
};

export default TimerLogicOfGoals;
