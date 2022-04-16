import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icons from "../../images/symbol-defs.svg";
import s from "./InstructionModal.module.scss";

import { getLang } from "../../redux/lang/langSelector";
import { langOptionsInstrModal } from "../../assets/langOptionsInstrModal";

export default function InstructionModal() {
  const [open, setOpen] = useState(true);
  const lang = useSelector(getLang);
  const {
    step1,
    plan1_1,
    plan1_2,
    step2,
    plan2_1,
    plan2_2,
    btn,
  } = langOptionsInstrModal;

  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modal} onClick={handleClose}>
          <div className={s.firstStepWrapper}>
            <p className={s.firstStepTitle}>{step1[lang]}</p>
            <svg className={s.firstStepIcon} width="22px" height="17px">
              <use xlinkHref={`${Icons}#icon-flat-grey`} />
            </svg>
            <p className={s.firstStep}>{plan1_1[lang]}</p>
            <svg className={s.firstStepIconDescr} width="10px" height="12px">
              <use xlinkHref={`${Icons}#icon-Vector`} />
            </svg>
            <p className={s.firstStepDescr}>{plan1_2[lang]}</p>
          </div>
          <div className={s.stepWrapper}>
            <p className={s.secondStepTitle}>{step2[lang]}</p>
            <svg className={s.secondStepIcon} width="15px" height="17px">
              <use xlinkHref={`${Icons}#icon-flag`} />
            </svg>
            <p className={s.secondStep}>{plan2_1[lang]}</p>
            <svg className={s.secondStepIconDescr} width="10px" height="12px">
              <use xlinkHref={`${Icons}#icon-Vector`} />
            </svg>
            <p className={s.secondStepDescr}>{plan2_2[lang]}</p>
          </div>

          <button onClick={handleClose} className={s.okBtn}>
            {btn[lang]}
          </button>
        </Box>
      </Modal>
    </>
  );
}
