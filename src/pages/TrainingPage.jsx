import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
// import { getBooksGoingToReadState } from "../redux/books/booksSelectors";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { getBooks } from "../redux/books/booksOperations";
import MyPurposeToRead from "../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../components/MyTrainingPlaining/MyTrainingPlaining";
import {
  // getEndDate,
  // getStartDate,
  getTrainingBooks,
} from "../redux/training/trainingSelectors";
import StatisticsResults from "../components/AllStatistics/StatisticsResults/StatisticsResults"

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

const TrainingPage = () => {
  const loggedIn = useSelector(getIsLoggedIn);
  // const booksLibrary = useSelector(getBooksGoingToReadState);
  // const startDate = useSelector(getStartDate);
  // const endDate = useSelector(getEndDate);
  const books = useSelector(getTrainingBooks);

  const dispatch = useDispatch();

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  return (
    <div className={s.TrainingPage}>
      <MyTrainingPlaining />
      <MyPurposeToRead books={books} />
      <Line options={options} data={data} />
      <StatisticsResults/>
    </div>
  );
};

export default TrainingPage;
