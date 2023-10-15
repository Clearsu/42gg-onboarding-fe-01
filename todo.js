function todoSubmitHandler (event) {
	event.preventDefault();	

	const inputValue = document.getElementById('todo-input').value;

	if (inputValue.trim()) {
		const newTodoItem = document.createElement('li');

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'todo-checkbox';
		newTodoItem.appendChild(checkbox);
		newTodoItem.appendChild(document.createTextNode(inputValue));

		const buttonGroupDiv = document.createElement('div');
		buttonGroupDiv.className = 'modify-button-group';

		const editButton = document.createElement('button');
		editButton.className = 'modify-button';
		editButton.textContent = '수정';
		buttonGroupDiv.appendChild(editButton);

		const deleteButton = document.createElement('button');
		deleteButton.className = 'modify-button';
		deleteButton.textContent = '삭제';
		buttonGroupDiv.appendChild(deleteButton);

		newTodoItem.appendChild(buttonGroupDiv);

		document.getElementById('todo-list').appendChild(newTodoItem);
		document.getElementById('todo-input').value = '';
	}
}

let tempTextValue;

function todoItemHandler (event) {
	if (event.target.className === 'todo-checkbox') {
        const listItem = event.target.parentElement;
        if (event.target.checked) {
            listItem.style.textDecoration = 'line-through';
			listItem.style.color = 'grey';
        } else {
            listItem.style.textDecoration = 'none';
			listItem.style.color = 'black';
        }
    } else if (event.target.className === 'modify-button') {
		const listItem = event.target.parentElement.parentElement;
		if (event.target.textContent === '삭제') {
			listItem.remove();
		} else if (event.target.textContent === '수정') {
			event.target.textContent = '취소';
			event.target.parentElement.childNodes[1].textContent = '완료';
			const textNode = listItem.childNodes[1];
			const input = document.createElement('input');
			input.type = 'text';
			input.value = textNode.textContent;
			tempTextValue = textNode.textContent;
			listItem.replaceChild(input, textNode);
			input.focus();
		} else if (event.target.textContent === '취소') {
			event.target.textContent = '수정';
			event.target.parentElement.childNodes[1].textContent = '삭제';
			const originalTextNode = document.createTextNode(tempTextValue);
			listItem.replaceChild(originalTextNode, listItem.childNodes[1]);
		} else if (event.target.textContent === '완료') {
			event.target.parentElement.childNodes[0].textContent = '수정';
			event.target.textContent = '삭제';
			const newTextNode = document.createTextNode(listItem.childNodes[1].value);
			listItem.replaceChild(newTextNode, listItem.childNodes[1]);
		}
	}
}

document.getElementById('todo-form').addEventListener('submit', todoSubmitHandler);
document.getElementById('todo-list').addEventListener('change', todoItemHandler);
document.getElementById('todo-list').addEventListener('click', todoItemHandler);