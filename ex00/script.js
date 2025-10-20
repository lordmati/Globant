const btnRestart = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
document.addEventListener('keyup', (event) => {
    checkMove(event);
});
const gridCells = [];

btnRestart.addEventListener('click', () => {
    clearGrid();
    spawnTwoStartingTiles();
});



function clearGrid() {
    for (let i = 0; i < gridCells.length; i++) {
        for (let j = 0; j < gridCells[i].length; j++) {
            const cell = gridCells[i][j];
            cell.textContent = '';
            cell.className = 'cell';
        }
    }
}


function checkMove(event){
    if (event.key === 'ArrowUp'){
        moveUp();
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
        console.log('move up');
    }
    else if(event.key === 'ArrowDown'){
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
        console.log('move down');
    }
    else if(event.key === 'ArrowLeft'){
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
        console.log('move left');
    }
    else if(event.key === 'ArrowRight'){
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
        console.log('move right');
    }
}

function getCell(row, col) {
    return document.querySelector(`#cell-${row}-${col}`);
}

function cellUnion(cell1, cell2) {
    if (cell1.textContent === cell2.textContent && cell1.textContent !== '') {
        let newValue = parseInt(cell1.textContent) * 2;
        cell1.textContent = String(newValue);
        cell1.className = 'cell';
        console.log("este numero",cell1.textContent);
        cell1.classList.add(`tile-${newValue}`);
        cell2.textContent = '';
        cell2.className = 'cell';
        return true;
    }
    return false;
}
function updateCell(cell) {
    let number = parseInt(cell.textContent);
    cell.className = 'cell';
    cell.classList.add(`tile-${number}`);
}
function moveUp() {
    let i = 0;
    let countcell = 0;
    let j = 0;
    while(i < 3){
        let cell = getCell(i, 0);
        if (cell.textContent !== ''){
            countcell++;
        }
        else{
            j = i;
        }
        i++;
    }
    if (countcell == 1){
        if (getCell(0,0).textContent === ''){
            updateCell(getCell(j,0));
        }
    }
/*     while(i < 2){
        let cell = getCell(i, 0);
        if (cell.textContent === ''){
            i++;
            continue;
        }
        else{
            let belowCell = getCell(i + 1, 0);
            if (belowCell.textContent === ''){
            }
        }
    } */
    let cell = getCell(0, 0);
    let cell2 = getCell(1, 0);
    cellUnion(cell, cell2);
}

function scoreUpdate(newScore) {
    score = parseInt(scoreElement.textContent);
    score += newScore;
    scoreElement.textContent = `${score}`;
}

function createGrid() {
    const gameContainer = document.querySelector('.grid-container');
    for (let i = 0; i < 4; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        gridCells[i] = [];
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            const input = document.createElement('input');
            cell.classList.add('cell');
            cell.id = `cell-${i}-${j}`;
            cell.dataset.row = i;
            cell.dataset.col = j;
            //let number = parseInt(cell.innerText);
            //cell.innerHTML = cell.id;
            //cell.textContent = '';
            row.appendChild(cell);
            gridCells[i][j] = cell;
        }
        gameContainer.appendChild(row);
    }
}

createGrid();

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < gridCells.length; i++) {
        for (let j = 0; j < gridCells[i].length; j++) {
            const c = gridCells[i][j];
            if (!c.textContent || c.textContent.trim() === '') emptyCells.push(c); {
            }
        }
    }
    return emptyCells;
}

function spawnRandomTile(value) {
    const empites = getEmptyCells();
    if (empites.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * empites.length);
    const cell = empites[randomIndex];
    cell.textContent = String(value);
    cell.classList.add(`tile-${value}`);
    //console.log(cell.id);
    return cell;
}

function spawnTwoStartingTiles(){
    let number1 = Math.random() < 0.9 ? 2 : 4;
    let number2 = Math.random() < 0.9 ? 2 : 4;
    spawnRandomTile(number1);
    spawnRandomTile(number2);
}
spawnTwoStartingTiles();