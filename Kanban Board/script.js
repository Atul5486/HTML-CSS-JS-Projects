let tasksData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done]
let dragElement = null

// console.log(todo, progress, done);

function addTask(title, desc, column) {
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div)

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    })
    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
    // console.log(JSON.stringify(tasksData, null, 2));

}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {

            addTask(task.title, task.desc, column);
        })

    }
    updateTaskCount();

}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})

function addDragEventOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateTaskCount();



    })


}
addDragEventOnColumn(todo)
addDragEventOnColumn(progress)
addDragEventOnColumn(done)


//modal

const toggleModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".bg")
console.log(modalBg)
const modal = document.querySelector(".modal")
const addTaskButton = document.querySelector("#add-new-task")


toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active")

})
let taskdiv = document.querySelector(".taskdiv");
taskdiv.addEventListener("click", (e) => {
    e.stopPropagation();
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")

})


//addtask button

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    addTask(taskTitle, taskDesc, todo);
    updateTaskCount();

      if(!taskTitle.value.trim()) return;
      //clear form fields
      taskTitle.value="";
      taskDesc.value="";
      
    modal.classList.remove("active");
});