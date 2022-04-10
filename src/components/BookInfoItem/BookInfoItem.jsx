import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookInfoItem.module.scss";
import MediaQuery from "react-responsive";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import Summary from "../Summary/Summary";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsBookInfoItem } from "../../assets/langOptionsBookInfoItem";

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
  const lang = useSelector(getLang);
  const { authorItem, yearItem, pagesItem } = langOptionsBookInfoItem;

  return (
    <div>
      <li className={s.item}>
        <div className={s.iconTitle}>
          <svg className={s.navIcon} width="22px" height="17px">
            <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
          </svg>
          <a href="" className="link nav__link-contact">
            <p className={s.bookTitle}>{title}</p>
          </a>
        </div>
        <div className={s.bookInfoWrapper}>
          <MediaQuery maxWidth={767}>
            <div className={s.bookInfo}>
              <p className={s.bookInfoText}>{authorItem[lang]}</p>
              <p className={s.bookInfoText}>{yearItem[lang]}</p>
              <p className={s.bookInfoText}>{pagesItem[lang]}</p>
            </div>
          </MediaQuery>
          <div className={s.bookMoreInfo}>
            <p className={s.bookMoreInfoAuthor}>{author}</p>
            <p className={s.bookMoreInfoYear}>{publishYear}</p>
            <p className={s.bookMoreInfoPage}>{pagesTotal}</p>
          </div>
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
