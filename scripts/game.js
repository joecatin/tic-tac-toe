import { Gameboard } from "./gameboard.js";

let smart = false;

const toggleMode = () => {
    smart = (smart)? false : true;
    const mode = document.getElementById("mode");
    mode.src = `assets/${(smart)? "random" : "smart"}.png`;
}

const gameTied = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => { cell.classList.add("win"); });    
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
    if (outcome === "tied") gameTied();
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
            resolve(Gameboard.botPlays(smart))
        }, 250);
    });
    botMove.then(result => {
        if (result) gameover(result);
    }).catch(error => console.log(error))

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

export { reset, smart, toggleMode };