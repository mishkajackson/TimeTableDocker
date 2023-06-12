
import moment from 'moment';
import styles from './style.module.css';



function DatePicker({ currentWeekDates, setSelectedDay, selectedDay}) {
    return (
      <div>
        <div className={styles.titleMonth}>
          <h1>{new Date().toLocaleDateString("ru-RU", { month: "long" })}</h1>
        </div>
        <div className={styles.datePicker}>
          {currentWeekDates.map((date, index) =>
            date !== selectedDay ? (
              <div
                onClick={() => setSelectedDay(currentWeekDates[index])}
                key={index}
                className={styles.date}
              >
                <p className={styles.date_week}>
                  {moment(date, "DD.MM.YYYY").format("dd")}
                </p>
                <p className={styles.date_number}>
                  {moment(date, "DD.MM.YYYY").format("DD")}
                </p>
              </div>
            ) : (
              <div
                key={index}
                style={{
                  color: "#5e91ff",
                  border: "1px solid #5e91ff",
                  background: "#eff4ff",
                }}
                className={styles.date}
              >
                <p className={styles.date_week}>
                  {moment(date, "DD.MM.YYYY").format("dd")}
                </p>
                <p className={styles.date_number}>
                  {moment(date, "DD.MM.YYYY").format("DD")}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
}

export default DatePicker