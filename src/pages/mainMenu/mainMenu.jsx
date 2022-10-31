//? REACT IMPORTS
import { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

// ? STYLE IMPORTS
import Pvp from "../../assets/images/player-vs-player.svg";
import PvpCpu from "../../assets/images/player-vs-cpu.svg";
import Logo from "../../assets/images/logo.svg";
import Styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const navigate = useNavigate();
  // true for player false for CPU
  const [player, setPlayer] = useState(true);

  return (
    <div className={Styles.mainMenu}>
      <img src={Logo} alt="logo" className={Styles.logo} />
      {player ? (
        <button
          className={Styles.pvp}
          onClick={(event) =>
            event.target.tagName !== "svg"
              ? navigate("/inGame", { state: { test: player } })
              : ""
          }
        >
          <p>PLAYER VS PLAYER </p>
          <img src={Pvp} alt="pvp" />
          <HiSwitchHorizontal
            onClick={() => setPlayer(!player)}
            className={Styles.switchPvp}
            style={{ color: !player ? "white" : "black" }}
          />
        </button>
      ) : (
        <button
          className={`${Styles.pvpCpu} ${Styles.pvp}`}
          onClick={(event) =>
            event.target.tagName !== "svg"
              ? navigate("/inGame", { state: { test: player } })
              : ""
          }
        >
          <p>PLAYER VS CPU</p>
          <img src={PvpCpu} alt="pvp" />
          <HiSwitchHorizontal
            className={Styles.switchCpu}
            onClick={() => setPlayer(!player)}
          />
        </button>
      )}

      <Link to={"/rules"} className={Styles.gameRules}>
        <p> GAME RULES</p>
      </Link>
    </div>
  );
};

export default MainMenu;
