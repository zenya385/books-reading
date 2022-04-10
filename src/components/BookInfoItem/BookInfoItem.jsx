import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookInfoItem.module.scss";
import MediaQuery from "react-responsive";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import Summary from "../Summary/Summary";

const BookInfoItem = ({
  title,
  author,
  publishYear,
  pagesTotal,
  colorIcon,
  review,
  bookId,
  rating,
  feedback,
}) => {
  const theme = useSelector(getTheme);
  return (
    <div
      
    >
      <li className={s.item} style={{
          backgroundColor:
            theme === "light" ? "white" : "var(--dark-header)"
        }}>
        <div className={s.iconTitle}>
          <svg className={s.navIcon} width="22px" height="17px">
            <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
          </svg>

          <a href="" className="link nav__link-contact">
            <p className={s.bookTitle} style={{
        color: theme === "light" ? "#242A37" : "var(--dark-text)",
      }}>{title}</p>
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
          <p className={s.bookMoreInfoAuthor} style={{
        color: theme === "light" ? "#242A37" : "var(--dark-text)",
      }}>{author}</p>
          <p className={s.bookMoreInfoYear} style={{
        color: theme === "light" ? "#242A37" : "var(--dark-text)",
      }}>{publishYear}</p>
          <p className={s.bookMoreInfoPage} style={{
        color: theme === "light" ? "#242A37" : "var(--dark-text)",
      }}>{pagesTotal}</p>
        </div>
        {/* {review&&<zirochki >Резюме</zirochki>} */}

        {/* {Boolean(review) && <button>Резюме</button>} */}

        {/* {Boolean(review) && (
          <Summary bookId={bookId} rating={rating} feedback={feedback} />
        )} */}

        {/* <button>
        <svg className="nav__icon" width="14px" height="18px">
        <use xlinkHref={`${Icons}#icon-delete`} />
      </svg>
      </button> */}
      </li>
      {/* </MediaQuery> */}
    </div>
  );
};

export default BookInfoItem;
