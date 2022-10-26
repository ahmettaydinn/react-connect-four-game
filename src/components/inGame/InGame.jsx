//? REACT IMPORTS
import { Link } from "react-router-dom";

// ? STYLE IMPORTS
import Logo from "../../assets/images/logo.svg";
import BlackBoard from "../../assets/images/board-layer-black-large.svg";
import WhiteBoard from "../../assets/images/board-layer-white-large.svg";
import PlayerOne from "../../assets/images/player-one.svg";
import PlayerTwo from "../../assets/images/player-two.svg";
import YellowTurn from "../../assets/images/turn-background-yellow.svg";
// import RedTurn from "../../assets/images/turn-background-red.svg";
import YellowMarker from "../../assets/images/marker-yellow.svg";
// import RedMarker from "../../assets/images/marker-red.svg";
import Styles from "./InGame.module.scss";

const InGame = () => {
  return (
    <div className={Styles.inGameContainer}>
      <nav className={Styles.inGameNav}>
        <Link className={Styles.link}>MENU</Link>
        <img src={Logo} alt="" />
        <Link className={Styles.link}>RESTART</Link>
      </nav>
      <img src={YellowMarker} className={Styles.marker} alt="YellowMarker" />
      <div className={Styles.main}>
        <div className={Styles.playerOne}>
          <img src={PlayerOne} alt="PlayerOne" />
          <p>PLAYER 1</p>
          <h2>12</h2>
        </div>
        <div className={Styles.board}>
          <img
            src={BlackBoard}
            alt="BlackBoard"
            className={Styles.BlackBoard}
          />
          <img
            src={WhiteBoard}
            alt="WhiteBoard"
            className={Styles.WhiteBoard}
          />
        </div>
        <div className={Styles.playerTwo}>
          <img src={PlayerTwo} alt="PlayerTwo" />
          <p>PLAYER 2</p>
          <h2>23</h2>
        </div>
      </div>
      <div className={Styles.turn}>
        <img className={Styles.yellowTurn} src={YellowTurn} alt="YellowTurn" />
        <div className={Styles.turnText}>
          <p>PLAYER 2’S TURN</p>
          <h2>14s</h2>
        </div>
      </div>
      <div className={Styles.inGameFooter}></div>
    </div>
  );
};

export default InGame;
