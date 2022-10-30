/* eslint-disable */
import React from "react";
import RedBall from "../../assets/images/counter-red-large.svg";
import SmallRedBall from "../../assets/images/counter-red-small.svg";
import YellowBall from "../../assets/images/counter-yellow-large.svg";
import SmallYellowBall from "../../assets/images/counter-yellow-small.svg";
import { useState, useEffect } from "react";

const Ball = ({ turn, isScreenSmall }) => {
  const [color, setColor] = useState(turn);

  useEffect(() => {
    setColor(turn);
  }, []);

  return !color ? (
    <img src={isScreenSmall ? SmallRedBall : RedBall} alt="redBall" />
  ) : (
    <img src={isScreenSmall ? SmallYellowBall : YellowBall} alt="yellowBall" />
  );
};

export default Ball;
