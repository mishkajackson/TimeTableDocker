import moment from "moment";
import styles from "./style.module.css"

function Title() {
    return (
      <div>
        <div className={styles.titleMonth}>
          <h1>{moment().format('MMMM')}</h1>
        </div>
      </div>
    );
}

export default Title