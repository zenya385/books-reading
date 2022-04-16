import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookInfoItem.module.scss";
import MediaQuery from "react-responsive";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsBookInfoItem } from "../../assets/langOptionsBookInfoItem";

const BookInfoItem = ({
  title,
  author,
  publishYear,
  pagesTotal,
  colorIcon,
}) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { authorItem, yearItem, pagesItem } = langOptionsBookInfoItem;

  return (
    <li
      className={s.item}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
      }}
    >
      <div className={s.iconTitle}>
        <svg className={s.navIcon} width="22px" height="17px">
          <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
        </svg>

        {/* <a href="" className="link nav__link-contact"> */}
        <p
          className={s.bookTitle}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {title}
        </p>
        {/* </a> */}
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
          <p
            className={s.bookMoreInfoAuthor}
            style={{
              color: theme === "light" ? "#242A37" : "var(--dark-text)",
            }}
          >
            {author}
          </p>
          <p
            className={s.bookMoreInfoYear}
            style={{
              color: theme === "light" ? "#242A37" : "var(--dark-text)",
            }}
          >
            {publishYear}
          </p>
          <p
            className={s.bookMoreInfoPage}
            style={{
              color: theme === "light" ? "#242A37" : "var(--dark-text)",
            }}
          >
            {pagesTotal}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BookInfoItem;
