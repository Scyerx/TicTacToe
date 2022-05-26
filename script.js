let players = [
    {
        name: "Player X",
        sign: "X",
        fields: [],
        index: 0
    },
    {
        name: "Player O",
        sign: "O",
        fields: [],
        index: 1
    }
]
const board = ["", "", "", "", "", "", "", "", ""];
let field = document.getElementsByClassName("field");
let currentPlayer = players[0]
let gameWon = false
let turn = 0
const winningConditions = [
    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
]

let restartBtn = document.getElementById("restartBtn");

restartBtn.onclick = function () {
    for (var i = 0; i < board.length; i++) {
        board[i] = "";
        displayGrid()
    }
    currentPlayer = players[0]
    gameWon=false
    turn = 0
    players[0].fields = []
    players[1].fields = []
    for (var i = 0; i < field.length; i++) {
        field[i].addEventListener('click', insertSign)
    }
    document.getElementById('whosturn').textContent = `${currentPlayer.name}'s turn!`
    
}

function displayGrid () {    
    for (var i = 0; i < board.length; i++) {
        field[i].textContent = board[i];
    }
}

for (var i = 0; i < field.length; i++) {
    field[i].addEventListener('click', insertSign)
}

function insertSign () {
    if (this.textContent =="") {
        index = this.getAttribute ('id');
        this.textContent = currentPlayer.sign;
        board[index] = currentPlayer.sign;
        currentPlayer.fields.push(index);        
        checkWinner(currentPlayer.index)
    }
    
}

function checkWinner (index) {
    for (var i = 0; i < winningConditions.length; i++) {
        if (gameWon == true) {
            break
        } else {
            winCondition = winningConditions[i];
            gameWon = winCondition.every(elem => players[index].fields.includes(elem))            
        }        
    }
    if (gameWon == false) {
        changePlayer()
    } else {
        finishGame()
    }
    turn ++
    if (turn === 9) {
        finishGame();
    }
}

function changePlayer () {
    if (currentPlayer.index == 0) {
        currentPlayer=players[1]
    } else {
        currentPlayer=players[0]
    }
    document.getElementById('whosturn').textContent = `${currentPlayer.name}'s turn!`
}

function finishGame() {
    if (turn < 9) {
        document.getElementById('whosturn').textContent = `${currentPlayer.name} Won!`        
    } else {
        document.getElementById('whosturn').textContent = `There is a Tie!`
    }
    for (var i = 0; i < field.length; i++) {
        field[i].removeEventListener('click', insertSign)
    }  
}





