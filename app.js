const date = document.querySelector("#date");
const input = document.querySelector("#input");
const list = document.querySelector("#list-tasks");
const enter = document.querySelector("#enter");
const check = "fa-circle-check";
const unCheck = "fa-circle";
const ligthText = "ligth--text";
let id;
let LIST;

//create date
const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString("es-PE", {
    weekday: "long",
    month: "short",
    day: "numeric",
});

//function add task
function addTask(task, id, completed, deleted) {
    if (deleted) {
        return;
    }

    const COMPLETED = completed ? check : unCheck;
    const LINE = completed ? ligthText : "";

    const element = ` <li>  <i class="fa-solid ${COMPLETED}" data="task-completed" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fa-solid fa-trash-can" data="deleted" id="${id}"></i>
                    </li> `;
    list.insertAdjacentHTML("beforeend", element);
}

//funtion task done
function taskDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector(".text").classList.toggle(ligthText);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}
//funtion task deleted
function taskDeleted(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

enter.addEventListener("click", (e) => {
    const task = input.value;
    if (task) {
        addTask(task, id, false, false);
        LIST.push({
            nombre: task,
            id,
            realizado: false,
            eleminado: false,
        });
        id++;
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const task = input.value;
        if (task) {
            addTask(task, id, false, false);
            LIST.push({
                nombre: task,
                id,
                realizado: false,
                eleminado: false,
            });
            id++;
        }
        localStorage.setItem("TODO", JSON.stringify(LIST));
        input.value = "";
    }
});

list.addEventListener("click", (e) => {
    const element = e.target;
    const elementData = element.attributes.data.value;

    if (elementData === "task-completed") {
        taskDone(element);
    } else if (elementData === "deleted") {
        taskDeleted(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    id= 0
}

function loadList(DATA){
    DATA.forEach(i => {
        addTask(i.nombre, i.id, i.realizado, i.eliminado)
    });
}