const cells = document.querySelectorAll('.cell');
const stattxt = document.querySelector('#stattxt');
const restart = document.getElementById('restart');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", "",];
let currplay = 'X';
let running = false;
initialGame();

function initialGame(){
        cells.forEach(cell => cell.addEventListener('click', cellClick));
        restart.addEventListener('click', restartGame);
        stattxt.textContent = `${currplay}'s turn.`;
        running = true;
}
function cellClick(){
        const cellIndex = this.getAttribute('cellIndex');

        if(options[cellIndex] != "" || !running){
            return;
        }
        updateCell(this, cellIndex);
        checkWin();
}
function updateCell(cell, index){
    options[index] = currplay;
    cell.textContent = currplay;
}
function changePlay(){
        currplay = (currplay == 'X') ? '0' : 'X';
        stattxt.textContent = `${currplay}' turn`;
}
function checkWin(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }

    }
    if(roundWon){
        stattxt.textContent = `${currplay} Wins!!!`
        running = false;
    }
    else if(!options.includes("")){
        stattxt.textContent = `${currplay} Draw =/`
        running = false;
    }
    else{
        changePlay();
    }
}
function restartGame(){
        currplay = 'X';
        options = ["", "", "", "", "", "", "", "", "",];
        stattxt.textContent = `${currplay}'s turn`
        cells.forEach(cell => cell.textContent = "");
        running = true;
}