import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Password({ backMenu }) {
  return (
    <div>
      <button className={styles.btnBack} onClick={backMenu}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Назад</span>
      </button>
      <h1>Password</h1>
    </div>
  );
}

export default Password;
