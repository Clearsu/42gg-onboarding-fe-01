function addTodo (event) {
	event.preventDefault();	

	const inputValue = document.getElementById('todo-input').value;

	if (inputValue.trim()) {
		const newTodoItem = document.createElement('li');
		newTodoItem.textContent = inputValue;
		document.getElementById('todo-list').appendChild(newTodoItem);
		document.getElementById('todo-input').value = '';
	}
}

document.getElementById('todo-form').addEventListener('submit', addTodo);