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
    let moveNumber = 0, isFinished = false;
    const resetBtn = document.querySelector(".result-reset button");
    const result = document.querySelector(".result");
    resetBtn.textContent = "Restart Game";
    const getMoveNumber = () => moveNumber;
    const incrementMoveNumber = () => moveNumber++;
    const resetMoveNumber = () => moveNumber = 0;
    return{getMoveNumber, incrementMoveNumber, resetMoveNumber, isFinished, resetBtn, result};
})();

function updateBoard(row, column){
    if(gameBoard.board[row][column] !== null){
        return;
    }

    if(gameFlow.getMoveNumber() % 2 == 1){
        gameBoard.board[row][column] = 'O';
    }
    else{
        gameBoard.board[row][column] = 'X';
    }

    if(gameFlow.getMoveNumber() >= 5){
        checkRow();
        checkColumn();
        checkDiagonal();
        if(gameFlow.getMoveNumber() === 9 && gameFlow.isFinished === false){   
            showResult("none"); 
        }
    }
}

const gameDisplay = (function(){
    const cells = document.querySelectorAll(".cell");
    let cell;
    let counter = 0;
    for(cell of cells){
        counter++;
        cell.cellNumber = counter - 1;
        cell.row = Math.floor(cell.cellNumber / 3);
        cell.column = (cell.cellNumber % 3);
    }
    return{cells};
})();

function updateDOM(){
    gameDisplay.cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            
            if(gameFlow.isFinished){
                return;
            }
            if(cell.children.length !== 0){
                return;
            }
            gameFlow.incrementMoveNumber();
            const imgElement = document.createElement("img");
            if(gameFlow.getMoveNumber() % 2 == 1){
                imgElement.src = "img/o.png";
            }
            else{
                imgElement.src = "img/x.png";
            }
            cell.appendChild(imgElement);
            
            updateBoard(cell.row, cell.column);
        });
    });
}

function checkRow(){
    const board = gameBoard.board;
    let countSimilar;
    for(let i = 0; i < 3; i++){
        countSimilar = 1;
        for(let j = 0; j < 2; j++){
            if(board[i][j] === board[i][j+1] && board[i][j] !== null){
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
            if(board[i][j] === board[i+1][j] && board[i][j] !== null){
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
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== null){
        showResult(board[1][1]);
        return;
    }
    else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== null){
        showResult(board[1][1]);
        return;
    }
}

function showResult(winner){
    gameFlow.isFinished = true;
    gameFlow.resetBtn.textContent = "Play Again?";
    if(winner === 'O'){
        gameFlow.result.textContent = "The winner is player1!"
    }
    else if(winner === 'X'){
        gameFlow.result.textContent = "The winner is player2!";
    }
    else if(winner === "none"){
        gameFlow.result.textContent = "Draw!";
    }

    
}

function resetBoard(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameBoard.board[i][j] = null;
        }
    }
    gameFlow.resetMoveNumber();
}

function resetDisplay(){
    gameDisplay.cells.forEach((cell) => {
        if(cell.childElementCount !== 0){
            const removeImg = document.querySelector("img");
            removeImg.remove();
        }
    });
    gameFlow.resetBtn.textContent = "Restart Game";
    gameFlow.result.textContent = "";
}

function resetButton(){
    gameFlow.resetBtn.addEventListener("click", () => {
        gameFlow.isFinished = false;
        resetBoard();
        resetDisplay();
    });
}

updateDOM();
resetButton();


