const isCombinationWon = arr => {
    if (arr.every(val => (val !== "" && val === arr[0]))) return arr[0];
    else return false;
} 

const Gameboard = (() => {
    let board = {
        1: "", 2: "", 3: "",
        4: "", 5: "", 6: "",
        7: "", 8: "", 9: ""
    };

    const wins = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], 
        [1, 4, 7], [2, 5, 8], [3, 6, 9], 
        [1, 5, 9], [3, 5, 7]
    ];

    const print = () => {          
        Object.entries(board).forEach(cell => {
            let div = document.getElementById(cell[0]);  
            div.innerHTML = (cell[1] === "")? 
            "" : `<img src="assets/${cell[1]}.png" alt="${cell[1]}">`;
        });
    }

    const reset = () => {
        for (const [key, cell] of Object.entries(board)) board[key] = "";
        print();
    }

    const isCellFree = (index) => {return board[index] === ""};

    const freeCells = () => {
        let freeCells = [];
        Object.entries(board).forEach(cell => {
            if (isCellFree(cell[0])) freeCells.push(cell[0])
        });
        return freeCells;
    }

    const isBoardFull = () => {
        return (freeCells().length > 0)? false : true;
    };

    const isGameWon = () => {
        let outcomes = [];
        wins.forEach(win => {
            let values = [];
            win.forEach(cell => values.push(board[cell]));
            if (isCombinationWon(values)) outcomes.push(win)
        });
        outcomes = outcomes.filter(Boolean);
        if (outcomes.length > 0) return outcomes[0]; else return false
    }

    const isGameTied = (won) => {
        let full = isBoardFull();
        return (won)? false : (full)? "tied" : false;
    }

    const isGameOver = () => {
        let won = isGameWon();
        let tied = isGameTied(won);
        if (won || tied) return [won, tied].filter(Boolean)[0];
        else return false
    }

    const whoWonGame = (winningCombination) => {
        return board[winningCombination[0]];
    }

    const move = (colour, index) => {
        if (isCellFree(index)) { 
            board[index] = colour;
            print();
            return true; 
        } else return "busy";
    }

    const botPlaysRandom = () => {
        let availableCells = freeCells();
        let length = availableCells.length; 
        if (length > 0) {
            let index = availableCells[Math.floor(Math.random() * length)];
            move("tac", index);
            return isGameOver();        
        } else return false;
    }

    const botPlaysSmart = () => {
        let bestScore = -Infinity;
        let bestMove = 0;

        for (const key in board) {
            if (board[key] === "") {
                board[key] = "tac";
                let score = minimax(false);
                board[key] = "";
                if (score > bestScore) {bestScore = score; bestMove = key}
            }
        };
        move("tac", bestMove);   
        return isGameOver();     
    }

 
    const minimax = (max) => {
        // return 1;
        let outcome = isGameOver();
        if (outcome){
            if (Array.isArray(outcome)) {
                let winner = whoWonGame(outcome);
                if (winner === "tac") return 1;
                else if (winner === "tic") return -1;
            } else if (outcome === "tied") return 0;
        }
        
        if (max) {
            let bestScore = -Infinity;
            for (const key in board) {
                if (board[key] === "") {
                    board[key] = "tac";
                    let score = minimax(false);
                    board[key] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (const key in board) {
                if (board[key] === "") {
                    board[key] = "tic";
                    let score = minimax(true);
                    board[key] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    const userPlays = (index) => { 
        let outcome = move("tic", index);
        if (outcome === "busy") return outcome;
        else return isGameOver();
    } 

    const botPlays = (smart) => { 
        if (smart) return botPlaysSmart();
        else return botPlaysRandom();
    }

    return {userPlays, botPlays, isGameOver, reset};

})();

export {Gameboard};