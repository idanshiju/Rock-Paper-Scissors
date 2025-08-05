let humanSelection = "",
  computerSelection = "";
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function getHumanChoice() {
  const choices = ["rock", "paper", "scissors"];
  let choice;
  do {
    choice = prompt("Enter rock, paper, or scissors:").toLowerCase();
  } while (!choices.includes(choice?.toLowerCase()));
  return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return "human";
  }
  return "computer";
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    console.log(`You chose: ${humanSelection}`);
    console.log(`Computer chose: ${computerSelection}`);

    const result = playRound(humanSelection, computerSelection);
    if (result === "human") {
      console.log(`You win this round!`);
      humanScore++;
    } else if (result === "computer") {
      console.log(`You lose this round!`);
      computerScore++;
    } else {
      console.log("This round is a tie!");
    }
  }

  console.log(`Final Score - You: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("🎉 You won the game!");
  } else if (humanScore < computerScore) {
    console.log("💻 Computer won the game!");
  } else {
    console.log("🤝 It's a draw!");
  }
}

playGame();
