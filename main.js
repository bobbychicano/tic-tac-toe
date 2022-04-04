// Gameboard Object
const gameBoard = (() => {
  const gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(gameCells);

// drawMove is basically telling me that it is completely possible to click on a tic tac toe grid square and have an event listener be registered. Now, what do I want to do once there is a click? I want to draw an 'X' or an 'O' depending on who the current player is.
/*
  const drawMove = function (e) {
    const gridNumber = e.target.dataset.box;
    console.log(gridNumber);
    const spanItem = document.createElement("span");
    //spanItem.innerText = currentPlayer.getMove(); // it doesnt have access to currentPlayer.getMove()
    //gameCells[gridNumber].append(spanItem);
  };
*/

  return { gameCells, gameSquares};
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

const playerX = playerFactory('Billy', 'X');
const playerO = playerFactory('Bob', 'O');

// playerO = { getName, getMove}
// playerO.getName() === 'Bob'
// playerO.getMove() === 'O'

// Gameflow Object
const gameFlow = (() => {

  // logic for choosing the player
  let currentPlayer = playerX;


  //if (currentPlayer == playerX {
//    currentPlayer = playerO;
//  }

  const drawMove = function (e) {
    const gridNumber = e.target.dataset.box;
    console.log(gridNumber);
    const spanItem = document.createElement("span");
    spanItem.innerText = currentPlayer.getMove();
    gameBoard.gameCells[gridNumber].append(spanItem);
  };


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

  return { drawMove };
})();

// How do I write the logic to change players?

gameBoard.gameSquares.forEach((arrElement) =>
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
);

//I want it to be so that when you click a grid square it looks to see who the current player is and then draws their symbol on it by appending a <span> element.
