let idFinal = /.*(\d)/g;
let current_value = "none"
let move_counter = "0"
let origin_tower = "1"

function apliRegex(valor, regex) {
    if (/^disk/.test(valor)) {
        valor = document.getElementById(valor).parentNode.id
    } else if (/^torre/.test(valor)) {} else {
        return;
    }
    regex.lastIndex = 0
    regex = regex.exec(valor)
    return regex[1]
}

function setChoice(tower) {
    unsetChoice();
    var d = document.getElementById(tower);
    d.className += " choice";
    current_value = getFirstDisk(tower);
}

function unsetChoice() {
    console.log(current_value.clientWidth);
    var a = document.getElementById("torre1");
    var b = document.getElementById("torre2");
    var c = document.getElementById("torre3");
    a.className = "torre";
    b.className = "torre";
    c.className = "torre";
}

function elementCount(tower) {
    tower = document.getElementById(tower);
    return tower.childElementCount;
}

function getFirstDisk(tower) {
    tower = document.getElementById(tower);
    disk = tower.lastElementChild;
    return disk;
}

function addDisk(tower) {
    tower = document.getElementById(tower);
    tower.appendChild(current_value);
    current_value = "none";
    incrementCount();
    progressTest();
}

function incrementCount() {
    count.innerText = "Moves: " + move_counter
    document.body.appendChild(count)
}

function progressTest() {
    if (elementCount("torre1") > 4 && origin_tower != 1) {
        alert('Parabéns! Você concluiu o desafio!\nSeu número de jogadas foi ' + move_counter)
        origin_tower = 1
    }
    if (elementCount("torre2") > 4 && origin_tower != 2) {
        alert('Parabéns! Você concluiu o desafio!\nSeu número de jogadas foi ' + move_counter)
        origin_tower = 2
    }
    if (elementCount("torre3") > 4 && origin_tower != 3) {
        alert('Parabéns! Você concluiu o desafio!\nSeu número de jogadas foi ' + move_counter)
        origin_tower = 3
    }
}

let button = document.createElement('button');
button.id = "set0"
button.innerText = "Reset"
let count = document.createElement('div');
count.id = "count"
let container = document.createElement('div')
container.id = "container"
let towera = document.createElement('div')
towera.id = "torre1"
towera.className = "torre"
let diska = document.createElement('div')
diska.id = "diska"
let diskb = document.createElement('div')
diskb.id = "diskb"
let diskc = document.createElement('div')
diskc.id = "diskc"
let diskd = document.createElement('div')
diskd.id = "diskd"
let diske = document.createElement('div')
diske.id = "diske"
let towerb = document.createElement('div')
towerb.id = "torre2"
towerb.className = "torre"
let towerc = document.createElement('div')
towerc.id = "torre3"
towerc.className = "torre"

window.onload = () => {
    towera.appendChild(diske)
    towera.appendChild(diskd)
    towera.appendChild(diskc)
    towera.appendChild(diskb)
    towera.appendChild(diska)
    container.appendChild(towera)
    container.appendChild(towerb)
    container.appendChild(towerc)
    document.body.appendChild(count)
    document.body.appendChild(container)
    document.body.appendChild(button)
};

window.onclick = e => {
    selecttower = apliRegex(e.target.id, idFinal)
    if (selecttower == 0) {
        document.location.reload(true);
    }
    if (selecttower > 0 && selecttower < 4) {
        towerid = "torre" + selecttower
        if (current_value == "none") {
            if (elementCount(towerid) == 0) {
                alert("torre vazia!");
            } else {
                setChoice(towerid);
            }
        } else {
            if (elementCount(towerid) == 0) {
                move_counter++;
                addDisk(towerid);
                unsetChoice();
            } else if (getFirstDisk(towerid).clientWidth > current_value.clientWidth) {
                move_counter++;
                addDisk(towerid);
                unsetChoice();
            } else if (getFirstDisk(towerid).clientWidth == current_value.clientWidth) {
                current_value = "none"
                unsetChoice();
            } else {
                alert("Você não pode adicionar uma rosquina maior sobre uma menor!");
            }
        }
    }
}