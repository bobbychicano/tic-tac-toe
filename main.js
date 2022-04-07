




// Gameboard Object
const gameBoard = (() => {
  const gameCells = document.querySelectorAll(".grid-cell");
  // Returns a nodelist so we turn that into an array
  const gameSquares = Array.from(gameCells);

  return { gameCells, gameSquares };
})();





// Player Object
const playerFactory = (name, move) => {
  const getName = () => name;
  const getMove = () => move;

  return { getName, getMove };
};

const playerX = playerFactory('Billy', 'X');
const playerO = playerFactory('Bob', 'O');
  // playerO === { getName, getMove}
  // playerO.getName() === 'Bob'
  // playerO.getMove() === 'O'





// The Gameflow object or 'displayController' as it is called in the project page
const gameFlow = (() => {
  const winner = '';
  let _currentPlayer = playerX;

  // The function to place(draw) the 'X's and 'O's on the tic tac toe grid
  const drawMove = function(e) {

    const gridNumber = e.target.dataset.box;
    console.log(gridNumber);
    const spanItem = document.createElement("span");
    spanItem.innerText = _currentPlayer.getMove();
    gameBoard.gameCells[gridNumber].append(spanItem);

    if (_currentPlayer == playerX){
      _currentPlayer = playerO;
    } else {
      _currentPlayer = playerX;
    }
  };

  // The function to check for a winner. Will be returned to be called as a method.
  const checkForWinner = function() {

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.forEach((combo) => {

      let check = combo.every((element) => gameBoard.gameCells[element].firstElementChild.innerText === `${_currentPlayer.getMove()}`)

      if (check === 'true') {
        winner = `${_currentPlayer}`;
        console.log(winner);
      }

    })
  };

  return { drawMove };
})();



/*
*
*
  const displayWinner() {
    // Function that toggles a hidden element in the DOM with a certain class to suddenly be visible.
  }

gameBoard.gameSquares.forEach((arrElement) => {
  arrElement.addEventListener("click", gameFlow.checkForWinner)
});

// Add another click event to the gameBoard.gameSquares?
// gameFlow.checkForWinner();

//try this out in a code pen maybe to see if it works
for (let i = 0; i < gameBoard.gameSquares.length; i++) {

  for (let j = 0; j < winningCombinations.length; j++) {

  }
}
*
*
*/





gameBoard.gameSquares.forEach((arrElement) => {
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
});
