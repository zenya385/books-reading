import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import s from "./TimerLogicOfGoals.module.scss";
import {
  getDurationPeriod,
  getEndDate,
  getStartDate,
} from "../../../redux/training/trainingSelectors";
import { getDuration } from "../../../redux/training/trainingSlice";

const TimerLogicOfGoals = () => {
  // const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate); // вставить trainingSelectors (Время отсчета),
  // const duration = useSelector(getDurationPeriod);
  console.log(endDate);
  const oneDay = 86400000;
  const goal = new Date(endDate).getTime(); // вставить endDate
  console.log(goal);
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
      <div className={s.dateGroup}>
        <div className={classnames(s.date, s.days)}>{`${time.days ||
          "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={classnames(s.date, s.hours)}>{`${time.hours ||
          "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={classnames(s.date, s.minutes)}>{`${time.minutes ||
          "00"}`}</div>
        <div className={s.date}>{`:`}</div>
        <div className={classnames(s.date, s.seconds)}>{`${time.seconds ||
          "00"}`}</div>
      </div>
    </div>
  );
};

export default TimerLogicOfGoals;
