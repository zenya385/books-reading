import { color } from "@mui/system";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import s from "./ScrollButton.module.scss";
const ScrollButton = () => {
  return (
    <button className={s.scrollBtn}>
      <BsPlusLg
        style={{
          color: " #FFFFFF",
          width: "18px",
          height: "18px",
        }}
      />
    </button>
  );
};

export default ScrollButton;
