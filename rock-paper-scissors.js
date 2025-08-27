let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

document.querySelector(".js-reset-button").addEventListener("click", () => {
  showResetConfirmation();
});

const confirmationMessage = document.querySelector(".js-confirmation-message");

function showResetConfirmation() {
  confirmationMessage.innerHTML = `
    Are you sure you want to reset the score? <button class='js-reset-confirm-yes'> Yes </button> 
    <button class='js-reset-confirm-no'> No </button>`;

  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      confirmationMessage.innerText = "";
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      confirmationMessage.innerText = "";
    });
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
  console.log("Score was reset!");
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

document
  .querySelector(".js-autoplay-button")
  .addEventListener("click", (event) => {
    autoPlay();
  });

// const autoPlay = () => {
// };

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      // so that the player move is randomly selected by the computer itself.
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-autoplay-button").textContent = "Stop play";
  } else {
    //to stop the setInterval function
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-autoplay-button").textContent = "Auto play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

//to provide functionality if we press any key while on the browser then that certain action should be performed.
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") playGame("rock");
  else if (event.key === "p") playGame("paper");
  else if (event.key === "s") playGame("scissors");
  else if (event.key === "a") autoPlay();
  else if (event.key === "Backspace") showResetConfirmation();
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You win!";
    } else {
      result = "You lose.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You win!";
    } else {
      result = "You lose.";
    }
  } else {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You win!";
    } else {
      result = "You lose.";
    }
  }

  if (result === "You win!") score.wins += 1;
  else if (result === "You lose.") score.losses += 1;
  else score.ties += 1;

  //as localStorage only supports strings, so we convert our object into a string using JSON
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="/images/${playerMove}-emoji.png" alt="paper-emoji">  <img src="/images/${computerMove}-emoji.png" alt="paper-emoji"> Computer`;
}

