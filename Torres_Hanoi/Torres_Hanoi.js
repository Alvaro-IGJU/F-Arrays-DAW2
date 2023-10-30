let tablero = document.querySelector('#tablero');
let hanoiTowers = [[], [], []];
const colores = ["red", "blue", "green", "yellow", "orange"];
let numDiscs;
let numTries = 0;
let numTriesElement = document.querySelector('#numTries');

document.getElementById('startButton').addEventListener('click', function () {
    numDiscs = parseInt(document.getElementById('numDiscs').value);
    if (numDiscs >= 1 && numDiscs <= 5) {
        startGame(numDiscs);
    } else {
        alert("Please enter a number between 1 and 5.");
    }
});


document.getElementById('resolverButton').addEventListener('click', function () {
    numDiscs = parseInt(document.getElementById('numDiscs').value);
    if (numDiscs >= 1 && numDiscs <= 5) {
        startGame(numDiscs,true);
    } else {
        alert("Por favor, reinicia el juego para resolver automáticamente.");
    }
});

function createColumn(id) {
    const column = document.createElement("div");
    column.id = id;
    column.classList.add("column");
    return column;
}

function createBase() {
    const base = document.createElement("div");
    base.classList.add("base");
    return base;
}

function updateBoard() {
    tablero.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const column = createColumn(`columna${i + 1}`);
        tablero.appendChild(column);
        for (let j = 0; j < hanoiTowers[i].length; j++) {
            const divPiece = document.createElement("div");
            divPiece.classList.add("piece");
            divPiece.textContent = hanoiTowers[i][j];
            divPiece.style.backgroundColor = colores[hanoiTowers[i][j] - 1];
            divPiece.style.width = 200 + (20 * ((hanoiTowers[i][j] - 1) * 2)) + "px";
            column.appendChild(divPiece);
        }
        const base = createBase();
        column.appendChild(base);
        for (let k = 0; k < 3; k++) {
            if (k != i) {
                const button = document.createElement("button");
                button.id = (i + 1) + "" + (k + 1);
                button.textContent = "MOU PILA " + (k + 1);
                column.appendChild(button);
                button.addEventListener("click", () => {
                    let originColumn = (Math.floor(button.id / 10)) - 1;
                    let destinyColumn = (button.id % 10) - 1;
                    if (hanoiTowers[originColumn].length > 0 &&
                        (hanoiTowers[destinyColumn].length === 0 ||
                            hanoiTowers[originColumn][0] < hanoiTowers[destinyColumn][0])) {
                        let changedNumber = hanoiTowers[originColumn].shift();
                        hanoiTowers[destinyColumn].unshift(changedNumber);
                        numTries++;
                        numTriesElement.innerHTML = "<b>INTENTS: </b>" + numTries;
                        updateBoard();

                    }
                });
            }
        }
    }
    if (hanoiTowers[2].length == numDiscs) {
        document.getElementById("respuesta").textContent = "¡FELICIDADES!¡HAS GANADO! INTENTOS TOTALES: " + numTries;
    }
}

function updateBoardAuto() {
    tablero.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const column = createColumn(`columna${i + 1}`);
        tablero.appendChild(column);
        for (let j = 0; j < hanoiTowers[i].length; j++) {
            const divPiece = document.createElement("div");
            divPiece.classList.add("piece");
            divPiece.textContent = hanoiTowers[i][j];
            divPiece.style.backgroundColor = colores[hanoiTowers[i][j] - 1];
            divPiece.style.width = 200 + (20 * ((hanoiTowers[i][j] - 1) * 2)) + "px";
            column.appendChild(divPiece);
        }
        const base = createBase();
        column.appendChild(base);
        
    }
    if (hanoiTowers[2].length == numDiscs) {
        document.getElementById("respuesta").textContent = "¡FELICIDADES!¡HAS GANADO! INTENTOS TOTALES: " + numTries;
    }
}

function resolverTorresDeHanoi(numDiscs, origen, auxiliar, destino) {
    if (numDiscs === 1) {
        // Mover disco 1 de origen a destino
        hanoiTowers[destino].unshift(hanoiTowers[origen].shift());
        
        updateBoardAuto();
       
        return;
    }
    
    resolverTorresDeHanoi(numDiscs - 1, origen, destino, auxiliar);

    resolverTorresDeHanoi(1, origen, auxiliar, destino);

    resolverTorresDeHanoi(numDiscs - 1, auxiliar, origen, destino);
}








function startGame(numDiscs, ia = false) {
    numTries = 0;
    hanoiTowers = [[], [], []];
    numTriesElement.innerHTML = "<b>INTENTS: </b>" + numTries;
    document.getElementById("respuesta").textContent = ""
    for (let i = 0; i < numDiscs; i++) {
        hanoiTowers[0][i] = i + 1;
    }
    updateBoard();
    if (!ia) {

        
    } else {
        resolverTorresDeHanoi(numDiscs, 0, 1, 2);
    }

}
function hasWon() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            const element = array[j];

        }
    }
}
