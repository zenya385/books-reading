import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import s from "./ReviewModal.module.scss";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { reviewBook } from "../../redux/books/booksOperations";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsReviewModal } from "../../assets/langOptionsReviewModal";

export default function ReviewModal({
  bookId,
  modalOpen,
  onModalClose,
  bookRating,
  coment,
}) {
  const [open, setOpen] = React.useState(modalOpen);
  // const [review, setReview] = React.useState("");
  const [rating, setRaiting] = React.useState(bookRating);
  const [feedback, setFeedback] = React.useState(coment);
  const lang = useSelector(getLang);
  const { text, resume, btnBack, btnSave } = langOptionsReviewModal;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    onModalClose(false);
  };

  const onRatihgChange = (e) => {
    const currentRating = e.target.value;
    setRaiting(currentRating);
  };

  const onReviewChange = (e) => {
    const currentReview = e.target.value;
    setFeedback(currentReview);
  };

  const handleSave = (e) => {
    // console.log({ form: { feedback, rating }, bookId });
    dispatch(reviewBook({ form: { feedback, rating }, bookId }));
    handleReset();
    onModalClose(false);
  };

  const handleReset = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className={s.rating}>{text[lang]}</p>
          </Typography>
          <Rating name="half-rating" precision={0.5} onClick={onRatihgChange} />
          <Typography className={s.textAreaDescr}>
            <label className={s.textAreaTitle}>{resume[lang]}</label>
            <textarea
              className={s.textArea}
              name="review"
              value={feedback}
              onChange={onReviewChange}
            ></textarea>
          </Typography>
          <Typography className={s.btnWrepper}>
            <button onClick={handleClose} className={s.backBtn}>
              {btnBack[lang]}
            </button>
            <button onClick={handleSave} className={s.saveBtn}>
              {btnSave[lang]}
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
