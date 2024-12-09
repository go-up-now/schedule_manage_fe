import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [2500, 7000, 4000];
const pData = [2400, 4398, 5800];
const fData = [733, 1433, 1210];
const xLabels = ["2022", "2023", "2024"];
const u = [0, 1000, 2000, 5000];

export default function BiaxialLineChart() {
  return (
    <LineChart
      width={700}
      height={350}
      series={[
        {
          data: uData,
          label: "Học viên",
          yAxisId: "leftAxisId",
          color: "blue",
        },
        {
          data: pData,
          label: "Pass",
          yAxisId: "leftAxisId",
          color: "green",
        },
        {
          data: fData,
          label: "Fail",
          yAxisId: "leftAxisId",
          color: "red",
        },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
      rightAxis={u}
    />
  );
}
