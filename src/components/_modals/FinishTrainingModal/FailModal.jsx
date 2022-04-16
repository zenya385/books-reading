import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icons from "../../../images/symbol-defs.svg";
import s from "./FinishTrainingModal.module.scss";
import { useSelector } from "react-redux";
import { getLang } from "../../../redux/lang/langSelector";
import { langOptionsFailModal } from "../../../assets/langOptionsFailModal";
import { getTheme } from "../../../redux/theme/themeSelector";
import { getTraining } from "../../../redux/training/trainingSelectors";

const today = [
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
];

// const endOfBook = ({ training }) => {
//   const deltaDates = training.endDate >= today;
//   console.log("deltaDates", deltaDates);
//   return deltaDates;
// };

export default function FailModal({ isOpenModal, handleClose }) {
  // const training = useSelector(getTraining);
  const lang = useSelector(getLang);
  const { textOk, btn } = langOptionsFailModal;
  const theme = useSelector(getTheme);

  // useEffect(() => {
  //   endOfBook(training);
  // }, [training]);

  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={s.failModal}
          style={{
            backgroundColor: theme === "light" ? "white" : "var(--modal-dark)",
          }}
        >
          <svg className={s.failModal_icon} width="54px" height="54px">
            <use xlinkHref={`${Icons}#icon-like`} />
          </svg>
          <p className={s.failModal_description}>{textOk[lang]}</p>
          <button onClick={handleClose} className={s.failModal_btn}>
            {btn[lang]}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
