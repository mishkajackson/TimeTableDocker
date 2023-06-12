import Content from "./Content";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function CardPaid({ items, users, cab, addUser, updateUser, date, day, icon }) {
  // console.log(items);
  const filteredItems = items.filter(
    (item) => moment(item.date).format('DD.MM.YYYY') === date && item.timeOfDay === day && item.cabId === cab
  );
  return (
    <div>
      <Content
        items={filteredItems}
        day={day}
        date={date}
        addUser={addUser}
        users={users}
        updateUser={updateUser}
      ></Content>
    </div>
  );
}

export default CardPaid;
