//? REACT IMPORTS
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "../../components/menu/Menu";
import { useState } from "react";
import Ball from "../ball/Ball";
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
  const [modalShow, setModalShow] = useState(false);
  const [markerMove, setMarkerMove] = useState({});
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  // true for red false for yellow
  const [turn, setTurn] = useState(false);
  const [balls, setBalls] = useState([]);
  // const [currentBall, setCurrentBall] = useState({});

  const updateDisplay = (event) => {
    console.log(event.target.offsetLeft);
    console.log("pageX", event.pageX);
    console.log("pageY", event.pageY);
    setMarkerMove({ x: event.clientX, y: event.clientY });

    if (event.pageX > 340 && event.pageX < 400) {
      setColumn(1);
    } else if (event.pageX > 435 && event.pageX < 480) {
      setColumn(2);
    } else if (event.pageX > 520 && event.pageX < 575) {
      setColumn(3);
    } else if (event.pageX > 610 && event.pageX < 660) {
      setColumn(4);
    } else if (event.pageX > 700 && event.pageX < 750) {
      setColumn(5);
    } else if (event.pageX > 790 && event.pageX < 840) {
      setColumn(6);
    } else if (event.pageX > 875 && event.pageX < 925) {
      setColumn(7);
    }

    if (event.pageY > 188 && event.pageY < 253) {
      setRow(1);
    } else if (event.pageY > 278 && event.pageY < 345) {
      setRow(2);
    } else if (event.pageY > 370 && event.pageY < 430) {
      setRow(3);
    } else if (event.pageY > 450 && event.pageY < 517) {
      setRow(4);
    } else if (event.pageY > 540 && event.pageY < 600) {
      setRow(5);
    } else if (event.pageY > 630 && event.pageY < 699) {
      setRow(6);
    }
  };
  const handlePlay = (event) => {
    setBalls([
      ...balls,
      { color: turn ? "red" : "yellow", x: event.pageX, y: event.pageY },
    ]);
    setTurn(!turn);
  };

  console.log(balls);
  console.log("turn", turn);

  return (
    <div className={Styles.inGameContainer}>
      <p>{`x: ${markerMove.x} , y: ${markerMove.y}`}</p>
      <p>{`column: ${column} row: ${row}`}</p>
      <nav className={Styles.inGameNav}>
        <Link className={Styles.link} onClick={() => setModalShow(true)}>
          MENU
        </Link>
        <img src={Logo} alt="" />
        <Link className={Styles.link}>RESTART</Link>
      </nav>
      <img
        src={YellowMarker}
        className={Styles.marker}
        style={{ position: "absolute", left: `${markerMove.x}px` }}
        alt="YellowMarker"
      />
      <div className={Styles.main}>
        <div className={Styles.playerOne}>
          <img src={PlayerOne} alt="PlayerOne" />
          <p>PLAYER 1</p>
          <h2>12</h2>
        </div>
        <div
          className={Styles.board}
          onMouseEnter={updateDisplay}
          onMouseLeave={updateDisplay}
          onMouseMove={updateDisplay}
          onClick={handlePlay}
        >
          {balls.map((ball) => {
            return (
              <div
                key={ball.x}
                style={{
                  position: "absolute",
                  left: `${ball.x - 350}px`,
                  top: `${ball.y - 200}px`,
                }}
              >
                <Ball turn={turn} ball={ball} />
              </div>
            );
          })}
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
          <p>PLAYER 2'S TURN</p>
          <h2>14s</h2>
        </div>
      </div>
      <div className={Styles.inGameFooter}></div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default InGame;
