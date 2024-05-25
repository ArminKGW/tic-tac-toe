const gameBoard = (function(){
    const row = 3;
    const column = 3;
    const board = [];
    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i][j] = null;
        }
    }
    return {board};
})();

const gameFlow = (function (){
    let moveNumber = 0;
    const getMoveNumber = () => moveNumber;
    const incrementMoveNumber = () => moveNumber++;
    return{getMoveNumber, incrementMoveNumber};
})();

function updateDisplay(move, row, column){
    gameBoard.board[row][column] = move.toUpperCase();
    gameFlow.incrementMoveNumber();
}

function checkRow(){
    
}

function checkColumn(){

}

function checkDiagonal(){

}

