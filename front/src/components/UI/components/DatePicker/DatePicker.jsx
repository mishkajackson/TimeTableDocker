
import moment from 'moment';
import styles from './style.module.css';



function DatePicker({ selectedDay, changeDay, currentWeekDates }) {

  return (
    <div>
      <div className={styles.datePicker}>
        {currentWeekDates.map((date) =>
          date.date !== selectedDay.date ? (
            <div
              onClick={() => changeDay(currentWeekDates[date.id])}
              key={date.id}
              className={styles.date}
            >
              <p className={styles.date_week}>
                {moment(date.date, "DD.MM.YYYY").format("dd")}
              </p>
              <p className={styles.date_number}>
                {moment(date.date, "DD.MM.YYYY").format("DD")}
              </p>
            </div>
          ) : (
            <div
              key={date.id}
              style={{
                color: "#5e91ff",
                border: "1px solid #5e91ff",
                background: "#eff4ff",
              }}
              className={styles.date}
            >
              <p className={styles.date_week}>
                {moment(date.date, "DD.MM.YYYY").format("dd")}
              </p>
              <p className={styles.date_number}>
                {moment(date.date, "DD.MM.YYYY").format("DD")}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DatePicker