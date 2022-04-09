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

export default function ReviewModal({ bookId, modalOpen, onModalClose }) {
  const [open, setOpen] = React.useState(false);

  const [review, setReview] = React.useState("");
  const [rating, setRaiting] = React.useState(null);
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const { text, resume, btnBack, btnSave } = langOptionsReviewModal;

  React.useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  // const handleOpen = () => setOpen(modalOpen);
  const handleClose = () => {
    setOpen(false);
    rating && onModalClose(rating);
  };

  const onRatihgChange = (e) => {
    const currentRating = e.target.value;
    setRaiting(currentRating);
  };

  const onReviewChange = (e) => {
    const currentReview = e.target.value;
    setReview(currentReview);
  };

  const handleSave = (e) => {
    // console.log({ review, rating }, bookId);
    dispatch(reviewBook({ form: { review, rating }, bookId }));
    handleReset();
    rating && onModalClose(rating);
  };
  const handleReset = () => {
    setOpen(false);
    setReview("");
    setRaiting(null);
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
          <Rating
            name="half-rating"
            size="small"
            precision={0.5}
            onClick={onRatihgChange}
          />
          <Typography className={s.textAreaDescr}>
            <label className={s.textAreaTitle}>{resume[lang]}</label>
            <textarea
              className={s.textArea}
              name="review"
              value={review}
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

//  const [modalOpen, setModalOpen] = useState(false);
//  const [bookId, setBookId] = useState(null);
//  const [retingValue, setRetingValue] = useState(null);

//  const onModalOpen = () => {
//    setModalOpen(true);
//    setBookId(12334);
//  };

//  const onModalClose = (value) => {
//    setModalOpen(false);
//    setBookId(null);
//    value && setRetingValue(value);
//  };

//  <div>
//    <Rating
//      name="half-rating"
//      size="small"
//      value={+retingValue}
//      precision={0.5}
//    />
//    <button onClick={onModalOpen}>Резюме</button>
//    {modalOpen && (
//      <ReviewModal
//        bookId={bookId}
//        modalOpen={modalOpen}
//        onModalClose={onModalClose}
//      />
//    )}
//  </div>;
