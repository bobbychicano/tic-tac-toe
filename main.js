// Gameboard Object
const gameBoard = (() => {
  const _gameCells = document.querySelectorAll(".grid-cell");
  const gameSquares = Array.from(_gameCells);
  const endScreen = document.getElementById("end-screen");
  const endText = document.getElementById("end-text");
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

  return { gameSquares, winningCombinations, endScreen, endText, restartButton };
})();


// Player Object
const playerFactory = (name, move) => {
  const getName = () => name;
  const getMove = () => move;

  //I'll have to write logic to get the name of the player from a prompt right when the game starts.

  return { getName, getMove };
};

const playerX = playerFactory('Player 1', 'X');
const playerO = playerFactory('Player 2', 'O');


// The Gameflow object
const gameFlow = (() => {

  let _winner = '';
  let _currentPlayer = playerX;

  const drawMove = function(e) {

    const cell = e.target;
    const spanItem = document.createElement("span");
    spanItem.innerText = _currentPlayer.getMove();
    cell.append(spanItem);

    _checkForWinner(_currentPlayer);

    _checkForDraw();

    _changePlayer();

  };

  const _changePlayer = function() {
    if (_currentPlayer == playerX){
      _currentPlayer = playerO;
    } else {
      _currentPlayer = playerX;
    }
  }

  const _checkForWinner = function(player) {
    gameBoard.winningCombinations.forEach(combo => {
      let checkCombo = combo.every(element => {
        return gameBoard.gameSquares[element].textContent == player.getMove();
      })

      if (checkCombo) {
        _winner = _currentPlayer.getName();
        displayWinner(_winner);
      }
    })
  };

  const _checkForDraw = function() {
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

    _winner = '';
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
