const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Chennai", correct: false },
      { text: "Hyderabad", correct: false }
    ]
  },

  {
    question: "Which language runs in browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false }
    ]
  },

  {
    question: "2 + 2 = ?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {

  resetState();

  let currentQuestion = questions[currentQuestionIndex];

  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {

    const button = document.createElement("button");

    button.innerText = answer.text;

    button.classList.add("btn");

    answerButtons.appendChild(button);

    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {

  nextButton.style.display = "none";

  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {

  const selectedBtn = e.target;

  const correct = selectedBtn.dataset.correct === "true";

  if(correct) {
    score++;
    selectedBtn.style.background = "green";
  } else {
    selectedBtn.style.background = "red";
  }

  Array.from(answerButtons.children).forEach(button => {

    if(button.dataset.correct === "true") {
      button.style.background = "green";
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {

  currentQuestionIndex++;

  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {

  resetState();

  questionElement.innerText = `You scored ${score} out of ${questions.length}`;

  nextButton.innerText = "Play Again";

  nextButton.style.display = "block";

  nextButton.onclick = startQuiz;
}