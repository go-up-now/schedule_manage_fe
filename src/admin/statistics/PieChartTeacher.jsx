import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
const data = [
  { value: 60, label: "Học viên", color: "blue" },
  { value: 40, label: "Giảng viên", color: "orange" },
];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
  fontWeight: "bold",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartTeacher() {
  return (
    <PieChart series={[{ data, innerRadius: 50 }]} {...size}>
      <PieCenterLabel>%</PieCenterLabel>
    </PieChart>
  );
}
