import { useState } from "react";

function InputArea(props) {
  const [input, setInput] = useState({
    content: "",
    id: "",
    isCompleted: false
  });
  function onChange(event) {
    setInput((preV) => {
      return { ...preV, content: event.target.value };
    });
  }

  function onClick(e) {
    props.onAdd(input);
    e.preventDefault();
    setInput({
      content: "",
      id: "",
      isCompleted: false
    });
  }
  return (
    <>
      <h1 className="todotitle">ToDo-List</h1>
      <form className="inputArea">
        <input
          className="todoinput"
          id={input.id}
          onChange={onChange}
          value={input.content}
          type="text"
          placeholder="Create your list!"
          name="input"
        />
        <button className="todobutton" onClick={onClick}>
          <span>Add</span>
        </button>
      </form>
    </>
  );
}
export default InputArea;
