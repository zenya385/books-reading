import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import s from "./TimerLogicOfGoals.module.scss";
import { getEndDate } from "../../../redux/training/trainingSelectors";

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

  return (
    <div className={s.box}>
      <p className={s.boxText}>До досягнення мети залишилось</p>

      <div className={s.dateGroup}>
        <div className={s.date}>{`${time.days || "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={s.date}>{`${time.hours || "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={s.date}>{`${time.minutes || "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={s.date}>{`${time.seconds || "00"}`}</div>{" "}
      </div>
      <span className={s.days}>ДН</span>
      <span className={s.hours}>ГОД</span>
      <span className={s.minutes}>ХВ</span>
      <span className={s.seconds}>СЕК</span>
    </div>
  );
};

export default TimerLogicOfGoals;
