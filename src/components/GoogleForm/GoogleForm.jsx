import React from "react";
import s from './GoogleForm.module.css'

const GoogleForm = () => {

  return (
    <>
      <div id="name" className={s.label}></div>
      <div id="gSignInWrapper" className={s.label}>
        <div id="customBtn" className={s.customBtn}>
          <span className={s.icon}></span>
          <span className={s.buttonText}>Google</span>
        </div>
      </div>
    </>
  );
};

export default GoogleForm;