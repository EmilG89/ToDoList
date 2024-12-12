//localStorage.clear();

// Save relevant elements to variables
const form = document.getElementById("form");
const inputTask = document.getElementById("inputTask");
const addButton = document.getElementById("add");
const taskList = document.getElementById("taskList");

// Convert local storage string from task key to JS object.
const taskStorage = JSON.parse(localStorage.getItem("tasks"));

// Check if there was data in local storage, if was, loop through
// each item and with each item call fundtion that creates html
// element that holds local storage data.
if (taskStorage) {
    taskStorage.forEach((task) => addTask(task));
}

// Listen to Enter key beeing pressed, if it is, function is called that
// creates html element with input field data is created
document.body.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.code == 'Enter') {
        addTask();
    }
});

// Listen to mouse key beeing pressed on add button element, if it 
// is, function is called that creates html element with input field data is created
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addTask();
});

// This function is called when page is refreshed by localstorage forEach 
// iterator with js object as argument, that contain task text and status if it is 
// completed, Enter key being pressed or mouse click on add button.
function addTask(task) {

    // Save task text from input field to variable. Here data will be displayed only
    // if function is called from event listeners - enter or mouse click
    let taskText = inputTask.value;

    // If add function has parameter data, then objects text property data is saved
    // to variable with task text
    if(task) {
        taskText = task.text;
    }

    // If there is task data in local storage or task text is added from input
    // field then html li element with text data is created.
    if (taskText) {
        // Create elements necessary to display tasks inside html ul element
        const itemElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const buttonDelete = document.createElement('button');
        const buttonUpdate = document.createElement('button');

        // Add class name to the span element that will be used when searched for
        // element with task text. Also add text from input fieeld or localstora
        // to the innerhtml of span element.
        spanElement.className = 'taskText';
        spanElement.innerText = taskText;

        // Check if task in localstorage is completed, add a class name to li and 
        // span elements that will be used for styling elemement when browser restarts
        if (task && task.completed) {
            itemElement.classList.add('completed');
            spanElement.classList.add('completed');
        }

        // Span elemement that holds task text and completed status is added li element.
        itemElement.appendChild(spanElement);

        // Add text, class name and click event listener for delete button element and
        // add Delete button inside li element. Inside delete button evenet listener remove
        // li element and update localstorage.
        buttonDelete.innerHTML = 'Delete';
        buttonDelete.className = 'delete';
        buttonDelete.addEventListener('click', () => {
            itemElement.remove();
            updateLocalStorage();
        });
        itemElement.append(buttonDelete);

        // Add text, class name and click event listener for done button element and
        // add done button inside li element. Inside done button evenet listener toggle
        // if completed class name is added or removed from li and span elements classlist,
        // after, update localstorage.
        buttonUpdate.innerHTML = 'Done';
        buttonUpdate.className = 'done';
        buttonUpdate.addEventListener('click', () => {
            itemElement.classList.toggle('completed');
            spanElement.classList.toggle('completed');
            updateLocalStorage();
        });
        itemElement.append(buttonUpdate);

        // Add li element with span and update and delete buttons in it, 
        // to the ul element
        taskList.append(itemElement);

        // clear input field and call a function that will update localstorage
        inputTask.value = '';
        updateLocalStorage();
    }
}

// Update localstorage
function updateLocalStorage(){
    // Find all html element with element class name that hold task text and
    // completed status in class list and create an array that holds them
    const tasks = document.querySelectorAll('.taskText');
    const taskList = [];

    // Loop throug array that holds elements with task text and class list.
    tasks.forEach((element) => {
        // Create object that hold task text and true/false if completed class is
        // in elements class list.
        taskList.push({
            text: element.innerText,
            completed: element.classList.contains('completed')
        });
    });
    // Add array of object to localstorage
    localStorage.setItem('tasks', JSON.stringify(taskList));
}