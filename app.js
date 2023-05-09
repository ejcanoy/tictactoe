let blankBoard = new Array(3);

for(let i = 0; i < blankBoard.length; i++){
    blankBoard[i] = new Array(3);
    for (j = 0; i < blankBoard[i].length; i++) {
        blankBoard[i][j] = "";
    }
}


blankPlayer = player( "", "", "");

const player = ( name, type, icon) => {
    const name = name;
    const type = type;
    const icon = icon;

    return {
        name,
        type,
        icon
    }
}

const initialNumTurns = 0;

const gameBoard = (() => {
    const board = blankBoard;

    const canPlace = (location) => {
        return board[location[0], location[1]] === "";
    }

    const addXorO = (type, location) => {
        if (canPlace(location)) {
            board[location[0], location[1]] = type;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board = blankBoard;
    }

    return {
        board,
        addXorO,
        resetBoard
    }
})()


const gameController = (() => {
    let curBoard;
    let player1;
    let player2;
    let numberOfPlays;

    const startGame = () => {
        numberOfPlays = 0;
        player1 = player("player 1", "player", "X");
        player2 = player("player 2", "player", "O");
        curBoard = gameBoard();
    }

    const playRound = (location) => {
        if (isGameOver()) return;
        const icon = (getActivePlayer()).icon;
        curBoard.addXorO(icon);
    }

    getActivePlayer = () => {
        if (numberOfPlays % 2) {
            return player1;
        } else {
            return player2;
        }
    }

    const isGameOver = () => {
        return (calculateWinner() || calculateTie());
    }

    const calculateWinner = () => {
        const winner = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winner.length; i++) {
            const [a, b, c] = lines[i];
            if (curBoard[a] && curBoard[a] === curBoard[b] && curBoard[a] === curBoard[c]) {
                return curBoard[a];
            }
        }

        return null;
    }

    const calculateTie = () => {
        for (let i = 0; i < curBoard.length; i++) {
            if (curBoard[i] === "") return null;
        }
        return true;
    }

    return {
        startGame,
        playRound,
    }


})()


// const displayController = (() => {
    
//     // displayBoard

//     // displayActivePlayer

//     const handleClick = () => {
//         // if there is something there or isWinner?
//     }

// })()




