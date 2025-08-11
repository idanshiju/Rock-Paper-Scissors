const MAX_ROUNDS = 5;
let humanScore = 0;
let computerScore = 0;
let round = 1;
let isAnimating = false;

const roundDisplay = document.querySelector(".round h2");
const scoreDisplay = document.querySelector(".round h3");
const computerDisplay = document.querySelector(".computer");
const resultDisplay = document.querySelector(".result");
const buttonsContainer = document.querySelector(".buttons");
const restartBtn = document.querySelector(".restart");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) return "human";
  return "computer";
}

function handleChoice(humanChoice) {
  if (isAnimating || round > MAX_ROUNDS) return; // guard
  isAnimating = true;

  const computerChoice = getComputerChoice();

  // Create human choice element
  const playerEl = document.createElement("div");
  playerEl.classList.add("choice", "player", "slide-in");
  playerEl.style.backgroundImage = `url(images/leftHand/${humanChoice}L.png)`;

  // Replace buttons with player choice
  buttonsContainer.parentNode.replaceChild(playerEl, buttonsContainer);

  // Create computer choice element
  const computerEl = document.createElement("div");
  computerEl.classList.add("choice", "computer", "slide-in");
  computerEl.style.backgroundImage = `url(images/rightHand/${computerChoice}R.png)`;

  const computerParent = computerDisplay.parentNode;
  computerParent.replaceChild(computerEl, computerDisplay);

  // Update scores
  const result = playRound(humanChoice, computerChoice);
  if (result === "human") humanScore++;
  else if (result === "computer") computerScore++;

  // Per-round message (wire up .result you already have)
  resultDisplay.style.color = "#ffffffff";
  resultDisplay.textContent =
    result === "tie" ? "It's a tie this round."
    : result === "human" ? "You win this round!"
    : "Computer wins this round.";

  scoreDisplay.textContent = `${humanScore} : ${computerScore}`;
  roundDisplay.textContent = `ROUND: ${round}`;
  round++;

  // After delay, slide out choices and bring buttons back or end game
  setTimeout(() => {
    playerEl.classList.replace("slide-in", "slide-out");
    computerEl.classList.replace("slide-in", "slide-out");

    setTimeout(() => {
      if (round <= MAX_ROUNDS) {
        // Put back original elements
        playerEl.parentNode.replaceChild(buttonsContainer, playerEl);
        computerEl.parentNode.replaceChild(computerDisplay, computerEl);
        computerDisplay.style.backgroundImage = "";
        isAnimating = false; // allow next input
      } else {
        // Game over — show result
        let finalMessage;
        if (humanScore > computerScore) finalMessage = "🎉 You Win!";
        else if (humanScore < computerScore) finalMessage = "🤖 Computer Wins!";
        else finalMessage = "🤝 It's a Tie!";

        resultDisplay.style.display = "none";
        roundDisplay.innerHTML = `Game Over<br>${finalMessage}`;
        scoreDisplay.textContent = `${humanScore} : ${computerScore}`;
        restartBtn.style.display = "inline-block";
        restartBtn.addEventListener("click", () => location.reload(), { once: true });
      }
    }, 500);
  }, 1500);
}

// Attach event listeners to buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => handleChoice(button.dataset.choice));
});

//Preload hand images to avoid first-use flicker
["rock","paper","scissors"].forEach(name => {
  ["images/leftHand/"+name+"L.png","images/rightHand/"+name+"R.png"].forEach(src=>{
    const img = new Image(); img.src = src;
  });
});
