import { useState } from "react";

function UserName(props) {
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    if (input === "") {
      alert("Please Enter Username");
    } else {
      setUserName(input);
      setInput("");
      localStorage.setItem("username", JSON.stringify(userName));
      props.submit();
    }
  }
  return (
    <div>
      <p className="title">Hello {userName}</p>
      <form className="username">
        <input
          className="inputname"
          onChange={handleChange}
          value={input}
          placeholder="Enter Username"
          type="text"
          name="username"
        />
        <button className="submit" onClick={handleClick}>
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
}
export default UserName;
