// Call the question id's
const questionElement = document.querySelector(".question");
const descriptionElement = document.querySelector(".description");
// Call the button id's
const startButton = document.querySelector("#start-btn");
const answerButtons = document.querySelectorAll(".answerBtn");
const answers = document.querySelector(".button-grid");
const highscoresButton = document.querySelector("#highscores");
const restart = document.querySelector("#home");

// Timer Function
const timerElement = document.querySelector("#timer");
let timeLeft = 60;
let timerId;

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
  }, 1000);
}

function restartQuiz() {
  location.reload();
}

// Question variables
let currentQuestionIndex = 0;
let score = 0;

// Question Array

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<js>", "<scripting>", "<javascript>"],
    correctAnswerIndex: 0,
  },
  {
    question: "How do you write Hello World in an alert box?",
    answers: [
      'msg("Hello World")',
      'alertBox("Hello World")',
      'alert("Hello World")',
      'msgBox("Hello World")',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Javascript is an _______ language?",
    answers: [
      "Object-Based",
      "Object-Oriented",
      "Procedural",
      "None of the above",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "What does the ‘toLocateString()’ method do in JS?",
    answers: [
      "Returns a localised object representation",
      "Returns a parsed string",
      "Returns a localized string representation of an object",
      "None of the above",
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Which of the following are closures in Javascript?",
    answers: ["Variables", "Functions", "Objects", "All of the above"],
    correctAnswerIndex: 3,
  },
];
// Need a function for the start quiz button
function startQuiz() {
  startButton.style.display = "none";
  descriptionElement.style.display = "none";
  answers.style.display = "block";

  showQuestion();
  startTimer();
}

// Questions
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = question.answers[i];
  }
}

// Function to detect whether answer was correct
function checkAnswer(event) {
  const selectedButton = event.target;
  const question = questions[currentQuestionIndex];
  const correctAnswerIndex = question.correctAnswerIndex;

  if (selectedButton.textContent === question.answers[correctAnswerIndex]) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
    leaderboard.classList.add("show");
  }
}

function endQuiz() {
  clearInterval(timerId);

  // Hide quiz elements
  questionElement.style.display = "none";
  answers.style.display = "none";

  // Show highscore page elements
  leaderboard.classList.add("show");

  // Clear existing highscores
  const scoreList = document.querySelector("#scoreList");
  scoreList.innerHTML = "";

  // Retrieve highscores from local storage
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Sort highscores in descending order
  highscores.sort((a, b) => b.score - a.score);

  // Display highscores in the list
  highscores.forEach((highscore) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${highscore.name}: ${highscore.score}`;
    scoreList.appendChild(listItem);
  });

  // Add event listener to submit button
  const submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", saveHighscore);
}

function saveHighscore() {
  const nameInput = document.querySelector("#nameInput");
  const playerName = nameInput.value.trim();

  if (playerName !== "") {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Create a new highscore object
    const newHighscore = {
      name: playerName,
      score: score,
    };

    // Add the new highscore to the array
    highscores.push(newHighscore);

    // Save the updated highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Clear the input field
    nameInput.value = "";

    // Display the updated highscores
    endQuiz();
  }
}
startButton.addEventListener("click", startQuiz);

for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", checkAnswer);
}
