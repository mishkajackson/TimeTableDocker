import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";

function Icon({icon}) {
    return (
      <div>
        <FontAwesomeIcon className={styles.icon} icon={icon} />
      </div>
    );
    
}

export default Icon