import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Icons from "../../images/symbol-defs.svg";
import s from "./InstructionModal.module.scss";

export default function InstructionModal({ colorIcon }) {
  const [open, setOpen] = React.useState(true);

  // const handleOpen = () => setOpen(true);
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
          <Typography>
            <div className={s.firstStepWrapper}>
              <p className={s.title}>Крок 1.</p>
              <svg className={s.firstStepIcon} width="22px" height="17px">
                <use xlinkHref={`${Icons}#icon-flat-grey`} />
              </svg>
              <p className={s.firstStep}>Створіть особисту бібліотеку</p>
              <svg className={s.firstStepIconDescr} width="10px" height="12px">
                <use xlinkHref={`${Icons}#icon-vector`} />
              </svg>
              <p className={s.firstStepDescr}>
                Додайте до неї книжки, які маєте намір прочитати.
              </p>
            </div>
          </Typography>
          <Typography>
            <div className={s.stepWrapper}>
              <p className={s.title}>Крок 2.</p>
              <svg className={s.secondStepIcon} width="15px" height="17px">
                <use xlinkHref={`${Icons}#icon-flag`} />
              </svg>
              <p className={s.secondStep}>Сформуйте своє перше тренування</p>
              <svg className={s.secondStepIconDescr} width="10px" height="12px">
                <use xlinkHref={`${Icons}#icon-flat`} />
              </svg>
              <p className={s.secondStepDescr}>
                Визначте ціль, оберіть період, розпочинайте тренування.
              </p>
            </div>
          </Typography>
          <Typography className={s.btnWrepper}>
            <button onClick={handleClose} className={s.okBtn}>
              Ок
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
