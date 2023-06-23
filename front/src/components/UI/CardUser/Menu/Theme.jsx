import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Theme({ backMenu }) {
  return (
    <div>
      <button className={styles.btnBack} onClick={backMenu}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Назад</span>
      </button>
      <h1>Theme</h1>
    </div>
  );
}

export default Theme;
