import Modal from "react-bootstrap/Modal";
import Styles from "./Menu.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} className={`${Styles.modal}`} centered>
      <Modal.Body className={Styles.menuBody}>
        <div className={Styles.menuContainer}>
          <AiOutlineClose onClick={props.onHide} className={Styles.closeIcon} />
          <h2 className={Styles.menuHeader}>PAUSE</h2>
          <div className={Styles.menuButtons}>
            <button
              onClick={props.onHide}
              className={`${Styles.continue} ${Styles.continue}`}
            >
              <p>CONTINUE GAME </p>
            </button>
            <button
              className={`${Styles.restart} ${Styles.restart}`}
              onClick={() => window.location.reload()}
            >
              <p>RESTART</p>
            </button>
            <button className={`${Styles.quit} ${Styles.quit}`}>
              <Link to={"/"}>
                <p>QUIT GAME</p>
              </Link>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
