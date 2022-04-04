// Gameboard Object
const gameBoard = (() => {
  const gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(gameCells);

  return { gameCells, gameSquares };
})();

// Player Object
const playerFactory = (name, move) => {
  const getName = () => name;
  const getMove = () => move;

  return { getName, getMove };
};

// the player factory creates a player based on textInput
// the text input comes from a player writing their name in a pop up form/field
// the factory is used to create a player object with their name and what else..?

// playerO === { getName, getMove}
// playerO.getName() === 'Bob'
// playerO.getMove() === 'O'

const playerX = playerFactory('Billy', 'X');
const playerO = playerFactory('Bob', 'O');

const gameFlow = (() => {

  let currentPlayer = playerX;

  const drawMove = function(e) {

    const gridNumber = e.target.dataset.box;
    console.log(gridNumber);
    const spanItem = document.createElement("span");
    spanItem.innerText = currentPlayer.getMove();
    gameBoard.gameCells[gridNumber].append(spanItem);

    if (currentPlayer == playerX){
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
  };

  return { drawMove };
})();

gameBoard.gameSquares.forEach((arrElement) =>
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
);


/*
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
*/
