// Call the question id's
const questionElement = document.querySelector(".question");
const descriptionElement = document.querySelector(".description");
// Call the button id's
const startButton = document.querySelector("#start-btn");
const answerButtons = document.querySelectorAll(".answerBtn");

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

// Question variables
let currentQuestionIndex = 0;
let score = 0;

// Question Array

const questions = [
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 0,
  },
];
// Need a function for the start quiz button
function startQuiz() {
  startButton.style.display = "none";
  descriptionElement.style.display = "none";
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
  }
}
// Highscore enter screen
function endQuiz() {
  clearInterval(timerId);
  console.log("Quiz ended. Score: " + score);
}

startButton.addEventListener("click", startQuiz);

for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", checkAnswer);
}
