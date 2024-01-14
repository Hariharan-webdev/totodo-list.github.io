// let inputBx = document.getElementById("inputBx");
// let list = document.getElementById("list");

// inputBx.addEventListener("keyup", function(event){
//     if(event.key == "Enter") {
//         addItem(this.value)
//         this.value = ""
//     }
// });

// let addItem = (inputBx) => {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `${inputBx}<i></i>`;

//     listItem.addEventListener("click", function(){
//         this.classList.toggle("done");
//     });

//     listItem.querySelector("i").addEventListener("click", function(){
//         listItem.remove();
//     });

//     list.appendChild(listItem);
// }

// ----------------------------------------------------------------------------------------------------------------

let inputBx = document.getElementById("inputBx");
let list = document.getElementById("list");

// Load items from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    loadItems();
});

inputBx.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        addItem(this.value);
        this.value = "";
    }
});

let addItem = (task) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${task}<i></i>`;

    listItem.addEventListener("click", function () {
        this.classList.toggle("done");
        saveItems();
    });

    listItem.querySelector("i").addEventListener("click", function () {
        listItem.remove();
        saveItems();
    });

    list.appendChild(listItem);
    saveItems();
};

let saveItems = () => {
    // Get all task items and save them to local storage
    let tasks = Array.from(list.children).map((item) => ({
        task: item.innerText.replace("i", ""),
        done: item.classList.contains("done"),
    }));

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

let loadItems = () => {
    // Retrieve tasks from local storage and populate the list
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        savedTasks = JSON.parse(savedTasks);

        savedTasks.forEach((task) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `${task.task}<i></i>`;

            if (task.done) {
                listItem.classList.add("done");
            }

            listItem.addEventListener("click", function () {
                this.classList.toggle("done");
                saveItems();
            });

            listItem.querySelector("i").addEventListener("click", function () {
                listItem.remove();
                saveItems();
            });

            list.appendChild(listItem);
        });
    }
};
