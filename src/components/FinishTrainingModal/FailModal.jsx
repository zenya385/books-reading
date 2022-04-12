import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icons from "../../images/symbol-defs.svg";
import s from "./FinishTrainingModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsFailModal } from "../../assets/langOptionsFailModal";
import { resetTrain } from "../../redux/training/trainingSlice";
import { getTheme } from "../../redux/theme/themeSelector";

export default function FailModal({ isOpenModal, handleClose }) {
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(true);
  const lang = useSelector(getLang);
  const { text, btn } = langOptionsFailModal;
  const theme = useSelector(getTheme);
  // const handleClose = () => setOpen(false);

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
          // onClick={handleClose}
          style={{ backgroundColor:
                 theme === "light" ? "white" : "var(--modal-dark)",}}
        >
          <svg className={s.failModal_icon} width="54px" height="54px">
            <use xlinkHref={`${Icons}#icon-like`} />
          </svg>
          <p className={s.failModal_description}>{text[lang]}</p>
          <button onClick={handleClose} className={s.failModal_btn}>
            {btn[lang]}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
