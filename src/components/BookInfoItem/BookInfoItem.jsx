import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookInfoItem.module.scss";
import MediaQuery from "react-responsive";
const BookInfoItem = ({
  title,
  author,
  publishYear,
  pagesTotal,
  colorIcon,
  review,
}) => {
  return (
    <>
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
        {/* {review&&<zirochki >Резюме</zirochki>} */}
        {Boolean(review) && <button>Резюме</button>}
        {/* <button>
        <svg className="nav__icon" width="14px" height="18px">
        <use xlinkHref={`${Icons}#icon-delete`} />
      </svg>
      </button> */}
      </li>
      {/* </MediaQuery> */}
    </>
  );
};

export default BookInfoItem;
