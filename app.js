/**
 * Following Dev Ed tutorial - Beginner Vanilla Javascript Project Tutorial
 * https://www.youtube.com/watch?v=Ttf3CEsEwMQ&feature=emb_rel_end
 * 
 * FUTURE ENHANCEMENT - display completed items from local storage correctly.
 */

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

/**Event Listeners */
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);


function addTodo(event) {

    event.preventDefault();

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


// save new item to localStorage

saveLocalTodos(todoInput.value);

// clear the form input

todoInput.value = "";

}

function deleteCheck(event){
    console.log(event.target);

    const item = event.target;

    // detect the event when the remove button has been clicked.
    
    if (item.classList[0] === 'remove-button'){
        const todo = item.parentElement;
        removeTodoFromLocalStorage(todo);
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


    /** Save the todo list to local storage 
     * if we already have a to-do list stored,
     * just add the new item instead of rewriting the list.
    */

function saveLocalTodos (todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // get the existing list from localStorage.
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

/**Retrieve to-do list held in local storage when we 
 * restart our application
 */

 function getTodos () {
     let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    showSavedTodoList(todos);
    
 }

/**
 * 
 * Display the to-do list from local storage on the screen. 
 */
 function showSavedTodoList (todos) {
     todos.forEach( function(todo){


        const todoDiv = document.createElement('div');

                todoDiv.classList.add('todo');

                // create LI inside of the list

                const newTodo = document.createElement('li');

                // capture the value the user has typed into the input box.
                
                newTodo.innerText= todo;

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
     });
 }

 /**Remove an item from the todo list in local storage */

 function removeTodoFromLocalStorage(todo) {

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    console.log(todo);

    // need to retrieve the index of the element that is being deleted.
    // then save the revised to-do list to local storage.
    // NOTE:  todo is the DIV of the item we are removing.

    const todoIndex = todo.children[0].innerText;

    console.log('Remove Item at index ', todos.indexOf(todoIndex));

    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));


 }

