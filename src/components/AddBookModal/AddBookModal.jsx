import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AppBar from "../navigation/AppBar";
import BookForm from "../BookForm/BookForm";
import { BiArrowBack } from "react-icons/bi";
import s from "./AddBookModal.module.scss";
export default function InstructionModal({ modalOpen, modalClose }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    modalClose(false);
  };

  //   open && setOpen(true);
  React.useEffect(() => {
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
            backgroundColor: "#ffffff",
            height: "100%",
          }}
        >
          <AppBar />
          <button onClick={handleClose}>
            <BiArrowBack
              className={s.closeBtn}
              style={{
                marginTop: "40px",
                marginLeft: "25px",
                color: " #FF6B08",
                width: "24px",
                height: "24px",
              }}
            />
          </button>
          <BookForm onHandleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
