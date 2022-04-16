import React from "react";
import s from "./ReadListWithCheckBox.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { langOptionsReadList } from "../../assets/langOptionsReadList";
import { getLang } from "../../redux/lang/langSelector";

const ReadListWithCheckBox = ({ booksLibrary }) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { titleL, authorL, publishYearL, pagesTotalL } = langOptionsReadList;

  return (
    <>
      <ul
        className={s.bookList}
        style={{
          backgroundColor:
            theme === "light" ? "var(--light-theme)" : "var(--dark-theme)",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <MediaQuery minWidth={768}>
          <div className={s.bookInfo}>
            <p className={s.title}>{titleL[lang]}</p>
            <p className={s.author}>{authorL[lang]}</p>
            <p className={s.year}>{publishYearL[lang]}</p>
            <p className={s.page}>{pagesTotalL[lang]}</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {booksLibrary.map(
          ({ _id, pagesFinished, pagesTotal, title, author, publishYear }) => (
            <li className={s.item} key={_id}>
              <div className={s.itemLineWrepper}>
                <span className={s.itemLine}></span>
              </div>
              <div className={s.conteiner}>
                <div className={s.iconTitle}>
                  {Number(pagesFinished) === Number(pagesTotal) && (
                    <div className={s.checkBoxWrepper}>
                      <div className={s.checkBoxIconWrepper}>
                        <svg
                          className={s.checkBoxIcon}
                          width="15px"
                          height="15px"
                        >
                          <use xlinkHref={`${Icons}#icon-checkBox`} />
                        </svg>
                      </div>
                      <div>
                        <p
                          className={s.bookTitle}
                          style={{
                            color: theme === "light" ? "#242A37" : "#cecfd2",
                          }}
                        >
                          {title}
                        </p>
                      </div>
                    </div>
                  )}

                  {Number(pagesFinished) !== Number(pagesTotal) && (
                    <div className={s.checkBoxWrepper}>
                      <div className={s.checkBox}></div>
                      <div>
                        <p
                          className={s.bookTitle}
                          style={{
                            color: theme === "light" ? "#242A37" : "#cecfd2",
                          }}
                        >
                          {title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <MediaQuery maxWidth={767}>
                  <div className={s.bookInfo}>
                    <p className={s.bookInfoText}>{authorL[lang]}:</p>
                    <p className={s.bookInfoText}>{publishYearL[lang]}:</p>
                    <p className={s.bookInfoText}>{pagesTotalL[lang]}:</p>
                  </div>
                </MediaQuery>
                <div className={s.bookMoreInfo}>
                  <p
                    className={s.bookMoreInfoAuthor}
                    style={{
                      color: theme === "light" ? "#242A37" : "#cecfd2",
                    }}
                  >
                    {author}
                  </p>
                  <p
                    className={s.bookMoreInfoYear}
                    style={{
                      color: theme === "light" ? "#242A37" : "#cecfd2",
                    }}
                  >
                    {publishYear}
                  </p>
                  <p
                    className={s.bookMoreInfoPage}
                    style={{
                      color: theme === "light" ? "#242A37" : "#cecfd2",
                    }}
                  >
                    {pagesTotal}
                  </p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default ReadListWithCheckBox;
