const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Get audio elements
const winSound = document.getElementById("winSound");
const tieSound = document.getElementById("tieSound");
const clickSound = document.getElementById("clickSound");
const newGameStart = document.getElementById("newGameStart");
const sampleAudio = document.getElementById("sampleAudio");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // Reset UI and enable all boxes
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // Play new game start sound
    newGameStart.play();

    // Set the volume for the background music and play it
    sampleAudio.volume = 0.04; // Set volume to 10%
    sampleAudio.loop = true;
}

initGame();

// Function to swap the turn
function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Function to check if the game is over
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // Check if all 3 boxes are non-empty and have the same value
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            // We have a winner
            answer = gameGrid[position[0]];

            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Highlight the winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // If we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");

        // Play win sound
        winSound.play();
        return;
    }

    // Check for a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");

        // Play tie sound
        tieSound.play();
    }
}

// Function to handle box clicks
function handleClick(index) {
    if (gameGrid[index] === "") {
        // Update the UI
        boxes[index].innerText = currentPlayer;
        // Update the game grid
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // Play click sound
        clickSound.play();

        // Swap the turn
        swapTurn();

        // Check if the game is over
        checkGameOver();
    }
}

// Add click event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

// Add click event listener to the new game button
newGameBtn.addEventListener("click", initGame);

// Add click event listener to the document to play background audio
document.addEventListener("click", (event) => {
    if (event.target !== sampleAudio) {
        sampleAudio.play();
    }
});
