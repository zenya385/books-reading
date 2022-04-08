import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icons from "../../images/symbol-defs.svg";
import s from "./FinishTrainingModal.module.scss";

export default function FailModal() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.failModal} onClick={handleClose}>
          <svg className={s.failModal_icon} width="54px" height="54px">
            <use xlinkHref={`${Icons}#icon-like`} />
          </svg>
          <p className={s.failModal_description}>
            Ти молодчина, але потрібно швидше! Наступного разу тобі все
            вдасться)
          </p>
          <button onClick={handleClose} className={s.failModal_btn}>
            Ок
          </button>
        </Box>
      </Modal>
    </div>
  );
}
