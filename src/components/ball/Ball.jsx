/* eslint-disable */
import React from "react";
import RedBall from "../../assets/images/counter-red-large.svg";
import YellowBall from "../../assets/images/counter-yellow-large.svg";
import { useState, useEffect } from "react";

const Ball = ({ turn }) => {
  const [color, setColor] = useState(turn);

  useEffect(() => {
    setColor(turn);
  }, []);

  return color ? (
    <img src={RedBall} alt="redBall" />
  ) : (
    <img src={YellowBall} alt="yellowBall" />
  );
};

export default Ball;
