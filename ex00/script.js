const btnRestart = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
document.addEventListener('keyup', (event) => {
    checkMove(event);
});
const gridCells = [];

btnRestart.addEventListener('click', () => {
    clearGrid();
    scoreReset();
    spawnTwoStartingTiles();
});

function scoreReset() {
    scoreElement.textContent = '0';
}

function clearGrid() {
    for (let i = 0; i < gridCells.length; i++) {
        for (let j = 0; j < gridCells[i].length; j++) {
            const cell = gridCells[i][j];
            cell.textContent = '';
            cell.className = 'cell';
        }
    }
}
function isBoardFull() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = getCell(i, j);
            if (cell.textContent === '') {
                return false;
            }
        }
    }
    return true;
}

function isGameOver() {
    if (!isBoardFull()) {
        return false;
    }
    if (checkTableNumber()) {
        return false;
    }
    return true;
}

function checkTableNumber(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = parseInt(getCell(i, j).textContent);
            const cell2 = parseInt(getCell(i, j + 1).textContent);
            if(cell === cell2){
                return true;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = parseInt(getCell(i, j).textContent);
            const cell2 = parseInt(getCell(i + 1, j).textContent);
            if(cell === cell2){
                return true;
            }
        }
    }
    return false;
}

function checkMove(event){
    if (event.key === 'ArrowUp'){
        if(!isGameOver()){
            moveUp();
        }
        else{
            alert('Game Over');
        }
    }
    else if(event.key === 'ArrowDown'){
        if(!isGameOver()){
            moveDown();
        }
        else{
            alert('Game Over');
        }
    }
    else if(event.key === 'ArrowLeft'){
        if(!isGameOver()){
            moveLeft();
        }
        else{
            alert('Game Over');
        }
    }
    else if(event.key === 'ArrowRight'){
        if(!isGameOver()){
            moveRight();
        }
        else{
            alert('Game Over');
        }
    }
}

function getCell(row, col) {
    return document.querySelector(`#cell-${row}-${col}`);
}
function updateCell(cell,value) {
    
    cell.textContent = value > 0 ? String(value) : '';
    cell.className = 'cell';
    if (value > 0) {
        cell.classList.add(`tile-${value}`);
    }
}

function makeColumnArray(col){
    const arr = [];
    for (let j = 0; j < 4; j++){
        const cell = getCell(j, col);
        if(cell.textContent === ''){
            arr.push(0);
        }
        else{
            arr.push(parseInt(cell.textContent));
        }
    }
    return arr;
}

function makeRowArray(row){
    const arr = [];
    for (let j = 0; j < 4; j++){
        const cell = getCell(row, j);
        if(cell.textContent === ''){
            arr.push(0);
        }
        else{
            arr.push(parseInt(cell.textContent));
        }
    }
    return arr;
}

function processLine(arr){
    const orig = arr.slice();
    const nums = arr.filter(n => n !== 0);
    for (let i = 0; i < nums.length - 1; i++){
        if(nums[i] === nums[i + 1]){
            nums[i] *= 2;
            nums.splice(i + 1, 1);
            scoreUpdate(nums[i]);
        }
    }
    while (nums.length < 4){
        nums.push(0);
    }
    let changed = false;
    for (let i = 0; i < 4; i++){
        if (nums[i] !== orig[i]){
            changed = true;
            break;
        }
    }
    return {newArr: nums, changed: changed};
}

//Functions to move in each direction

function moveUp() {
    var flag = false;
    for(let col = 0; col < 4; col++){
        const arr = makeColumnArray(col);
        const {newArr, changed} = processLine(arr);
        for(let row = 0; row < 4; row++){
            const cell = getCell(row, col);
            updateCell(cell,newArr[row]);
        }
        if (changed) {
            flag = true;
        }
    }
    if (flag) {
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
    }
}

function moveDown() {
    var flag = false;
    for(let col = 0; col < 4; col++){
        const arr = makeColumnArray(col).reverse();
        const {newArr, changed} = processLine(arr);
        const finalArr = newArr.reverse();
        for(let row = 0; row < 4; row++){
            const cell = getCell(row, col);
            updateCell(cell,finalArr[row]);
        }
        if (changed) {
            flag = true;
        }
    }
    if (flag) {
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
    }
}
function moveLeft() {
    var flag = false;
    for(let row = 0; row < 4; row++){
        const arr = makeRowArray(row);
        const {newArr, changed} = processLine(arr);
        for(let col = 0; col < 4; col++){
            const cell = getCell(row, col);
            updateCell(cell,newArr[col]);
        }
        if (changed) {
            flag = true;
        }
    }
    if (flag) {
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
    }
}
function moveRight() {
    var flag = false;
    for(let row = 0; row < 4; row++){
        const arr = makeRowArray(row).reverse();
        const {newArr, changed} = processLine(arr);
        const finalArr = newArr.reverse();
        for(let col = 0; col < 4; col++){
            const cell = getCell(row, col);
            updateCell(cell,finalArr[col]);
        }
        if(changed)
            flag = true;
    }
    if (flag) {
        spawnRandomTile(Math.random() < 0.9 ? 2 : 4);
    }
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
    return cell;
}

function spawnTwoStartingTiles(){
    let number1 = Math.random() < 0.9 ? 2 : 4;
    let number2 = Math.random() < 0.9 ? 2 : 4;
    spawnRandomTile(number1);
    spawnRandomTile(number2);
}
spawnTwoStartingTiles();