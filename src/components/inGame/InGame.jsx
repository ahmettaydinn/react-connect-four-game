//? REACT IMPORTS
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "../../components/menu/Menu";
import { useState, useRef, useEffect } from "react";
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
  const boardRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [markerMove, setMarkerMove] = useState({});
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  // true for red false for yellow
  const [turn, setTurn] = useState(false);
  const [balls, setBalls] = useState([]);
  const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0 });

  const updateDisplay = (event) => {
    setMarkerMove({ x: event.clientX, y: event.clientY });

    if (
      event.pageX > boardRef.current.offsetLeft - 325 + 15 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 80
    ) {
      setColumn(0);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 115 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 185
    ) {
      setColumn(1);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 200 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 270
    ) {
      setColumn(2);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 290 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 360
    ) {
      setColumn(3);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 380 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 450
    ) {
      setColumn(4);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 470 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 540
    ) {
      setColumn(5);
    } else if (
      event.pageX > boardRef.current.offsetLeft - 325 + 560 &&
      event.pageX < boardRef.current.offsetLeft - 325 + 630
    ) {
      setColumn(6);
    }

    if (
      event.pageY > boardRef.current.offsetTop - 320 &&
      event.pageY < boardRef.current.offsetTop - 205
    ) {
      setRow(0);
    } else if (
      event.pageY > boardRef.current.offsetTop - 190 &&
      event.pageY < boardRef.current.offsetTop - 120
    ) {
      setRow(1);
    } else if (
      event.pageY > boardRef.current.offsetTop - 100 &&
      event.pageY < boardRef.current.offsetTop - 30
    ) {
      setRow(2);
    } else if (
      event.pageY > boardRef.current.offsetTop - 10 &&
      event.pageY < boardRef.current.offsetTop + 60
    ) {
      setRow(3);
    } else if (
      event.pageY > boardRef.current.offsetTop + 80 &&
      event.pageY < boardRef.current.offsetTop + 150
    ) {
      setRow(4);
    } else if (
      event.pageY > boardRef.current.offsetTop + 170 &&
      event.pageY < boardRef.current.offsetTop + 240
    ) {
      setRow(5);
    }
  };

  useEffect(() => {
    // const gapPositions = {
    //   id: 51,
    //   x: ,
    //   y: boardRef.current.offsetTop + 65 * 1 + 15 + 17 * 0,
    // };
    setBoardPosition({
      x: boardRef.current.offsetLeft,
      y: boardRef.current.offsetTop,
    });
    console.log("board position in useEffect");
    console.log(boardPosition);
  }, []);

  const handlePlay = (event) => {
    setBoardPosition({
      x: boardRef.current.offsetLeft,
      y: boardRef.current.offsetTop,
    });
    console.log("board position in function");
    console.log(boardPosition);
    console.log(boardRef);
    setBalls([
      ...balls,
      {
        color: turn ? "red" : "yellow",
        left: 68 * column + 15 + 20 * (column - 1) + 25,
        top: 69 * row + 15 + 20 * (row - 1) + 25,
      },
    ]);
    setTurn(!turn);
  };

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
          ref={boardRef}
        >
          {balls.map((ball) => {
            return (
              <div
                key={ball.x}
                style={{
                  position: "absolute",
                  left: `${ball.left}px`,
                  top: `${ball.top}px`,
                  zIndex: "4",
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
