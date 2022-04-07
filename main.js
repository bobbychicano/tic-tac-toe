




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
    // If all the combinations come back 'false' then it means there is no winner and the game is a tie. But it can only check for that condition once all squares have been filled in.

    // It boils down to checking if every element in the combo has the same innerText, which equals to 3-in-a row which means a winning combination
    //forEach() always returns a value of 'undefined'
    winningCombinations.forEach((combo) => {

      let check = combo.every((element) => gameBoard.gameCells[element].firstElementChild.innerText === `${_currentPlayer.getMove()}`)

      // 'check' returns either 'true' or 'false'. So, they have to all pass the condition or else it's an immediate false. What do we do with the value?

      // There is now way to break out of a forEach() function loop so consider alternative looping methods if you MUST be able to skip an iteration


      // What we really have to test is the actual combo. if the combo is true then the player wins. If the combo is false, then we have to check the other combo until no more combos are available

      if (check === 'true') {
        winner = `${_currentPlayer}`;
        console.log(winner);
      }

      // If 'fasle' do nothing? If ALL combos return false then return that it's a tie.
      // I do think the conditional tests have to be inside the function

      // if check === 'false' every single time then it is a tie.
      // is there another condition to check for another winner?
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
