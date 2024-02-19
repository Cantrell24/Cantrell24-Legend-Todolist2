import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  let backendURL =
    "https://playground.4geeks.com/apis/fake/todos/user/cantrell24";

  const getTodos = () => {
    fetch(backendURL)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };

  const updateAPI = async (newTodos) => {
	console.log(newTodos)
    let opt = {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(newTodos)
    };
    let response = await fetch(backendURL, opt);
    if (!response.ok) {
      return false;
    } else {
      let data = await response.json();
      console.log(data);
      return true;
    }
  };

  const addTodo = async (e) => {
    if (e.key === "Enter") {
      let newTodos = todos.concat({ "done": false, "label": inputValue });
	  
      let result = await updateAPI(newTodos);
      if (result) {
        setInputValue("");
        getTodos();
      }
    }
  };

  const deleteTodo = async (index) => {
    let newTodos = todos.filter((item, currentIndex) => index != currentIndex);
	
    let result = await updateAPI(newTodos);
    if (result) {
      getTodos();
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <h1> todos </h1>
      <ul className="d-flex flex-column">
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => addTodo(e)}
            placeholder="What Needs To Be Done"
          ></input>
        </li>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              {todo.label}
              <i
                onClick={() => deleteTodo(index)}
                class="fa-solid fa-trash-can"
              ></i>
            </li>
          );
        })}

        <div> {todos.length} Items left</div>
      </ul>
    </div>
  );
};

export default Home;