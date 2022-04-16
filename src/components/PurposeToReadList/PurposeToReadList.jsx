import React from "react";
import s from "./PurposeToReadList.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsPurposeToRead } from "../../assets/langOptionsPurposeToRead";

const PurposeToReadList = ({ books, colorIcon, handleDeleteBook }) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { title, author, publishYear, pagesTotal } = langOptionsPurposeToRead;

  return (
    <>
      <ul className={s.bookList}>
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>{title[lang]}</p>
            <p className={s.author}>{author[lang]}</p>
            <p className={s.year}>{publishYear[lang]}</p>
            <p className={s.page}>{pagesTotal[lang]}</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {Boolean(books.length) &&
          books.map((book) => (
            <li className={s.item} key={book._id}>
              <div className={s.itemLineWrepper}>
                <span className={s.itemLine}></span>
              </div>
              <div className={s.iconTitle}>
                <svg className={s.navIcon} width="22px" height="17px">
                  <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
                </svg>
                <p
                  className={s.bookTitle}
                  style={{
                    color: theme === "light" ? "#242A37" : "var(--dark-text)",
                  }}
                >
                  {book.title}
                </p>
              </div>
              <MediaQuery maxWidth={767}>
                <div className={s.bookInfo}>
                  <p className={s.bookInfoText}>{author[lang]}:</p>
                  <p className={s.bookInfoText}>{publishYear[lang]}:</p>
                  <p className={s.bookInfoText}>{pagesTotal[lang]}:</p>
                </div>
              </MediaQuery>
              <div className={s.bookMoreInfo}>
                <p
                  className={s.bookMoreInfoAuthor}
                  style={{
                    color: theme === "light" ? "#242A37" : "var(--dark-text)",
                  }}
                >
                  {book.author}
                </p>
                <p
                  className={s.bookMoreInfoYear}
                  style={{
                    color: theme === "light" ? "#242A37" : "var(--dark-text)",
                  }}
                >
                  {book.publishYear}
                </p>
                <p
                  className={s.bookMoreInfoPage}
                  style={{
                    color: theme === "light" ? "#242A37" : "var(--dark-text)",
                  }}
                >
                  {book.pagesTotal}
                </p>
              </div>
              <button
                className={s.delBtn}
                value={book._id}
                onClick={handleDeleteBook}
              >
                <svg className={s.delBtnIcon} width="14px" height="18px">
                  <use xlinkHref={`${Icons}#icon-delete`} />
                </svg>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PurposeToReadList;
