import moment from "moment";

import DatePicker from "../DatePicker/DatePicker";
import styles from "./style.module.css"

function Title({
  isVisibleDatepicker,
  selectedDay,
  changeDay,
  currentWeekDates,
}) {
  return (
    <div className={styles.title}>
      <div className={styles.titleMonth}>
        <h1>{moment().format("MMMM")}</h1>
      </div>
      {isVisibleDatepicker ? (
        <DatePicker
          selectedDay={selectedDay}
          changeDay={changeDay}
          currentWeekDates={currentWeekDates}
        ></DatePicker>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Title