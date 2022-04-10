import React from "react";
import s from "./ReadListWithCheckBox.module.scss";
import MediaQuery from "react-responsive";
import Icons from "../../images/symbol-defs.svg";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { BsCheck } from "react-icons/bs";
import { Checkbox } from "@mui/material";
// import Checkbox from "react-custom-checkbox";

const ReadListWithCheckBox = ({ booksLibrary, colorIcon, review }) => {
  const theme = useSelector(getTheme);

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
            <p className={s.title}>Назва книги</p>
            <p className={s.author}>Автор</p>
            <p className={s.year}>Рік</p>
            <p className={s.page}>Стор.</p>
          </div>
          <span className={s.bookInfoLine}></span>
        </MediaQuery>
        {booksLibrary.map((book) => (
          <div className={s.itemLineWrepper}>
            <span className={s.itemLine}></span>
            <li className={s.item} key={book._id}>
              <div className={s.iconTitle}>
                <div className={s.checkBoxWrepper}>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: "#A6ABB9",
                      "&.Mui-checked": {
                        color: "red",
                      },
                    }}
                  />

                  {/* <Checkbox
                    icon={<BsCheck color="#174A41" size={14} />}
                    name="my-input"
                    checked={true}
                    // onChange={(value) => {
                    //   let p = {
                    //     isTrue: value,
                    //   };
                    //   return alert(value);
                    // }}
                    borderColor="#A6ABB9"
                    style={{
                      cursor: "pointer",
                      width: "15",
                      height: "15",
                      borderRadius: "0",
                    }}
                  /> */}
                  <p className={s.bookTitle}>{book.title}</p>
                </div>
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
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default ReadListWithCheckBox;
