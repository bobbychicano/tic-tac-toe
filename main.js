// Gameboard Object
const gameBoard = (() => {
  const gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(gameCells);

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

  return { gameSquares, winningCombinations };
})();





// Player Object
const playerFactory = (name, move) => {
  const getName = () => name;
  const getMove = () => move;

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

    changePlayer();

  };

  const changePlayer = function() {
    if (_currentPlayer == playerX){
      _currentPlayer = playerO;
    } else {
      _currentPlayer = playerX;
    }
  }

  // The function to check for a winner. Will be returned to be called as a method.
  //My logic for checking the winner is wrong
  const checkForWinner = function(player) {

    console.log(player.getMove());

    gameBoard.winningCombinations.some(combo => {
      let checkCombo = combo.every(element => {
        return gameBoard.gameSquares[element].textContent == player.getMove();
      })

      if (checkCombo) {
        winner = _currentPlayer.getName();
        console.log(winner)
      }

    })
  };

  return { drawMove };
})();


gameBoard.gameSquares.forEach((arrElement) => {
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
});

/*
  const displayWinner() {
    // Function that toggles a hidden element in the DOM with a certain class to suddenly be visible.
  }
*/
