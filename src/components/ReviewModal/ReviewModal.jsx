import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import s from "./ReviewModal.module.scss";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { reviewBook } from "../../redux/books/booksOperations";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsReviewModal } from "../../assets/langOptionsReviewModal";
import { useFormik } from "formik";
import { getBooksFinishedReadingState } from "../../redux/books/booksSelectors";

export default function ReviewModal({
  bookId,
  isModalOpen,
  onModalClose,
  bookRating,
  coment,
}) {
  const [rating, setRaiting] = React.useState(bookRating);
  const [feedback, setFeedback] = React.useState(coment);
  const booksFinished = useSelector(getBooksFinishedReadingState);
  const lang = useSelector(getLang);
  const { text, resume, btnBack, btnSave } = langOptionsReviewModal;
  const dispatch = useDispatch();
  const isBookUpdateRef = useRef(false);

  useEffect(() => {
    isBookUpdateRef.current && onModalClose();
  }, [booksFinished]);

  const formik = useFormik({
    initialValues: { "half-rating": bookRating, review: coment },
    onSubmit: (values) => {
      if (!values["half-rating"] || !values.review) {
        !values["half-rating"] &&
          formik.setErrors({ "half-rating": "Fill the gap" });
        !values.review && formik.setErrors({ review: "Fill the gap" });
        return;
      }
      dispatch(
        reviewBook({
          form: { feedback: values.review, rating: values["half-rating"] },
          bookId,
        })
      );
      isBookUpdateRef.current = true;
    },
  });

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className={s.rating}>{text[lang]}</p>
          </Typography>
          <Rating
            name="half-rating"
            value={formik.values["half-rating"]}
            precision={0.5}
            onClick={formik.handleChange}
          />
          <Typography className={s.textAreaDescr}>
            <label className={s.textAreaTitle}>{resume[lang]}</label>
            <textarea
              className={s.textArea}
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
            ></textarea>
            {formik.errors.review && (
              <div className={s.errorMessageReview}>{formik.errors.review}</div>
            )}
            {formik.errors["half-rating"] && (
              <div className={s.errorMessage}>
                {formik.errors["half-rating"]}
              </div>
            )}
          </Typography>
          <Typography className={s.btnWrepper}>
            <button onClick={onModalClose} className={s.backBtn}>
              {btnBack[lang]}
            </button>

            <button onClick={formik.handleSubmit} className={s.saveBtn}>
              {btnSave[lang]}
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
