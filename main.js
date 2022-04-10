// Gameboard Object
const gameBoard = (() => {
  const gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(gameCells);
  const endScreen = document.getElementById("end-screen");
  // making winScreen into endScreen
  const endText = document.getElementById("end-text");
  // making winText into endText
  const restartButton = document.querySelector(".restart-button");

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

  return { gameCells, gameSquares, endScreen, winningCombinations, endText, restartButton };
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
    checkForDraw();

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
        displayWinner(winner);
      }
    })
  };


  const checkForDraw = function(){
    let checkForChild = gameBoard.gameSquares.every(element => {
      return element.hasChildNodes()
    })

    if (checkForChild) {
      displayDraw();
    }
  }

  const displayWinner = function(winner) {
    gameBoard.endText.textContent = `WINNER: ${winner.toUpperCase()}`;
    gameBoard.endScreen.classList.add("visible");
  }

  const displayDraw = function() {
    gameBoard.endText.textContent = "IT'S A DRAW";
    gameBoard.endScreen.classList.add("visible");
  }

  const restartGame = function() {

    gameBoard.gameSquares.forEach(element => {
      if (element.hasChildNodes()) {
        element.removeChild(element.firstElementChild);
      }
    })

    gameBoard.gameSquares.forEach(element => {
      element.removeEventListener("click", drawMove)
    })

    gameBoard.gameSquares.forEach((arrElement) => {
      arrElement.addEventListener("click", drawMove, { once: true })
    })

    winner = '';
    _currentPlayer = playerX;
    gameBoard.endText.textContent = '';
    gameBoard.endScreen.classList.remove("visible");

  };

  return { drawMove, restartGame };
})();

// Initial event listener for the tic-tac-toe grid
gameBoard.gameSquares.forEach((arrElement) => {
  arrElement.addEventListener("click", gameFlow.drawMove, { once: true })
});

// Restart button event listener
gameBoard.restartButton.addEventListener("click", gameFlow.restartGame);
