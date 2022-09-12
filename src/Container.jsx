import UserName from "./UserName";
import List from "./List";
import InputArea from "./InputArea";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";

export default function Container() {
  const [items, setItems] = useState([]);
  const { theme } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editable, setEditable] = useState({});
  const url = `https://6319ce4a8e51a64d2becda22.mockapi.io/todos`;

  function onSubmit() {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setItems(result);
        handleChecked(result);
      });
  }
  function add(input) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        content: `${input.content}`
      })
    })
      .then((response) => response.json())
      .then(() => onSubmit());
  }

  function handleChecked(arr) {
    const doneArr = arr.filter((item) => {
      return item.isCompleted === true;
    });
    const checkedItemsId = doneArr.map((item) => {
      return item.id;
    });

    return checkedItemsId;
  }

  function deleteItem(id) {
    fetch(`https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
    const newItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newItems);
  }
  function edit(id) {
    setIsEditing(true);
    fetch(`https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${id}`)
      .then((response) => response.json())
      .then((data) => setEditable(data));
  }

  function handleEdit(e) {
    setEditable((preV) => {
      return { ...preV, content: e.target.value };
    });
  }

  function handleEditSubmit() {
    items[items.findIndex((item) => item.id === editable.id)] = editable;
    fetch(`https://6319ce4a8e51a64d2becda22.mockapi.io/todos/${editable.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        content: editable.content,
        id: editable.id
      })
    }).then((response) => response.json());
    setIsEditing(false);
    setEditable({});
    setItems((prevObj) => {
      return [...prevObj];
    });
  }

  return (
    <>
      <div className={`${theme}`}>
        <UserName submit={onSubmit} />
        {isEditing ? (
          <>
            <h1 className="todotitle">ToDo-List</h1>
            <div className="edit">
              <input
                className="editinput"
                name="content"
                value={editable.content}
                onChange={handleEdit}
              />
              <button className="editbutton" onClick={handleEditSubmit}>
                <span>Update</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <InputArea onAdd={add} />
          </>
        )}
        <div>
          <ul>
            <>
              {items.map((item, index) => (
                <List
                  content={item.content}
                  id={item.id}
                  key={item.id}
                  onDelete={deleteItem}
                  onEdit={edit}
                  isCheckedItems={handleChecked}
                  result={items}
                />
              ))}
            </>
          </ul>
        </div>
      </div>
    </>
  );
}
