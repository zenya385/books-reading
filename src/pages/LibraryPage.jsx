import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BookInfoList from "../components/BookInfoList/BookInfoList";

const LibraryPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>     
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />      
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />      
      <BookInfoList />
    </>
  );
};

export default LibraryPage;
