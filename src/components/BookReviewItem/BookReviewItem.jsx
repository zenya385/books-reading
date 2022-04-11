import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookReviewItem.module.scss";
import MediaQuery from "react-responsive";
import Summary from "../Summary/Summary";
import { Rating } from "@mui/material";

const BookReviewItem = ({
  title,
  author,
  publishYear,
  pagesTotal,
  colorIcon,
  bookId,
  rating,
  feedback,
}) => {
  return (
    <>
      <div className={s.bookReviewItemWrapper}>
        <li className={s.item}>
          <div className={s.iconTitle}>
            <svg className={s.navIcon} width="22px" height="17px">
              <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
            </svg>
            <a href="" className="link nav__link-contact">
              <p className={s.bookTitle}>{title}</p>
            </a>
          </div>
          <MediaQuery maxWidth={767}>
            <div className={s.bookInfo}>
              <p className={s.bookInfoText}>Автор:</p>
              <p className={s.bookInfoText}>Рік:</p>
              <p className={s.bookInfoText}>Стор:</p>
            </div>
          </MediaQuery>
          <div className={s.bookMoreInfo}>
            <p className={s.bookMoreInfoAuthor}>{author}</p>
            <p className={s.bookMoreInfoYear}>{publishYear}</p>
            <p className={s.bookMoreInfoPage}>{pagesTotal}</p>
          </div>
          <MediaQuery minWidth={1280}>
            {rating ? (
              <Rating
                name="half-rating-read"
                size="large"
                value={rating}
                precision={0.5}
                readOnly
                className={s.ratingStar}
              />
            ) : (
              <Rating
                name="half-rating-read"
                size="large"
                value={0}
                precision={0.5}
                readOnly
                className={s.ratingStar}
              />
            )}
            <Summary bookId={bookId} rating={rating} feedback={feedback} />
          </MediaQuery>
          <MediaQuery minWidth={768} maxWidth={1279}>
            {rating ? (
              <Rating
                name="half-rating-read"
                size="medium"
                sizeMedium
                value={rating}
                precision={0.5}
                readOnly
                className={s.ratingStar}
              />
            ) : (
              <Rating
                name="half-rating-read"
                size="medium"
                sizeMedium
                value={0}
                precision={0.5}
                readOnly
                className={s.ratingStar}
              />
            )}
            <Summary bookId={bookId} rating={rating} feedback={feedback} />
          </MediaQuery>
        </li>
        <MediaQuery maxWidth={767}>
          <Summary bookId={bookId} rating={rating} feedback={feedback} />
        </MediaQuery>
      </div>
    </>
  );
};

export default BookReviewItem;
