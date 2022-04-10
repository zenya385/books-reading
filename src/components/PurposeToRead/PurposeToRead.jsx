import React from "react";
import s from "./PurposeToRead.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsMyPurposeToRead } from "../../assets/langOptionsMyPurposeToRead";

const PurposeToReadList = ({ booksLibrary, colorIcon, review }) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { title, author, publishYear, pagesTotal } = langOptionsMyPurposeToRead;

  return (
    <>
      <ul
        className={s.bookList}
        // style={{
        //   backgroundColor:
        //     theme === "light" ? "var(--light-theme)" : "var(--light-theme)",
        //   color: theme === "light" ? "black" : "white",
        // }}
      >
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>{title[lang]}</p>
            <p className={s.author}>{author[lang]}</p>
            <p className={s.year}>{publishYear[lang]}</p>
            <p className={s.page}>{pagesTotal[lang]}</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {booksLibrary.map((book) => (
          <div className={s.itemLineWrepper}>
            <span className={s.itemLine}></span>
            <li className={s.item} key={book._id}>
              <div className={s.iconTitle}>
                <svg className={s.navIcon} width="22px" height="17px">
                  <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
                </svg>

                <p className={s.bookTitle}>{book.title}</p>
              </div>
              <MediaQuery maxWidth={767}>
                <div className={s.bookInfo}>
                  <p className={s.bookInfoText}>{author[lang]}:</p>
                  <p className={s.bookInfoText}>{publishYear[lang]}:</p>
                  <p className={s.bookInfoText}>{pagesTotal[lang]}:</p>
                </div>
              </MediaQuery>
              <div className={s.bookMoreInfo}>
                <p className={s.bookMoreInfoAuthor}>{book.author}</p>
                <p className={s.bookMoreInfoYear}>{book.publishYear}</p>
                <p className={s.bookMoreInfoPage}>{book.pagesTotal}</p>
              </div>
              <button className={s.delBtn}>
                <svg className={s.delBtnIcon} width="14px" height="18px">
                  <use xlinkHref={`${Icons}#icon-delete`} />
                </svg>
              </button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default PurposeToReadList;
