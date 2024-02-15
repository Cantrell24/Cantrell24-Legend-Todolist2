import React, { useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	let backendURL = "https://playground.4geeks.com/apis/fake/todos/user/cantrell24"
	const getTodos = () => {
		fetch(backendURL)
		.then(response => response.json())
		.then(data => setTodos(data))
		.catch(error => console.log(error))
	}
	const updateAPI = (newTodos) => {
		let opt = {
			method: "PUT",
			"Content-Type": "application/json",
			body: JSON.stringify(newTodos)
		}
		fetch(backendURL, opt)
		.then(response => response.json())
		.then (data => {
			console.log(data)
			getTodos()
		})
		.catch(error => console.log(error))
	}
	useEffect(() => {
		getTodos()
	}, [])

	return (
		
		<div className="container">
			<h1> todos </h1>
			<ul className ="d-flex flex-column">
				<li>
					<input
						type = "text"
						onChange = {(e)=> setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
							  updateAPI([...todos, {label:inputValue, done:false}]);
							  setInputValue("");
							}
						  }}
						// onKeyDown ={(e) => e.key == "Enter" ? setTodos([
						// 	...todos, inputValue
						// ]) : null}
						placeholder="What Needs To Be Done"></input>
						
				</li>
				{todos.map((todo,index)=>{
					return <li key= {index}>{todo.label}<i onClick={() =>
						updateAPI(
							todos.filter(
								(t, currentIndex) =>
									index != currentIndex
							)
						)
				}class="fa-solid fa-trash-can"></i></li>
				})}
				{/* <li>Make the bed <i class="fa-thin fa-trash-can float-right"></i></li>
				<li>Walk the dog <i class="fa-solid fa-trash-can float-right"></i></li>
				<li>Pay taxes<i class="fa-solid fa-trash-can"></i></li>
				<li>Pick the kids up<i class="fa-solid fa-trash-can"></i></li> */}
				<div> {todos.length} Items left</div>
			</ul>
		</div>
	);
};

export default Home;
