import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import BookInfoList from "../components/BookInfoList/BookInfoList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  backgroundColor: "#FF6B08",
  cubicInterpolationMode: "monotone",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      display: true,
      labels: {
        color: "rgb(255, 99, 132)",
      },
    },
    title: {
      display: false,
      text: "Кількість сторінок за день",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "plan",
      data: [0, 3, 5, 6, 9, 10, 11],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    {
      label: "fact",
      data: [1, 2, 3, 5, 8, 10, 12],

      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#FF6B08",
      backgroundColor: "#FF6B08",
    },
  ],
};

const booksLibrary = [
  {
    title: "The Book of Five Rings",
    author: "Miyamoto Musashi",
    publishYear: 1643,
    totalPages: 110,
    pagesFinished: 0,
    _id: "507f1f77bcf86cd799439013",
    __v: 0,
  },
  {
    title: "Scrum. Революционный метод управлениями проектами.",
    author: "Джефф Сазерленд",
    publishYear: 1643,
    totalPages: 25,
    pagesFinished: 0,
    _id: "507f1f77bcf86cd799439012",
    __v: 0,
  },
];

const TrainingPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <h2>Моє тренування</h2>
      <DatePicker
      dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker dateFormat="dd.MM.yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
      <select>
        {booksLibrary.map((book) => (
          <option key={book._id} value={book.title}>
            {book.title}
          </option>
        ))}
      </select>
      <button>Додати</button>
      <h2>Моя мета прочитати</h2>
      <span>{booksLibrary.length}</span>
      <span> {Math.floor((endDate - startDate) / (3600 * 24 * 1000))}</span>
      <BookInfoList booksLibrary={booksLibrary} />
      <button>Почати тренування</button>
      <Line options={options} data={data} />;
    </>
  );
};

export default TrainingPage;
