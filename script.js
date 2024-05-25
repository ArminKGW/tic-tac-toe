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
    if(gameBoard.board[row][column] !== null){
        return;
    }
    gameBoard.board[row][column] = move.toUpperCase();
    gameFlow.incrementMoveNumber();
    if(gameFlow.getMoveNumber() >= 5){
        checkRow();
        checkColumn();
        checkDiagonal();
        if(gameFlow.getMoveNumber() === 9){
            showResult("none");
        }
    }
}

function checkRow(){
    const board = gameBoard.board;
    let countSimilar;
    for(let i = 0; i < 3; i++){
        countSimilar = 1;
        for(let j = 0; j < 2; j++){
            if(board[i][j] === board[i][j+1]){
                countSimilar++;
                if(countSimilar === 3){
                    showResult(board[i][j]);
                    return;
                }
            }
        }
    }
}

function checkColumn(){
    const board = gameBoard.board;
    let countSimilar;
    for(let j = 0; j < 3; j++){
        countSimilar = 1;
        for(let i = 0; i < 2; i++){
            if(board[i][j] === board[i+1][j]){
                countSimilar++;
                if(countSimilar === 3){
                    showResult(board[i][j]);
                    return;
                }
            }
        }
    }
}

function checkDiagonal(){
    const board = gameBoard.board;
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2]){
        showResult(board[1][1]);
        return;
    }
    else if(board[0][2] === board[1][1] && board[0][2] === board[2][0]){
        showResult(board[1][1]);
        return;
    }
}

function showResult(winner){
    if(winner === 'O'){
        console.log("The winner is Player 1!");
    }
    else if(winner === 'X'){
        console.log("The winner is Player 2!");
    }
    else if(winner === "none"){
        console.log("Draw!");
    }
}

