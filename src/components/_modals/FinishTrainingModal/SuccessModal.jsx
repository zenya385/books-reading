import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icons from "../../images/symbol-defs.svg";
import s from "./FinishTrainingModal.module.scss";
import { useSelector } from "react-redux";
import { getTheme } from "../../redux/theme/themeSelector";

export default function SuccessModal() {
  const [open, setOpen] = React.useState(true);
  const theme = useSelector(getTheme);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modalSuccess} onClick={handleClose} style={{ backgroundColor:
                 theme === "light" ? "white" : "var(--modal-dark)",}}
        >
          <svg className={s.modalSuccess_icon} width="54px" height="54px">
            <use xlinkHref={`${Icons}#icon-like`} />
          </svg>
          <p className={s.modalSuccess_description}>
            Ти молодчина, так тримати!
          </p>
          <button onClick={handleClose} className={s.modalSuccess_okBtn}>
            Ок
          </button>
        </Box>
      </Modal>
    </div>
  );
}
