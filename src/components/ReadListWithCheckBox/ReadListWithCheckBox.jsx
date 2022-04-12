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
  const { titleL, authorL, publishYearL, pagesTotalL } = langOptionsReadList;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

 
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
        {booksLibrary.map(({_id,pagesFinished,pagesTotal,title,author,publishYear}) => (
          
          <div key={_id} className={s.itemLineWrepper} >
            <span className={s.itemLine}></span>
            <li className={s.item}>
              <div className={s.iconTitle}>
                {/* проверка для рендера checkBox */}
                {(Number(pagesFinished)===Number(pagesTotal))&&
               ( <>
               <div className={s.checkBoxWrepper}>
                  <svg className={s.checkBoxIcon} width="15px" height="15px">
                    <use xlinkHref={`${Icons}#icon-checkBox`} />
                  </svg>
                  
                </div><p className={s.bookTitle}>{title}</p>
               </>)}
              
                {(Number(pagesFinished)!==Number(pagesTotal))&&(
               <>
                <div className={s.checkBox}></div>
                <p className={s.bookTitle}>{title}</p>
               </>)}
                {/* {if (Number({book.pagesFinished})===Number({book.pagesTotal})) {
                           <div className={s.checkBoxWrepper}>
                  <svg className={s.checkBoxIcon} width="15px" height="15px">
                    <use xlinkHref={`${Icons}#icon-checkBox`} />
                  </svg>
                </div>
              }else  {
                <div className={s.checkBox}></div>
                <p className={s.bookTitle}>{book.title}</p>
              }} */}
              </div>

                {/* что ниже потом удалить */}
                {/* <div className={s.checkBox}></div>
                <p className={s.bookTitle} style={{
           color: theme === "light" ? "#242A37" : "#cecfd2",
         }}>{book.title}</p>
               </div> */}

              <MediaQuery maxWidth={767}>
                <div className={s.bookInfo}>
                  <p className={s.bookInfoText}>{authorL[lang]}:</p>
                  <p className={s.bookInfoText}>{publishYearL[lang]}:</p>
                  <p className={s.bookInfoText}>{pagesTotalL[lang]}:</p>
                </div>
              </MediaQuery>
              <div className={s.bookMoreInfo}>
                <p className={s.bookMoreInfoAuthor} style={{
          color: theme === "light" ? "#242A37" : "#cecfd2",
        }}>{author}</p>
                <p className={s.bookMoreInfoYear} style={{
          color: theme === "light" ? "#242A37" : "#cecfd2",
        }}>{publishYear}</p>
                <p className={s.bookMoreInfoPage} style={{
          color: theme === "light" ? "#242A37" : "#cecfd2",
        }}>{pagesTotal}</p>
              </div>
            </li>
           </div>
        ))}
      </ul>
    </>
  );
};

export default ReadListWithCheckBox;
