import React from 'react'
import s from './MyPurposeToRead.module.scss'

const MyPurposeToRead = ({ booksLibrary, endDate, startDate }) => {
  return (
      
    <div className={s.myPurposeToRead}>
      <h2>Моя мета прочитати</h2>
      <div className={s.numbersPurpose}>
      <span>{booksLibrary.length}</span>
      <span> {Math.floor((endDate - startDate) / (3600 * 24 * 1000))}</span>
      <span> {Math.floor((endDate - startDate) / (3600 * 24 * 1000))}</span>
          </div>
      </div>
  );
};

export default MyPurposeToRead;
