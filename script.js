const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        saveCompletedTodos(todo);
    }
}

/*function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}*/

function filterTodo(e) {
    const todos = todoList.childNodes;
    for (let i = 0; i < todos.length; i++) {
        if (e.target.value === "all") {
            todos[i].style.display = 'flex';
        } else if (e.target.value === "completed") {
            if (todos[i].classList.contains('completed')) {
                todos[i].style.display = 'flex';
            } else {
                todos[i].style.display = 'none';
            }
        } else if (e.target.value === "uncompleted") {
            if (todos[i].classList.contains('completed')) {
                todos[i].style.display = 'none';
            } else {
                todos[i].style.display = 'flex';
            }
        }
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveCompletedTodos(todo) {
    //console.log(todo.children[0]);
    let todosCompleted;
    if (localStorage.getItem('todosCompleted') === null) {
        todosCompleted = [];
    } else {
        todosCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
    }

    const todoText = todo.children[0].innerText;
    todosCompleted.push(todoText);
    localStorage.setItem("todosCompleted", JSON.stringify(todosCompleted));
}

// function getCompletedTodos() {
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }

//     let todosCompleted;
//     if (localStorage.getItem('todosCompleted') === null) {
//         todosCompleted = [];
//     } else {
//         todosCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
//     }

//     todos.forEach(todosCompleted.forEach(function () {
//         if (todos === todosCompleted) {

//         }
//     }))
// }