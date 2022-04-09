import React from "react";
import s from "./Timer.module.scss";

import TimerLogicOfGoals from "./TimerLogicOfGoals/TimerLogicOfGoals";
import TimerLogicOfYear from "./TimerLogicOfYear/TimerLogicOfYear";

const Timer = () => {
  return (
    <div className={s.wrapper}>
      <TimerLogicOfYear />
      <TimerLogicOfGoals />
    </div>
  );
};
export default Timer;
