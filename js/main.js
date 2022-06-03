/*----- constants -----*/
const playerO = "O";
const playerX = "X";

/*----- app's state (variables) -----*/

let board;
let currPlayer 
let gameOver 

/*----- cached element references -----*/

// const botton = document.querySelector('botton')

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);
// botton.addEventListener('click', init())
/*----- functions -----*/


setGame();

function init() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
    currPlayer = playerO;
    gameOver = false;
    document.querySelectorAll('.tile').innerText = ""
}
function setGame(){
    init()
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", handleClick);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function handleClick() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");   
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        return;
    }
    board[r][c] = currPlayer; 
    this.innerText = currPlayer; 
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }
    checkWinner();
}


function checkWinner() {
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {

            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}
// /*----- constants -----*/
// const WINCOMBLE = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7]
// ]
// const COLORS = { 
//     '1':'purple',
//     '-1':'green',
//     'null':'white', 
// }   
// /*----- app's state (variables) -----*/
// let board, turn, winner

// /*----- cached element references -----*/
// const table = document.querySelector('table')
// const table_row = document.querySelectorAll('td div')
// const botton = document.querySelector('botton')
// // board = [square_1, square_2, square_3, square_4, 
// //     square_5, square_6, square_7, square_8, square_9]

// /*----- event listeners -----*/
// document.querySelector('table').addEventListener('click', handleClick);
// botton.addEventListener('click', init)
// /*----- functions -----*/

// init();

// function init() {
//     board = [null, null, null, null, null, null, null, null, null]
//     turn = 1
//     winner = null
//     render()
// }

// function handleClick(evt) {
   
//     const index = parseInt(evt.target.id.split("-")[1])
//     if (board[index] || winner ) {
//         return
//     }
//     board[index] = turn
//     turn = turn * (-1)
//     winner = getWinner()
//     render()

// }

// function getWinner() {
//     if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
//     if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
//     if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
//     if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
//     if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
//     if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
//     if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
//     if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
//     if (board.includes(null)) return null;
//     return "Tie"
//     }


// // function render() {
// //     board.forEach(function(square, index) {
// //         if (squares[index] == 1) {
// //             square = "X"
// //         } else if (squares[index] == -1) {
// //             square = "O"
// //         }
// //       })
// // }

// function render() {
//     board.forEach(function(sq, idx) {
//         table_row[idx].innerText = board[idx]
//         // table_row[idx].style.background = COLORS[sq];
//     });
//     // if (winner === 'Tie') {
//     //   message.innerHTML = 'Rats, another tie!';
//     // } else if (winner) {
//     //   message.innerHTML = `Congrats ${COLORS[winner].toUpperCase()}!`;
//     // } else {
//     //   message.innerHTML = `${COLORS[turn].toUpperCase()}'s Turn`;
//     }
  