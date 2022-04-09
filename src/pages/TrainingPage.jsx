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
  getDurationPeriod,
  // getEndDate,
  // getStartDate,
  getTrainingBooks,
} from "../redux/training/trainingSelectors";
import StatisticsResults from "../components/AllStatistics/StatisticsResults/StatisticsResults";
import Timer from "../components/Timer/Timer";
import { getBooksCurrentlyReadingState } from "../redux/books/booksSelectors";
import { duration } from "@mui/material";

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

let labels = [1,2,3,4,5,6,7,8,9,10];

export const data = {
  labels,
  datasets: [
    {
      label: "plan",
      data: [10, 10,10, 10,10, 10,10, 10,10, 10],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    {
      label: "fact",
      data: [10, 12,13, 15, 18, 10, 12,15,10,12],

      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#FF6B08",
      backgroundColor: "#FF6B08",
    },
  ],
};

const TrainingPage = () => {
const stateInfo=useSelector(state=>state)

console.log(stateInfo);

  const duration=useSelector(getDurationPeriod)
  for (let i = 0; i < duration; i += 1) {
    labels[i] = i;
  }
  console.log(labels);

  const loggedIn = useSelector(getIsLoggedIn);
  // const booksLibrary = useSelector(getBooksGoingToReadState);
  // const startDate = useSelector(getStartDate);
  // const endDate = useSelector(getEndDate);
  const books = useSelector(getTrainingBooks);
  const booksCurrentlyReading =useSelector(getBooksCurrentlyReadingState)

  const dispatch = useDispatch();

  const isTrain=Boolean(booksCurrentlyReading.length)

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  return (
    <div className={s.TrainingPage}>
       {isTrain&&<Timer />}
       {!isTrain&& <MyTrainingPlaining  />}
      <MyPurposeToRead books={books} isTrain={isTrain} />
      <Line options={options} data={data} />
      {isTrain && <StatisticsResults />}
    </div>
  );
};

export default TrainingPage;
