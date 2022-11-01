/* eslint-disable */

//? REACT IMPORTS
import { useLocation } from "react-router-dom";
import MyVerticallyCenteredModal from "../../components/menu/Menu";
import { useState, useRef, useEffect } from "react";
import Ball from "../ball/Ball";
// ? STYLE IMPORTS
import Logo from "../../assets/images/logo.svg";
import BlackBoard from "../../assets/images/board-layer-black-large.svg";
import SmallBlackBoard from "../../assets/images/board-layer-black-small.svg";

import WhiteBoard from "../../assets/images/board-layer-white-large.svg";
import SmallWhiteBoard from "../../assets/images/board-layer-white-small.svg";
import PlayerOne from "../../assets/images/player-one.svg";
import PlayerTwo from "../../assets/images/player-two.svg";
import CPU from "../../assets/images/cpu.svg";
import YellowTurn from "../../assets/images/turn-background-yellow.svg";
import RedTurn from "../../assets/images/turn-background-red.svg";

// import RedTurn from "../../assets/images/turn-background-red.svg";
import YellowMarker from "../../assets/images/marker-yellow.svg";
import RedMarker from "../../assets/images/marker-red.svg";
import Styles from "./InGame.module.scss";

const InGame = () => {
  let winningArray = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 7, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

  const boardRef = useRef();
  //
  const button1 = useRef();
  const button2 = useRef();
  const button3 = useRef();
  const button4 = useRef();
  const button5 = useRef();
  const button6 = useRef();
  const button7 = useRef();

  const [redPlayerBalls, setRedPlayerBalls] = useState([]);
  const [yellowPlayerBalls, setYellowPlayerBalls] = useState([]);
  const [slot, setSlot] = useState({
    0: 5,
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
  });
  const [modalShow, setModalShow] = useState(false);
  const [markerMove, setMarkerMove] = useState({ x: 200, y: 200 });
  // const [column, setColumn] = useState(-1);
  // const [row, setRow] = useState(-1);
  // true for yellow false for red
  const [turn, setTurn] = useState(true);
  const [balls, setBalls] = useState([]);
  // const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0 });
  const [timer, setTimer] = useState(0);
  const [winner, setWinner] = useState("");
  const [winningBalls, setWinningBalls] = useState([]);
  const [redScore, setRedScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);
  const [cpuTurn, setcpuTurn] = useState(true);

  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //router data
  const location = useLocation();
  const isPlayer = location?.state?.test;

  useEffect(() => {
    function handleResize() {
      window.location.reload();
    }

    window.addEventListener("resize", handleResize);
  }, [isScreenSmall]);

  useEffect(() => {
    let newBalls = balls.map((ball) => {
      if (
        String(ball.num) === String(winningBalls[0]) ||
        String(ball.num) === String(winningBalls[1]) ||
        String(ball.num) === String(winningBalls[2]) ||
        String(ball.num) === String(winningBalls[3])
      ) {
        return {
          check: true,
          color: ball.color,
          left: ball.left,
          num: ball.num,
          top: ball.top,
        };
      } else {
        return {
          check: false,
          color: ball.color,
          left: ball.left,
          num: ball.num,
          top: ball.top,
        };
      }
    });

    setBalls(newBalls);

    if (winner === "red") {
      setRedScore(redScore + 1);
    } else {
      setYellowScore(yellowScore + 1);
    }

    // console.log("burası çalışıyor");
    setIsGameFinished(false);
  }, [winningBalls, isGameFinished]);

  useEffect(() => {
    let macroTimer = setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearTimeout(macroTimer);
    };
  }, [timer]);

  useEffect(() => {
    // const gapPositions = {
    //   id: 51,
    //   x: ,
    //   y: boardRef.current.offsetTop + 65 * 1 + 15 + 17 * 0,
    // };
    setYellowPlayerBalls([]);
    setRedPlayerBalls([]);
    // setBoardPosition({
    //   x: boardRef.current.offsetLeft,
    //   y: boardRef.current.offsetTop,
    // });
    setRedScore(0);
    setYellowScore(0);
    setTurn(!turn);
    setcpuTurn(!cpuTurn);
    // const height = window.innerHeight;
    const width = window.innerWidth;
    if (width < 1190) {
      setIsScreenSmall(true);
    }
  }, []);

  const handlePlay = (event) => {
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 600);

    // console.log(typeof event.target.id);
    if (slot[event.target.id] >= 0 && !winner) {
      // setBoardPosition({
      //   x: boardRef.current.offsetLeft,
      //   y: boardRef.current.offsetTop,
      // });

      if (!isScreenSmall) {
        setBalls([
          ...balls,
          {
            color: turn ? "yellow" : "red",
            left:
              68 * Number(event.target.id) +
              15 +
              20 * (Number(event.target.id) - 1) +
              25,
            top:
              69 * slot[Number(event.target.id)] +
              15 +
              20 * slot[Number(event.target.id)] +
              4,
            num: slot[Number(event.target.id)] * 7 + Number(event.target.id),
            check: false,
          },
        ]);

        if (turn) {
          setRedPlayerBalls([
            ...redPlayerBalls,
            slot[Number(event.target.id)] * 7 + Number(event.target.id),
          ]);
        } else {
          setYellowPlayerBalls([
            ...yellowPlayerBalls,
            slot[Number(event.target.id)] * 7 + Number(event.target.id),
          ]);
        }

        setSlot({
          ...slot,
          [Number(event.target.id)]: slot[Number(event.target.id)] - 1,
        });
      } else {
        setBalls([
          ...balls,
          {
            color: turn ? "yellow" : "red",
            left:
              33.5 * Number(event.target.id) +
              15 +
              13 * (Number(event.target.id) - 1) +
              10,
            top:
              33.5 * slot[Number(event.target.id)] +
              10 +
              15 * slot[Number(event.target.id)] +
              10,
            num: slot[Number(event.target.id)] * 7 + Number(event.target.id),
            check: false,
          },
        ]);

        if (turn) {
          setRedPlayerBalls([
            ...redPlayerBalls,
            slot[Number(event.target.id)] * 7 + Number(event.target.id),
          ]);
        } else {
          setYellowPlayerBalls([
            ...yellowPlayerBalls,
            slot[Number(event.target.id)] * 7 + Number(event.target.id),
          ]);
        }

        setSlot({
          ...slot,
          [Number(event.target.id)]: slot[Number(event.target.id)] - 1,
        });
      }
      setTurn(!turn);
    }

    if (!winner && !isPlayer && turn) {
      setcpuTurn(!cpuTurn);
      setTurn(!turn);
    }
  };

  useEffect(() => {
    if (!winner && !isPlayer) {
      let cpuTimer = setTimeout(cpuPlay, 1000);
      return () => clearTimeout(cpuTimer);
    }
  }, [cpuTurn, winner]);

  const handleReset = () => {
    setBalls([]);
    setTimer(0);
    setWinner("");
    setRedPlayerBalls([]);
    setYellowPlayerBalls([]);
    setSlot({
      0: 5,
      1: 5,
      2: 5,
      3: 5,
      4: 5,
      5: 5,
      6: 5,
    });
  };

  const handleRestart = () => {
    setBalls([]);
    setTimer(0);
    setWinner("");
    setRedPlayerBalls([]);
    setYellowPlayerBalls([]);
    setSlot({
      0: 5,
      1: 5,
      2: 5,
      3: 5,
      4: 5,
      5: 5,
      6: 5,
    });
    setRedScore(0);
    setYellowScore(0);
  };

  const updateDisplay = (event) => {
    setMarkerMove({ x: event.clientX, y: event.clientY });
    //   console.log(markerMove);
    //   console.log(boardRef.current.offsetLeft);

    //   if (!isScreenSmall) {
    //     if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 15 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 80
    //     ) {
    //       setColumn(0);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 115 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 185
    //     ) {
    //       setColumn(1);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 200 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 270
    //     ) {
    //       setColumn(2);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 290 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 360
    //     ) {
    //       setColumn(3);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 380 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 450
    //     ) {
    //       setColumn(4);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 470 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 540
    //     ) {
    //       setColumn(5);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 560 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 630
    //     ) {
    //       setColumn(6);
    //     }

    //     if (
    //       event.pageY > boardRef.current.offsetTop - 320 &&
    //       event.pageY < boardRef.current.offsetTop - 205
    //     ) {
    //       setRow(0);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop - 190 &&
    //       event.pageY < boardRef.current.offsetTop - 120
    //     ) {
    //       setRow(1);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop - 100 &&
    //       event.pageY < boardRef.current.offsetTop - 30
    //     ) {
    //       setRow(2);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop - 10 &&
    //       event.pageY < boardRef.current.offsetTop + 60
    //     ) {
    //       setRow(3);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop + 80 &&
    //       event.pageY < boardRef.current.offsetTop + 150
    //     ) {
    //       setRow(4);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop + 170 &&
    //       event.pageY < boardRef.current.offsetTop + 240
    //     ) {
    //       setRow(5);
    //     }
    //   } else {
    //     if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 40 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 200
    //     ) {
    //       setColumn(0);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 50 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 250
    //     ) {
    //       setColumn(1);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 60 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 300
    //     ) {
    //       setColumn(2);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 70 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 350
    //     ) {
    //       setColumn(3);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 80 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 400
    //     ) {
    //       setColumn(4);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 90 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 450
    //     ) {
    //       setColumn(5);
    //     } else if (
    //       event.pageX > boardRef.current.offsetLeft - 325 + 100 &&
    //       event.pageX < boardRef.current.offsetLeft - 325 + 500
    //     ) {
    //       setColumn(6);
    //     }

    //     if (
    //       event.pageY > boardRef.current.offsetTop - 320 &&
    //       event.pageY < boardRef.current.offsetTop - 120
    //     ) {
    //       setRow(0);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop - 105 &&
    //       event.pageY < boardRef.current.offsetTop - 70
    //     ) {
    //       setRow(1);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop - 55 &&
    //       event.pageY < boardRef.current.offsetTop - 20
    //     ) {
    //       setRow(2);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop &&
    //       event.pageY < boardRef.current.offsetTop + 35
    //     ) {
    //       setRow(3);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop + 50 &&
    //       event.pageY < boardRef.current.offsetTop + 85
    //     ) {
    //       setRow(4);
    //     } else if (
    //       event.pageY > boardRef.current.offsetTop + 100 &&
    //       event.pageY < boardRef.current.offsetTop + 135
    //     ) {
    //       setRow(5);
    //     }
    //   }
  };

  useEffect(() => {
    let redCounter = 0;
    let yellowCounter = 0;
    for (let i = 0; i < winningArray.length; i++) {
      for (let j = 0; j < winningArray[i].length; j++) {
        if (redPlayerBalls.includes(winningArray[i][j])) {
          redCounter++;
        } else if (yellowPlayerBalls.includes(winningArray[i][j])) {
          yellowCounter++;
        }
        if (redCounter > 3) {
          setWinner("yellow");

          let won = winningArray[i];
          setWinningBalls(won);

          break;
        }

        if (yellowCounter > 3) {
          setWinner("red");

          let won = winningArray[i];
          setWinningBalls(won);
          break;
        }
      }
      redCounter = 0;
      yellowCounter = 0;
    }
  }, [turn]);

  const cpuPlay = () => {
    // console.log(isScreenSmall);
    let emptySlot;
    let cpuNum;
    while (true) {
      let myNum = Math.floor(Math.random() * 6);
      let cpuSlot = slot[myNum];
      if (cpuSlot >= 0) {
        emptySlot = cpuSlot;
        cpuNum = myNum;
        break;
      }
    }

    if (!isScreenSmall) {
      setBalls([
        ...balls,
        {
          color: turn ? "yellow" : "red",
          left: 68 * cpuNum + 15 + 20 * (cpuNum - 1) + 25,
          top: 69 * emptySlot + 15 + 20 * emptySlot + 4,
          num: emptySlot * 7 + cpuNum,
          check: false,
        },
      ]);
    } else {
      setBalls([
        ...balls,
        {
          color: turn ? "yellow" : "red",
          left: 33.5 * cpuNum + 15 + 13 * (cpuNum - 1) + 10,
          top: 33.5 * emptySlot + 10 + 15 * emptySlot + 10,
          num: emptySlot * 7 + cpuNum,
          check: false,
        },
      ]);
    }

    if (turn) {
      setRedPlayerBalls([...redPlayerBalls, emptySlot * 7 + cpuNum]);
    } else {
      setYellowPlayerBalls([...yellowPlayerBalls, emptySlot * 7 + cpuNum]);
    }

    setSlot({ ...slot, [cpuNum]: emptySlot - 1 });
    setTurn(!turn);
  };
  return (
    <div className={Styles.inGameContainer}>
      <nav className={Styles.inGameNav}>
        <button className={Styles.link} onClick={() => setModalShow(true)}>
          MENU
        </button>
        <img src={Logo} alt="" />
        <button className={Styles.link} onClick={handleRestart}>
          RESTART
        </button>
      </nav>
      <img
        src={!turn ? YellowMarker : RedMarker}
        className={Styles.marker}
        style={{ position: "absolute", left: `${markerMove.x}px` }}
        alt="YellowMarker"
      />
      <div className={Styles.main}>
        <div className={Styles.playerOne}>
          <img src={PlayerOne} alt="PlayerOne" />
          <p>{!isPlayer ? "YOU" : "PLAYER 1"}</p>
          <h2>{yellowScore}</h2>
        </div>
        <div
          className={Styles.board}
          // onMouseEnter={updateDisplay}
          // onMouseLeave={updateDisplay}
          onMouseMove={updateDisplay}
          // onClick={handlePlay}
          ref={boardRef}
        >
          <button
            id="0"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button1}
          >
            1
          </button>
          <button
            id="1"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button2}
          >
            2
          </button>
          <button
            id="2"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button3}
          >
            3
          </button>
          <button
            id="3"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button4}
          >
            4
          </button>
          <button
            id="4"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button5}
          >
            5
          </button>
          <button
            id="5"
            className={Styles.mobileButton}
            button1
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button6}
          >
            6
          </button>
          <button
            className={Styles.mobileButton}
            onClick={handlePlay}
            disabled={isButtonDisabled}
            ref={button7}
            id="6"
          >
            7
          </button>
          {balls.map((ball) => {
            return (
              <div
                key={ball.num}
                className={`${ball.check && Styles.ballDiv} ${
                  Styles.ballClass
                }`}
                style={{
                  position: "absolute",
                  left: `${ball.left}px`,
                  top: `${ball.top}px`,
                  zIndex: "4",
                }}
              >
                <Ball turn={turn} ball={ball} isScreenSmall={isScreenSmall} />
              </div>
            );
          })}
          <img
            src={isScreenSmall ? SmallBlackBoard : BlackBoard}
            alt="BlackBoard"
            className={Styles.BlackBoard}
          />
          <img
            src={isScreenSmall ? SmallWhiteBoard : WhiteBoard}
            alt="WhiteBoard"
            className={Styles.WhiteBoard}
          />
        </div>
        <div className={Styles.playerTwo}>
          <img src={isPlayer ? PlayerTwo : CPU} alt="PlayerTwo" />

          <p>{!isPlayer ? "CPU" : "PLAYER 2"}</p>

          <h2>{redScore}</h2>
        </div>
      </div>
      {winner ? (
        <div className={Styles.winnerBoard}>
          <p>
            {!isPlayer && turn
              ? "CPU"
              : !isPlayer
              ? "PLAYER "
              : winner === "yellow"
              ? "PLAYER 1"
              : "PLAYER 2"}
          </p>
          <h2>WINS</h2>
          <button onClick={handleReset}>PLAY AGAIN</button>
        </div>
      ) : (
        <div className={Styles.turn}>
          <img
            className={Styles.yellowTurn}
            src={!turn ? YellowTurn : RedTurn}
            alt="YellowTurn"
          />
          <div
            className={Styles.turnText}
            style={{ color: !turn ? "black" : "rgb(251, 251, 251)" }}
          >
            <p style={{ marginTop: "9px" }}>
              {!isPlayer && turn
                ? "PLAYER"
                : !isPlayer && !turn
                ? "CPU"
                : turn
                ? "PLAYER 1"
                : " PLAYER 2"}
              'S TURN
            </p>
            <h2>{timer}s</h2>
          </div>
        </div>
      )}

      <div
        className={`${Styles.inGameFooter} ${
          winner === "yellow"
            ? Styles.inGameFooterRed
            : winner === "red"
            ? Styles.inGameFooterYellow
            : Styles.inGameFooterBlue
        }`}
      ></div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default InGame;
