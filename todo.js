function addTodo (event) {
	event.preventDefault();	

	const inputValue = document.getElementById('todo-input').value;

	if (inputValue.trim()) {
		const newTodoItem = document.createElement('li');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'todo-checkbox';
		newTodoItem.appendChild(checkbox);
		newTodoItem.appendChild(document.createTextNode(inputValue));
		document.getElementById('todo-list').appendChild(newTodoItem);
		document.getElementById('todo-input').value = '';
	}
}

function checkTodo (event) {
	if (event.target.className === 'todo-checkbox') {
        const listItem = event.target.parentElement;
        if (event.target.checked) {
            listItem.style.textDecoration = 'line-through';
			listItem.style.color = 'grey';
        } else {
            listItem.style.textDecoration = 'none';
			listItem.style.color = 'black';
        }
    }
}

document.getElementById('todo-form').addEventListener('submit', addTodo);
document.getElementById('todo-list').addEventListener('change', checkTodo);