import { reset, smart, toggleMode } from "./game.js";

document.querySelector("body").addEventListener("click", reset);
const resetButton = document.getElementById("reset");
resetButton.src = "assets/reset.png";
resetButton.addEventListener("click", reset);

const mode = document.getElementById("mode");
mode.src = `assets/${(smart)? "random" : "smart"}.png`;
mode.addEventListener("click", toggleMode);

reset();