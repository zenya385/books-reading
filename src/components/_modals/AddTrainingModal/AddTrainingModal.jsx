import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AppBar from "../../_navigation/AppBar";
import { BiArrowBack } from "react-icons/bi";
import MyTrainingPlainModal from "../../MyTrainingPlainModal/MyTrainingPlainModal";
import s from "./AddTrainingModal.module.scss";

export default function AddTrainingModal({
  modalOpen,
  modalClose,
  cbAddBtn,
  bookForTraining,
  handleChangeValue,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    modalClose(false);
  };

  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "#F6F7FB",
            height: "100%",
          }}
        >
          <AppBar />
          <button onClick={handleClose}>
            <BiArrowBack className={s.closeBtn} />
          </button>
          <MyTrainingPlainModal
            onHandleClose={handleClose}
            cbAddBtn={cbAddBtn}
            bookForTraining={bookForTraining}
            handleChangeValue={handleChangeValue}
          />
        </Box>
      </Modal>
    </>
  );
}
