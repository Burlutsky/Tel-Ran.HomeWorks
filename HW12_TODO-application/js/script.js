const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('.todo-add-btn');
const addText = document.querySelector('.todo-add-text');
addButton.addEventListener('click', () => {
    const text = addText.value;
    if (text !== '') {
        todoList.append(createNewTODOItem(text));
    }
})

const createNewTODOItem = (text) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    const todoItemText = document.createElement('div');
    todoItemText.classList.add('todo-item-text');
    const checkboxLabel = document.createElement('label');
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.addEventListener('change', () => {
        if (checkboxInput.checked) {
            todoItemText.classList.add('checked');
        } else {
            todoItemText.classList.remove('checked');
        }
    })
    checkboxLabel.append(checkboxInput);
    const todoSpan = document.createElement('span');
    todoSpan.textContent = ' ' + text + ' ';
    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    todoDeleteButton.classList.add('todo-item-remove');
    todoDeleteButton.addEventListener('click', () => {
        todoItem.remove();
    })
    todoItemText.append(checkboxLabel, todoSpan, todoDeleteButton);
    todoItem.append(todoItemText);
    return todoItem;
}