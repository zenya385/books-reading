import React from "react";
import Icons from '../../images/symbol-defs.svg';
import  s from './BookInfoItem.module.scss'

const BookInfoItem = ({ title, author, publishYear, pagesTotal,colorIcon }) => {
  return (
    <li className={s.item}>      
      <svg className="nav__icon" width="22px" height="17px">
        <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`}/>
      </svg>
      <a href="" className="link nav__link-contact">
        <p className="title-book">{title}</p>
      </a>
      <p className="author-book">{author}</p>
      <p className="publishYear-book">{publishYear}</p>
      <p className="pagesTotal-book">{pagesTotal}</p>
    </li>
  );
};

export default BookInfoItem;
