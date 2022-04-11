import React from "react";
import { formatISO } from "date-fns";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getDurationPeriod,
  getIsTrain,
  getStats,
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
  const statsArr = useSelector(getStats);
  const isTrain = useSelector(getIsTrain);
  const duration = useSelector(getDurationPeriod);

  console.log("statsArr", statsArr);

  let dateNow = new Date();
  const labels = [];

  for (let i = 0; i <= duration+1; i += 1) {
    let k = new Date(Date.now(dateNow) + i * (3600 * 1000 * 24));
    labels[i] = formatISO(new Date(k), { representation: "date" });
  }

  const planData = [];
  let pages = 0;

  curReadBooks.forEach((el) => {
    pages = pages + el.pagesTotal;
  });

  let pagesForDay = Math.ceil(pages / duration);

  for (let i = 0; i <= duration+1; i += 1) {
    planData[i] = pagesForDay;
  }

  const factData = [0];
//   const factData = statsArr.forEach((el) => {
//       el.pagesCount
//   });

for (let i=0; i<statsArr.length;i+=1){
    console.log('statsArr[i]', statsArr[i])
    factData[i+1]= statsArr[i].pagesCount
}
console.log('factData', factData)
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
        data: factData,
        borderColor: "#FF6B08",
        backgroundColor: "#FF6B08",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartLine;
