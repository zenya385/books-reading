import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsSummary } from "../../assets/langOptionsSummary";
// import s from "./ReviewModal.module.scss";
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
        <div className={s.wrapper}>
          <div className={s.ratingWrepper}>
            <p className={s.ratingText}>{ratingI[lang]} : </p>
            <Rating
              name="half-rating-read"
              size="small"
              value={rating ? rating : 0}
              precision={0.5}
              // style={
              //   theme === "light"
              //     ? { troke: "none", strokeWidth: 0 }
              //     : { stroke: "#faaf00", strokeWidth: "0.4" }
              // }
              readOnly
            />
          </div>
        </div>
      </MediaQuery>

      <div className={s.reviewBtnWrepper}>
        <button onClick={toggleModal} className={s.reviewBtn}>
          {resume[lang]}
        </button>
      </div>

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
