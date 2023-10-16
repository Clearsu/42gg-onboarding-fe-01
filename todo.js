document.addEventListener('DOMContentLoaded', () => {
  const savedTodoList = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodoList.forEach((todo) => {
    renderTodoItem(todo.text, todo.isChecked);
  });
});

function renderTodoItem(text, isChecked = false) {
  const newTodoItem = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'todo-checkbox';
  checkBox.isChecked = isChecked;
  newTodoItem.appendChild(checkBox);
  newTodoItem.appendChild(document.createTextNode(text));

  const buttonGroupDiv = document.createElement('div');
  buttonGroupDiv.className = 'modify-button-group';
  buttonGroupDiv.appendChild(createModifyButton('수정'));
  buttonGroupDiv.appendChild(createModifyButton('삭제'));
  newTodoItem.appendChild(buttonGroupDiv);

  document.getElementById('todo-list').appendChild(newTodoItem);
}

function createModifyButton(buttonText) {
  const button = document.createElement('button');
  button.className = 'modify-button';
  button.textContent = buttonText;
  return button;
}

function todoSubmitHandler(event) {
  event.preventDefault();	

  const inputValue = document.getElementById('todo-input').value;

  if (inputValue.trim()) {
    renderTodoItem(inputValue);
    document.getElementById('todo-input').value = '';
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach((item) => {
    const text = item.childNodes[1].nodeValue;
    const isChecked = item.childNodes[0].checked;
    todos.push({ text, isChecked });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleTodoItemStyling(listItem, isChecked) {
  listItem.style.textDecoration = isChecked ? 'line-through' : 'none';
  listItem.style.color = isChecked ? 'grey' : 'black';
}

function changeButtonGroupText(buttonGroup, text1, text2) {
  buttonGroup.childNodes[0].textContent = text1;
  buttonGroup.childNodes[1].textContent = text2;
}

function deleteTodoItem(listItem) {
  listItem.remove();
  updateLocalStorage();
}

function beginEditingTodoItem(listItem) {
  const textNode = listItem.childNodes[1];
  const input = document.createElement('input');
  input.type = 'text';
  input.value = textNode.textContent;
  input.setAttribute('data-original', textNode.textContent);
  listItem.replaceChild(input, textNode);
  input.focus();
}

function cancelEditingTodoItem(listItem) {
  const input = listItem.childNodes[1];
  const originalText = input.getAttribute('data-original');
  const originalTextNode = document.createTextNode(originalText);
  listItem.replaceChild(originalTextNode, input);
}

function completeEditingTodoItem(listItem) {
  const input = listItem.childNodes[1];
  const newTextNode = document.createTextNode(input.value);
  listItem.replaceChild(newTextNode, input);
  updateLocalStorage();
}

function todoItemHandler(event) {
  let listItem;
  const target = event.target;

  if (target.className === 'todo-checkbox') {
    listItem = target.parentElement;
    toggleTodoItemStyling(listItem, target.checked);
  } else if (target.className === 'modify-button') {
    const textContent = target.textContent;
    const buttonGroupDiv = target.parentElement;
    listItem = buttonGroupDiv.parentElement;

    if (textContent === '삭제') {
      deleteTodoItem(listItem);
    } else if (textContent === '수정') {
      changeButtonGroupText(buttonGroupDiv, '취소', '완료');
      beginEditingTodoItem(listItem);
    } else if (textContent === '취소') {
      changeButtonGroupText(buttonGroupDiv, '수정', '삭제');
      cancelEditingTodoItem(listItem);
    } else if (textContent === '완료') {
      changeButtonGroupText(buttonGroupDiv, '수정', '삭제');
      completeEditingTodoItem(listItem);
    }
  }
}

document.getElementById('todo-form').addEventListener('submit', todoSubmitHandler);
document.getElementById('todo-list').addEventListener('change', todoItemHandler);
document.getElementById('todo-list').addEventListener('click', todoItemHandler);