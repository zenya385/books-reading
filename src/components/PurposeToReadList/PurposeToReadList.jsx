import React from "react";
import s from "./PurposeToReadList.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";

const PurposeToReadList = ({ booksLibrary, colorIcon, review }) => {
  const theme = useSelector(getTheme);
  console.log('booksLibrary :>> ', booksLibrary);
  
  return (
    <>
      <ul
        className={s.bookList}
        style={{
          backgroundColor:
            theme === "light" ? "var(--light-theme)" : "var(--light-theme)",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>Назва книги</p>
            <p className={s.author}>Автор</p>
            <p className={s.year}>Рік</p>
            <p className={s.page}>Стор.</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {booksLibrary.length&& booksLibrary.map((book) => (
          <div  className={s.itemLineWrepper}>
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
                  <p className={s.bookInfoText}>Автор:</p>
                  <p className={s.bookInfoText}>Рік:</p>
                  <p className={s.bookInfoText}>Стор:</p>
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
