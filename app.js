const player = (name, type, icon) => {
  const name1 = name;
  const type1 = type;
  const icon1 = icon;

  return {
    name1,
    type1,
    icon1,
  };
};

const gameBoard = (() => {
  let board = new Array(9);

  const canPlace = (location) => board[location] === undefined;

  const addXorO = (type, location) => {
    if (canPlace(location)) {
      board[location] = type;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
  };

  return {
    board,
    addXorO,
    resetBoard,
  };
})();

const initialNumTurns = 0;

const gameController = (() => {
  const curBoard = gameBoard;
  let player1 = player("player 1", "player", "X");
  let player2 = player("player 2", "player", "O");
  let numberOfPlays = initialNumTurns;
  let gameResult;

  const startGame = () => {
    numberOfPlays = initialNumTurns;
    player1 = player("player 1", "player", "X");
    player2 = player("player 2", "player", "O");
    curBoard.resetBoard();
  };

  const getActivePlayer = () => {
    if (numberOfPlays % 2 === 0) {
      return player1;
    }
    return player2;
  };

  const getGameResult = () => gameResult;

  const calculateWinner = () => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winner.length; i++) {
      const [a, b, c] = winner[i];
      if (
        curBoard.board[a]
        && curBoard.board[a] === curBoard.board[b]
        && curBoard.board[a] === curBoard.board[c]
      ) {
        return curBoard.board[a];
      }
    }

    return null;
  };

  const calculateTie = () => {
    console.log()
    for (let i = 0; i < curBoard.board.length; i++) {
      if (!curBoard.board[i]) return false;
    }
    return curBoard.board.length === numberOfPlays;
  };

  const playRound = (location) => {
    if (gameResult) {
      return gameResult;
    }
    const { icon1 } = getActivePlayer();

    const placementResult = curBoard.addXorO(icon1, location);
    if (placementResult) {
      numberOfPlays++;
      console.log(curBoard);
      if (calculateTie()) {
        gameResult = "Tie";
      } else if (calculateWinner()) {
        gameResult = calculateWinner();
      }
    }

    return placementResult;
  };

  return {
    startGame,
    getActivePlayer,
    getGameResult,
    playRound,
    curBoard,
  };
})();

const displayController = (() => {
  let curGame = gameController;
  const squares = document.getElementsByClassName("tic-tac-square");
  const squaresArray = Array.from(squares);

  const resetBtn = document.getElementById("reset");

  const winnerTitle = document.getElementById("winner-title");

  const displayResult = (result) => {
    if (result === 'Tie') {
      winnerTitle.innerHTML = `The Game is a ${result}`;
    } else {
      winnerTitle.innerHTML = `The Winner is ${result}`;
    }
  };

  const setSquare = (button) => {
    const location = button.id.charAt(button.id.length - 1);
    const curIcon = curGame.getActivePlayer().icon1;
    const result = curGame.playRound(location);
    if (curGame.getGameResult() && !result) {
      alert(`The winner is ${curGame.getGameResult()}`);
    } else if (!result) {
      alert("Can't place icon there");
    } else if (curGame.getGameResult() && result) {
      displayResult(curGame.getGameResult());
      button.innerText = curIcon;
    } else if (result) {
      button.innerText = curIcon;
    }
  };

  const resetDisplay = () => {
    curGame.startGame();
    winnerTitle.innerHTML = "";
    squaresArray.forEach((button) => {
      button.innerHTML = "";
    });
  };

  squaresArray.forEach((button) => {
    button.addEventListener("click", () => setSquare(button));
  });

  resetBtn.addEventListener("click", () => resetDisplay());
})();
