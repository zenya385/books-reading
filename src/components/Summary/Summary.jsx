import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsSummary } from "../../assets/langOptionsSummary";
import s from "./Summary.module.scss";
import MediaQuery from "react-responsive";
import { getTheme } from "../../redux/theme/themeSelector";

const Summary = ({ bookId, rating, feedback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lang = useSelector(getLang);
  const { resume, ratingI } = langOptionsSummary;
  const theme = useSelector(getTheme);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <MediaQuery maxWidth={767}>
        <div className={s.ratingWrepper}>
          <p className={s.ratingText}>{ratingI[lang]} : </p>
          <Rating
            name="half-rating-read"
            size="small"
            value={rating ? rating : 0}
            precision={0.5}
            readOnly
          />
        </div>
      </MediaQuery>
      <button onClick={toggleModal} className={s.reviewBtn}>
        {resume[lang]}
      </button>
      {isModalOpen && (
        <ReviewModal
          bookRating={rating}
          bookId={bookId}
          isModalOpen={isModalOpen}
          onModalClose={toggleModal}
          coment={feedback}
        />
      )}
    </>
  );
};

export default Summary;
