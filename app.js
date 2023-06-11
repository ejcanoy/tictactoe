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
  let player1 = player("Player 1", "player", "X");
  let player2 = player("Player 2", "player", "O");
  let numberOfPlays = initialNumTurns;
  let gameResult;

  const startGame = () => {
    numberOfPlays = initialNumTurns;
    player1 = player("Player 1", "player", "X");
    player2 = player("Player 2", "player", "O");
    curBoard.resetBoard();
    gameResult = undefined;
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
        curBoard.board[a] &&
        curBoard.board[a] === curBoard.board[b] &&
        curBoard.board[a] === curBoard.board[c]
      ) {
        return curBoard.board[a];
      }
    }

    return null;
  };

  const calculateTie = () => {
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
  const curGame = gameController;
  const squares = document.getElementsByClassName("tic-tac-square");
  const squaresArray = Array.from(squares);
  const resetBtn = document.getElementById("reset");
  const winnerTitle = document.getElementById("winner-title");
  const playerTurn = document.getElementById("turn-title");

  const updateScreen = () => {
    if (curGame.getGameResult() === "X" || curGame.getGameResult() === "O") {
      winnerTitle.innerHTML = `The Winner is a ${curGame.getGameResult()}`;
      playerTurn.innerText = '';
    } else if (curGame.getGameResult() === "Tie") {
      winnerTitle.innerHTML = `The Game is a ${curGame.getGameResult()}`;
      playerTurn.innerText = '';
    } else {
      playerTurn.innerText = `${curGame.getActivePlayer().name1} - ${
        curGame.getActivePlayer().icon1
      } turn`;
    }
    console.log(gameController.curBoard.board.length);
    for (let i = 0; i < gameController.curBoard.board.length; i++) {
      if (gameController.curBoard.board[i] === undefined) {
        squaresArray[i].innerText = "";
      } else {
        squaresArray[i].innerText = gameController.curBoard.board[i];
      }
    }
  };

  const handleClick = (button) => {
    if (button) {
      const location = button.id.charAt(button.id.length - 1);
      const result = curGame.playRound(location);
      if (!result) {
        alert("Can't place icon there");
      }
    } else {
      curGame.startGame();
    }
    updateScreen();
  };

  squaresArray.forEach((button) => {
    button.addEventListener("click", () => handleClick(button));
  });

  resetBtn.addEventListener("click", () => handleClick(undefined));
  updateScreen();
})();
