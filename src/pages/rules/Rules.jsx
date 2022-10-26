import Styles from "./Rules.module.scss";
import iconCheck from "../../assets/images/icon-check.svg";
import { Link } from "react-router-dom";
const Rules = () => {
  return (
    <div className={Styles.rulesContainer}>
      <h1>Rules</h1>
      <div className={Styles.firstParagraph}>
        <h2>OBJECTIVE</h2>
        <p>
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
      </div>
      <div className={Styles.secondParagraph}>
        <h2>HOW TO PLAY</h2>
        <ol>
          <li>&nbsp;&nbsp;&nbsp;Red goes first in the first game.</li>
          <li>
            &nbsp;&nbsp;&nbsp;Players must alternate turns, and only one disc
            can be dropped in each turn.
          </li>
          <li>
            &nbsp;&nbsp;&nbsp;The game ends when there is a 4-in-a-row or a
            stalemate.
          </li>
          <li>
            &nbsp;&nbsp;&nbsp;The starter of the previous game goes second on
            the next game.
          </li>
        </ol>
      </div>
      <Link to={"/"}>
        <img src={iconCheck} alt="" />
      </Link>
    </div>
  );
};

export default Rules;
