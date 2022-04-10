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
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { getBooks } from "../redux/books/booksOperations";
import MyPurposeToRead from "../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../components/MyTrainingPlaining/MyTrainingPlaining";
import {
  getDurationPeriod,
  getTrainingBooks,
} from "../redux/training/trainingSelectors";
import StatisticsResults from "../components/AllStatistics/StatisticsResults/StatisticsResults";
import Timer from "../components/Timer/Timer";
import { getBooksCurrentlyReadingState } from "../redux/books/booksSelectors";
import { duration } from "@mui/material";
import { getPlaningTraining } from "../redux/training/trainingOperations";
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
const stateInfo=useSelector(state=>state);
const infoTraining=useSelector(state=>state.training);

useEffect(() => {
  dispatch(getPlaningTraining());  
}, []);

  const duration=useSelector(getDurationPeriod)
  for (let i = 0; i < duration; i += 1) {
    labels[i] = i;
  }
  // console.log(labels);

  const loggedIn = useSelector(getIsLoggedIn); 
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
       {isTrain&&<BookInfoList booksLibrary={infoTraining.books} colorIcon="grey" review={0} />}
      <MyPurposeToRead books={books} isTrain={isTrain} />
      <Line options={options} data={data} />
      {isTrain && <StatisticsResults />}
    </div>
  );
};

export default TrainingPage;
