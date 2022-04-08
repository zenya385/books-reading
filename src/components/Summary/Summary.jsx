import * as React from "react";
import Rating from "@mui/material/Rating";
import ReviewModal from "../ReviewModal/ReviewModal";
// import s from "./ReviewModal.module.scss";

const Summary = (bookId) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  // const [bookId, setBookId] = React.useState(null);
  const [retingValue, setRetingValue] = React.useState(null);

  const onModalOpen = () => {
    setModalOpen(true);
    // setBookId(12334);
  };

  const onModalClose = (value) => {
    setModalOpen(false);
    // setBookId(null);
    value && setRetingValue(value);
  };
  return (
    <div>
      <Rating
        name="half-rating-read"
        size="small"
        value={+retingValue}
        precision={0.5}
        readOnly
      />
      <button onClick={onModalOpen}>Резюме</button>
      {modalOpen && (
        <ReviewModal
          bookId={bookId}
          modalOpen={modalOpen}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default Summary;
