const todoHandle = document.getElementById('todo');
const doingHandle = document.getElementById('doing');
const doneHandle = document.getElementById('done');
let data = JSON.parse(localStorage.getItem('data')) || [];

const renderItem = function(handler, itemname, index){
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `<li draggable="true" ondragstart="drag(event)" id="${index}">
                    ${itemname}
                </li>`;
    handler.appendChild(todoItem.firstChild);
};


const init = function () {
    data.forEach((todo,idx) =>{
        renderItem(document.getElementById(todo.state), todo.name, idx);
    });
};
init();

let transferID;
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    console.log("start dragging", e.target.id);
    transferID = e.target.id;
}

function drop(e) {
    e.preventDefault();
    let id = checkId(e.clientX);
    document.getElementById(id).appendChild(document.getElementById(transferID));
    data[transferID].state = id;
    save();
}


const checkId = function(x){
    if (x < todoHandle.getBoundingClientRect().right){
        return "todo";
    }else if(x < doingHandle.getBoundingClientRect().right){
        return "doing";
    }
    return "done";
};

const onSubmit = function(event){
    event.preventDefault();
    const value = document.getElementsByTagName('input')[0].value;
    console.log(value);
    if (value){
        addItem(value);
        renderItem(todoHandle, value, data.length);
        document.getElementsByTagName('input')[0].value = "";
    }
};
const addItem = function (name) {
    const newItem = {
        name: name,
        state: 'todo'
    }
    data.push(newItem);
    save();
};
const save = function () {
    localStorage.setItem('data', JSON.stringify(data));
}