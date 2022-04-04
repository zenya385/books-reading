import React from "react";
const BookInfoItem = ({ title, author, publishYear, totalPages }) => {
  return (
    <li>      
      <svg class="nav__icon" width="22px" height="17px">
        <use href="../../images/symbol-defs.svg#icon-flat-grey"></use>
      </svg>
      <a href="" class="link nav__link-contact">
        <p className="title-book">{title}</p>
      </a>
      <p className="author-book">Автор: {author}</p>
      <p className="publishYear-book">Рік: {publishYear}</p>
      <p className="totalPages-book">Стор: {totalPages}</p>
    </li>
  );
};

export default BookInfoItem;
