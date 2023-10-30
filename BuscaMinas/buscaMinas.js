var tablero = new Array(8);
var tableroVisibility = new Array(8);
let points = 0;
let pointsElem = document.getElementById("points");
let faceImg = document.getElementById("face");
let state = document.getElementById("flags");
state.textContent = "playing";
pointsElem.textContent = points;
let canPlay = true;
//creamos el tablero
for (var i = 0; i < tablero.length; i++) {
    tablero[i] = [0, 0, 0, 0, 0, 0, 0, 0];
    tableroVisibility[i] = [false, false, false, false, false, false, false, false];
}

function putMines() {
    let countMines = 0; // Contador de minas
    let maxMinesPerRow = 3; // Máximo 3 minas por fila

    while (countMines < 10) {
        let i = Math.floor(Math.random() * tablero.length);
        let j = Math.floor(Math.random() * tablero[i].length);

        // Verifica si la celda está vacía y si la fila actual no tiene ya 3 minas
        if (tablero[i][j] !== 'X' && tablero[i].filter(cell => cell === 'X').length < maxMinesPerRow) {
            tablero[i][j] = 'X';
            countMines++;
        }
    }

    // console.log(tablero);
}


function putManualMines() {
    tablero[5][4] = "X";
    tablero[5][2] = "X";
    tablero[5][3] = "X";
    tablero[3][4] = "X";
    tablero[3][2] = "X";
    tablero[3][3] = "X";
    tablero[4][4] = "X";
    tablero[4][2] = "X";
}

function checkAroundMines() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] != 'X') {
                let count = 0;
                for (let f = i - 1; f <= i + 1; f++) {
                    for (let c = j - 1; c <= j + 1; c++) {
                        if (f == i && c == j) { // do not re-search current cell
                            continue
                        } else if (f < 0 || f > tablero.length - 1 || c < 0 || c > tablero.length - 1) { // if out of bounds
                            continue
                        } else { // we show and then if that cell is 0, call recursively
                            if (tablero[f][c] == 'X') count++;

                        }

                    }
                }
                if (count == 6) console.log("HAY 6")
                tablero[i][j] = count;
                let color;
                switch (count) {
                    case 1: color = "blue";
                        break;
                    case 2: color = "green";
                        break;
                    case 3: color = "red";
                        break;
                    case 4: color = "darkblue";
                        break;
                    case 5: color = "darkred";
                        break;
                    case 6: color = "#5F9EA0";
                        break;
                    case 7: color = "black";
                        break;
                    case 8: color = "grey";
                        break;

                }
                tableroCeldas[i][j].style.fontSize = "large"
                tableroCeldas[i][j].style.fontWeight = "990";
                tableroCeldas[i][j].style.color = color;
            }

        }

    }


    //return count;
}


const tableroCeldas = []; // Array para almacenar las celdas del tablero

function createTableroDiv() {
    let tableroDiv = document.getElementById("tablero");

    for (var i = 0; i < tablero.length; i++) {
        tableroCeldas[i] = []; // Crea un array 1D para cada fila del tablero
        for (var j = 0; j < tablero[i].length; j++) {

            let celda = document.createElement("div");
            celda.className = 'cell';
            if (canPlay)
                celda.addEventListener("mousedown", () => {
                    if (canPlay)
                        faceImg.innerHTML = "<img class='mine' style='height:100%;width:100%;' src='scared.png'>";
                });
            celda.addEventListener("mouseup", () => {
                if (canPlay)
                    faceImg.innerHTML = "<img class='mine' src='smile.png'>";
            });
            // Utiliza una función de cierre para capturar i y j
            (function (fila, columna) {
                celda.addEventListener("click", () => {
                    if (canPlay)
                        checkTurn(fila, columna);
                });
            })(i, j);

            tableroDiv.appendChild(celda);
            tableroCeldas[i][j] = celda; // Almacena la referencia a la celda en el array
        }
    }
}


function checkTurn(fila, columna) {
    //Si el usuario clica en una mina
    if (canPlay) {

        if (tablero[fila][columna] == 'X') {
            let cells = document.getElementById("tablero").children;

            for (let i = 0; i < cells.length; i++) {
                let cell = cells[i];
                let x = Math.floor(i / 8);
                let y = i % 8;

                if (tablero[x][y] == 0) {
                    cell.textContent = ' ';
                } else if (tablero[x][y] == 'X') {
                    canPlay = false;
                    tableroCeldas[x][y].innerHTML = "<img class='mine' src='bomb.png'>";
                    faceImg.innerHTML = "<img class='mine' src='dead.jpg'>";
                    state.textContent = "loser";
                } else {
                    cell.textContent = tablero[x][y];
                }

                if (tablero[x][y] == 'X') {
                    animationLost(x, y);
                }
            }
        } else {
            checkBubble(fila, columna)

        }
    }
}

Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};

function checkBubble(x, y) {

    if (!tableroVisibility[x][y]) {
        tableroVisibility[x][y] = true

        // when clicking an unshown cell we have to do the following tasks
        // 1. if 0, 'clearSpace'
        tableroCeldas[x][y].style.backgroundColor = "rgb(255,255,255)";
        if (tablero[x][y] == 0) {

            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i == x && j == y) { // do not re-search current cell
                        continue
                    } else if (i < 0 || i > tablero.length - 1 || j < 0 || j > tablero.length - 1) { // if out of bounds
                        continue
                    } else { // we show and then if that cell is 0, call recursively
                        setTimeout(() => {
                            tableroCeldas[x][y].style.backgroundColor = "rgb(180,180,180)";
                            checkBubble(i, j)
                        }, 50);

                    }

                }
            }
        }

        tableroCeldas[x][y].textContent = (tablero[x][y] == 0) ? ' ' : tablero[x][y];
        points += tablero[x][y];
        setTimeout(() => {
            tableroCeldas[x][y].style.backgroundColor = "rgb(180,180,180)";

        }, 50);

        tableroCeldas[x][y].style.border = "inset";
        if (hasWon()){
            canPlay = false;
            state.textContent = "winner";
        } 
    }


    pointsElem.textContent = points;


}
function animationLost(x, y) {
    if (!tableroVisibility[x][y]) {
        tableroVisibility[x][y] = true

        // when clicking an unshown cell we have to do the following tasks
        // 1. if 0, 'clearSpace'
        tableroCeldas[x][y].style.backgroundColor = "rgb(255,255,255)";


        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i == x && j == y) { // do not re-search current cell
                    continue
                } else if (i < 0 || i > tablero.length - 1 || j < 0 || j > tablero.length - 1) { // if out of bounds
                    continue
                } else { // we show and then if that cell is 0, call recursively
                    setTimeout(() => {
                        tableroCeldas[x][y].style.backgroundColor = "rgb(180,180,180)";
                        // tableroCeldas[x][y].innerHTML = "<img class='mine' src='bomb.png'>";
                        animationLost(i, j)
                    }, 50);

                }

            }
        }
        tableroCeldas[x][y].style.border = "inset";
    }
}


function hasWon() {

    let count = 0;
    for (let i = 0; i < tableroVisibility.length; i++) {
        for (let j = 0; j < tableroVisibility[i].length; j++) {
            if (!tableroVisibility[i][j]) {
                count++;
            }

        }
    }

    return count <= 10;
}


function mostrarTableroConsola() {
    console.log(tablero);
}



createTableroDiv();
//putManualMines();
putMines();
checkAroundMines();
//checkAroundMines();

// Llama a la función mostrarTablero para mostrar el tablero en la consola
mostrarTableroConsola();