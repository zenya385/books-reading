import React from "react";
import s from "./ReadListWithCheckBox.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { BsCheck } from "react-icons/bs";
import { Checkbox } from "@mui/material";
import { langOptionsReadList } from "../../assets/langOptionsReadList";
import { getLang } from "../../redux/lang/langSelector";
// import Checkbox from "react-custom-checkbox";

// {  вызов компонента

//   Boolean(curReadBooks.length) && (
//     <ReadListWithCheckBox
//       booksLibrary={curReadBooks}
//       colorIcon="grey"
//       review={0}
//     />
//   );
// }

const ReadListWithCheckBox = ({ booksLibrary }) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { title, author, publishYear, pagesTotal } = langOptionsReadList;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
            <p className={s.title}>{title[lang]}</p>
            <p className={s.author}>{author[lang]}</p>
            <p className={s.year}>{publishYear[lang]}</p>
            <p className={s.page}>{pagesTotal[lang]}</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {booksLibrary.map((book) => (
          <div className={s.itemLineWrepper} key={book._id}>
            <span className={s.itemLine}></span>
            <li className={s.item}>
              <div className={s.iconTitle}>
                {/* проверка для рендера checkBox */}
                {/* {если все то чекнутый ? <div className={s.checkBoxWrepper}>
                  <svg className={s.checkBoxIcon} width="15px" height="15px">
                    <use xlinkHref={`${Icons}#icon-checkBox`} />
                  </svg>
                </div>}:  <div className={s.checkBox}></div>
                <p className={s.bookTitle}>{book.title}</p>
              </div>*/}

                {/* что ниже потом удалить */}
                <div className={s.checkBox}></div>
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
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default ReadListWithCheckBox;
