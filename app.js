const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

/**Event Listeners */

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);


function addTodo(event) {

    event.preventDefault();
    // console.log('Hello From Add function');

    // create a to-do div 

    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');

    // create LI inside of the list

    const newTodo = document.createElement('li');

    // capture the value the user has typed into the input box.
    
    newTodo.innerText= todoInput.value;

    newTodo.classList.add('todo-item');

// append the newTodo as a child to the todoDiv

todoDiv.appendChild(newTodo);

// adding status update buttons

const completedButton = document.createElement('button');

completedButton.innerHTML= '<i class="fas fa-check"> </i>';

completedButton.classList.add('complete-button');

todoDiv.appendChild(completedButton);

const removeButton = document.createElement('button');

removeButton.innerHTML= '<i class="fas fa-trash"> </i>';

removeButton.classList.add('remove-button');

todoDiv.appendChild(removeButton);


// add this to the list

todoList.appendChild(todoDiv);

// clear the form input

todoInput.value = "";

}

function deleteCheck(event){
    console.log(event.target);

    const item = event.target;

    // detect the event when the remove button has been clicked.
    
    if (item.classList[0] === 'remove-button'){
        const todo = item.parentElement;
        todo.remove();
    }

    // detect event when the complete button has been clicked.

    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodos(event) {
    // const todos = todoList.childNodes;
    // the above returns a non-element node that causes the following code to barf

    // using children instead

    const todos = todoList.children;
    // this also means I cannot use forEach to iterate through
    // the items.

    console.log(todos);

    // todos.forEach(function(todo){
        for (let i=0; i< todos.length; i++){

        let todo = todos[i];
        console.log('the current todo: ', todo);
        console.log('current event', event.target.value);
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "complete":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incomplete":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
        
    }


}

