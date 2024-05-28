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
    const getMoveNumber = () => moveNumber;
    const incrementMoveNumber = () => moveNumber++;
    return{getMoveNumber, incrementMoveNumber, isFinished};
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
            console.log(gameFlow.isFinished);
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

function resetBoard(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameBoard.board[i][j] = null;
        }
    }
}

updateDOM();


