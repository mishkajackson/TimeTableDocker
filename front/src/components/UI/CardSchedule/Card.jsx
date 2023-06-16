import Content from "./Content";
import moment from "moment";

function CardPaid({ items, users, cab, addUser, updateUser, date, day, icon }) {
  // console.log(items);
  const filteredItems = items.filter(
    (item) =>
      moment(item.date).format("YYYY-DD-MM") ===
        moment(date).format("YYYY-DD-MM") &&
      item.timeOfDay === day &&
      item.cabId === cab
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
