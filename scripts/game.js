import { Gameboard } from "./gameboard.js";

const gameTied = () => {
    let cells = document.querySelectorAll(".cell");
    cells.classList.add("win");
    return true;
}

const gameWon = (cells) => {
    cells.forEach(index => {
        let cell = document.getElementById(index);
        cell.classList.add("win");
    });
    return true;
}

const gameover = (outcome) => {
    if (outcome === "tie") gameTied();
    else gameWon(outcome);

    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => { cell.removeEventListener("click", play); });

    return true;
}


const play = (e) => {

    e.stopPropagation();

    let userMove = Gameboard.userPlays(e.target.id);
    if (userMove) { 
        if (userMove === "busy") return false;
        else return gameover(userMove);
    }; 

    let botMove = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Gameboard.botPlays(false))
        }, 250);
    });
    botMove.then(result => {
        if (result) { 
            if (result === "busy") return false;
            else return gameover(botMove);
        };
    })

    return true;
}

const flush = () => {
    Gameboard.reset();
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => { 
        cell.addEventListener("click", play); 
        cell.classList.remove("win");
    });
    return true
}

const reset = (e) => {
    if (e) {
        if (e.target.id === "reset") return flush();
        else if (Gameboard.isGameOver()) return flush();
        else return false; 
    } else return flush();       
}

export { reset };