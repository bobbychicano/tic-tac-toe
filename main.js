const gameBoard = (() => {
  const gameCells = document.querySelectorAll('.grid-cell');
  const gameSquares = Array.from(gameCells);

  let gameSpaces = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'O', 'X'];

  const drawArray = function(e) {
    const gridNumber = e.target.dataset.box;
    console.log(gridNumber);
    const spanItem = document.createElement('span');
    spanItem.innerText = `${gameSpaces[gridNumber]}`;
    gameCells[gridNumber].append(spanItem);
  }

  gameSquares.forEach(arrElement => arrElement.addEventListener('click', drawArray, {once: true}));

  return {gameSpaces};
})();

// gameBoard.~somefunction~

//Player Objects

const playerFactory = (name) => {
  const getName = () => name;

  return {getName};
};


//Game flow Object
const gameFlow = (() => {
  const playerOne = playerFactory.getName;
  const playerTwo = playerFactory.getName;

  
})();
