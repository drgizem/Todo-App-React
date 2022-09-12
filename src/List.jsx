import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function List(props) {
  const [getClicked, setGetCliked] = useState(
    props.isCheckedItems(props.result).includes(props.id)
  );

  function handleClick() {
    checked(props.id);
    if (getClicked) {
      setGetCliked(false);
    } else {
      setGetCliked(true);
    }
  }

  function checked(id) {
    fetch(`https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.isCompleted
          ? fetch(
              `https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${data.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify({
                  isCompleted: false
                })
              }
            ).then((response) => response.json())
          : fetch(
              `https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${data.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify({
                  isCompleted: true
                })
              }
            ).then((response) => response.json());
      });
  }

  return (
    <div className="list">
      <li
        className="todo"
        onClick={handleClick}
        style={getClicked ? { textDecoration: "line-through" } : null}
      >
        {props.content}
      </li>
      <div className="buttons">
        <DeleteIcon onClick={() => props.onDelete(props.id)} />
        <EditIcon onClick={() => props.onEdit(props.id)} />
      </div>
    </div>
  );
}
export default List;
