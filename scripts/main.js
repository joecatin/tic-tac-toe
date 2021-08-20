import { reset } from "./game.js";

document.querySelector("body").addEventListener("click", reset);
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

reset();