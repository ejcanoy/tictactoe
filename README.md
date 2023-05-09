# Tic Tac Toe


## To Do List

- Things to consider
    - How can we add in the AI
    - How to give users the option to select if they wan to play with someone or AI
    - 
- [] create objects (write functions)
    - [x] gameBoard
        - is in charge of keeping track of the game and the actions required to play
        - [x] public 
            - [x] board
            - [x] addXorO 
            - [x] resetBoard
        - [x] private
            - [x] canPlace
    - [x] gameController
        - variables
            - [x] curBoard
            - [x] player1
            - [x] player2
            - [x] number of plays
        - [] public
            - [x] startGame
            - [x] playRound
        - [] private
            - [x] isGameOver
            - [x] calculate winner
            - [x] calculate tie
            - [x] getActivePlayer
    - [x] players
        - [x] private
        - [x] public
            - [x] name
                - [x] getName
            - [x] type
                - [x] getType
    - [] displayController
        - is in charge of creating the userinterface and updating it
        - [] public
            - [] displayBoard
            - [] displayActivePlayer
            - [] playRound
- [] layout
    - [] basic html page 
    - [] javascript interactive x and o
    - [] gives prompt on move
    - [] allow users to put in names
    - [] allow users to restart game
    - [] congratulates winner
- [] AI
    - [] figure out if AI can be done
