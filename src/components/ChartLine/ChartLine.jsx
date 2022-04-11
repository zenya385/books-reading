import React from "react";
import { formatISO } from "date-fns";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getDurationPeriod,
  getIsTrain,
} from "../../redux/training/trainingSelectors";

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

const ChartLine = ({ curReadBooks }) => {
  const isTrain = useSelector(getIsTrain);
  const duration = useSelector(getDurationPeriod);

  let dateNow = new Date();
  const labels = [];

  for (let i = 0; i <= duration; i += 1) {
    let k = new Date(Date.now(dateNow) + i * (3600 * 1000 * 24));
    labels[i] = formatISO(new Date(k), { representation: "date" });
  }
  
  const planData = [];
  let pages = 0;

  curReadBooks.forEach((el) => {
    pages = pages + el.pagesTotal;
  });

  let pagesForDay = Math.ceil(pages / duration);

  for (let i = 0; i <= duration; i += 1) {
    planData[i] = pagesForDay;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "plan",
        data: planData,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(0, 0, 0)",
      },
      isTrain && {
        label: "fact",
        data: [0, 10, 12, 13, 15, 18, 10, 12, 15, 10, 12],
        borderColor: "#FF6B08",
        backgroundColor: "#FF6B08",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartLine;
