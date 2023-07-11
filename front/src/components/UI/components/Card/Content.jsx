import styles from "./style.module.css";
import Icon from "../Icon/Icon";

function Content({ icon, text }) {
  return (
    <div className={styles.block}>
      <Icon icon={icon} />
      <p>{text}</p>
    </div>
  );
}

export default Content;
