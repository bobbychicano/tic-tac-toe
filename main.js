// Gameboard Object
const gameBoard = (() => {
  const _gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(_gameCells);
  const winScreen = document.getElementById("win");
  const drawScreen = document.getElementById("draw");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return { gameSquares, winScreen, drawScreen, winningCombinations };
})();





// Player Object
const playerFactory = (name, move) => {
  const getName = () => name;
  const getMove = () => move;

  //I'll have to write logic to get the name of the player from a prompt right when the game starts.

  return { getName, getMove };
};

const playerX = playerFactory('Billy', 'X');
const playerO = playerFactory('Bob', 'O');





// The Gameflow object
// Or, the 'displayController' as it is called in the project page
const gameFlow = (() => {

  let winner = '';
  let _currentPlayer = playerX;

  // The function to place(draw) the 'X's and 'O's on the tic tac toe grid
  const drawMove = function(e) {

    const cell = e.target;
    // Old code: const gridNumber = e.target.dataset.box;
    const spanItem = document.createElement("span");
    spanItem.innerText = _currentPlayer.getMove();
    cell.append(spanItem);
    // Old code: gameBoard.gameSquares[gridNumber].append(spanItem);

    checkForWinner(_currentPlayer);
    //checkForDraw();

    changePlayer();

  };

  const changePlayer = function() {
    if (_currentPlayer == playerX){
      _currentPlayer = playerO;
    } else {
      _currentPlayer = playerX;
    }
  }

  const checkForWinner = function(player) {
    gameBoard.winningCombinations.forEach(combo => {
      let checkCombo = combo.every(element => {
        return gameBoard.gameSquares[element].textContent == player.getMove();
      })

      if (checkCombo) {
        winner = _currentPlayer.getName();
        console.log(winner)
        displayWinner(winner);
        //logic that stops the game and announces the winner
        // Pop up a screen that announces the winner and that they can't exit out of unless they press 'restart'
      }
    })
  };

  const displayWinner = function(winner) {
    gameBoard.winScreen.innerText = `WINNER: ${winner.toUpperCase()}`;
    gameBoard.winScreen.classList.add("visible");
  }

/*
  const checkForDraw = function(){

  };


  const restart = function() {

  };
*/

  return { drawMove };
})();


gameBoard.gameSquares.forEach((arrElement) => {
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
});

//restart button event listener
