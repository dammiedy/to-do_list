let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newToDo;
let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    loadToDoList(); 
}

const prepareDOMElements = () => {
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');
    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', (e) => e.key === 'Enter' && addNewToDo);
}

const addNewToDo = () => {
    if (toDoInput.value !== '') {
        createToDoItem(toDoInput.value);
        saveToDoList(); 
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Ay, tinamad na siya mag to-do :(';
    }
}

const createToDoItem = (text) => {
    newToDo = document.createElement('li');
    newToDo.textContent = text;
    createToolArea();
    ulList.appendChild(newToDo);
}

const createToolArea = () => {
    const div = document.createElement('div');
    div.classList.add('tools');
    newToDo.appendChild(div);

    const buttons = [
        { class: 'complete', html: '<i class="fas fa-check"></i>' },
        { class: 'edit', text: 'EDIT' },
        { class: 'delete', html: '<i class="fas fa-times"></i>' }
    ];

    buttons.forEach(button => {
        const newButton = document.createElement('button');
        newButton.classList.add(button.class);
        button.html ? (newButton.innerHTML = button.html) : (newButton.textContent = button.text);
        div.appendChild(newButton);
    });
}

const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        toggleCompleted(e.target.closest('li'));
    } else if (e.target.matches('.edit')) {
        editToDo(e);
    } else if (e.target.matches('.delete')) {
        deleteToDo(e);
    }
}

const toggleCompleted = (todoItem) => {
    todoItem.classList.toggle('completed');
    saveToDoList();
}

const editToDo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const changeTodoText = () => {
    const newText = popupInput.value.trim();
    if (newText !== '') {
        todoToEdit.firstChild.textContent = newText;
        closePopup();
        saveToDoList(); 
    } else {
        popupInfo.textContent = 'There\'s something wrong! Say arf arf :(';
    }
}

const deleteToDo = (e) => {
    const todoItem = e.target.closest('li');
    todoItem.remove();
    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length === 0) {
        errorInfo.textContent = 'You have nothing to-do on your list. Add some!';
    }
    saveToDoList(); 
}

const saveToDoList = () => {
    localStorage.setItem('toDoList', ulList.innerHTML);
}

const loadToDoList = () => {
    const savedList = localStorage.getItem('toDoList');
    if (savedList) {
        ulList.innerHTML = savedList;
    }
}

document.addEventListener('DOMContentLoaded', main);
