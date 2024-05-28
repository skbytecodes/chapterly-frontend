import StarIcon from "@mui/icons-material/Star";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

function RatingBar({ num, receivedRatings }) {
  const percentage = (receivedRatings / 10) * 100;

  const ratingStyle = {
    display: "flex",
    justifyContent : "space-between",
    alignItems : "center",
    marginBottom : '0.5em',
  };

  const progressBarStyles = {
    height: 10,
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "green",
    },
    backgroundColor: "#f0f0ef",
    width: "50%",
    flex : 0.9,
  };
  return (
    <div style={ratingStyle}>
      <StarIcon style={{ color: "#d51912", fontSize:"1.2em" }} />
      <p>{num}</p>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={progressBarStyles}
      />
      
      <p>{percentage/10}</p>
    </div>
  );
}

export default RatingBar;
