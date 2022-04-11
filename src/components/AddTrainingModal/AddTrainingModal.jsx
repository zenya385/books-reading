import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AppBar from "../navigation/AppBar";
import { BiArrowBack } from "react-icons/bi";
import MyTrainingPlainModal from "../MyTrainingPlainModal/MyTrainingPlainModal";

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
              //   className={s.closeBtn}
              style={{
                marginTop: "40px",
                marginLeft: "25px",
                color: " #FF6B08",
                width: "24px",
                height: "24px",
              }}
            />
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
