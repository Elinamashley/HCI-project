const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 30; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#E1DF27", "#FFA21C"],
        
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}

// function startQuiz() {
//   startButton.textContent = "Next";
//   startButton.classList.add("hide");
//   shuffledQuestions = questions.sort(() => Math.random() - 0.5);
//   currentQuestionIndex = 0;
//   questionContainer.classList.remove("hide");
//   setNextQuestion();
//   startTimer(timeLeft, timerElement);
// }

function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}


// function setNextQuestion() {
//   resetState();
//   showQuestion(shuffledQuestions[currentQuestionIndex]);
// }
function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}
// function showQuestion(question) {
//   questionElement.innerText = question.question;
//   question.answers.forEach((answer) => {
//     const button = document.createElement("button");
//     button.innerText = answer.text;
//     button.classList.add("answer-button");
//     if (answer.correct) {
//       button.dataset.correct = answer.correct;
//     }

//     button.addEventListener("click", selectAnswer);
//     answerButtonsElement.appendChild(button);
//   });
// }

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// function selectAnswer(e) {
//   const selectedButton = e.target;
//   let correct = selectedButton.dataset.correct;
//   if (correct) {
//     marks = marks + 1;
//     score.textContent = marks;
//     console.log(marks, "score");
//   }
//   setStatusClass(document.body, correct);
//   Array.from(answerButtonsElement.children).forEach((button) => {
//     setStatusClass(button, button.dataset.correct);
//   });
//   if (shuffledQuestions.length > currentQuestionIndex + 1) {
//     nextButton.classList.remove("hide");
//   } else {
//     startButton.innerText = "Restart";
//     startButton.classList.remove("hide");
//   }
// }

function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "DVD' was invented and developed by?",
    answers: [
      { text: "both sony and panasonic", correct: true },
      { text: "Panasonic", correct: false },
      { text: "Sony", correct: false },
    ],
  },
  {
    question: "Frequency modulation radio 'FM' was invented by?",
    answers: [
      { text: "Gerald Pearson", correct: false },
      { text: "Edwin Howard Armstrong ", correct: true },
      { text: "Daryl Chapin", correct: false },
      { text: "All the above", correct: false },
    ],
  },
  {
    question: "Atomic bomb was first successfully developed by?",
    answers: [
      { text: " United States", correct: true },
      { text: " Russia", correct: false },
       
    ],
  },
  {
    question: "The World Wide Web was first publicly introduced in?",
    answers: [
      { text: "1980", correct: false },
      { text: "1970", correct: false },
      { text: "1990", correct: true },
      { text: "1940", correct: false },
    ],
  },
  {
    question: "What does 'ATM' stands for?",
    answers: [
      { text: " Automated Transactions of Money", correct: false },
      { text: " Automated Teller Machine", correct: true },
    ],
  },
  {
    question: "Who was the first person to walk on the moon?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Kofi Brymo", correct: false },
      { text: "Neil Armstrong.", correct: true },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Printing press was invented by?",
    answers: [
      { text: "Johannes Gutenberg", correct: true },
      { text: "George Antheil", correct: false },
      { text: "Victor Adler", correct: false },
      { text: "Elinam Ashley", correct: false },
    ],
  },
  {
    question: "ENIAC stands for __________.?",
    answers: [
      { text: " Electronic Numerical Integrator And Computer", correct: true },
      { text: " Electronic Numerical Integrator And Calculator", correct: false },
    ],
  },
  {
    question: "Which was the first commercial computer?",
    answers: [
      { text: " Ferranti Mark 1", correct: true },
      { text: "Difference Engine", correct: false },
    ],
  },
  {
    question: "Which was the first electronics digital programmable computing device?",
    answers: [
      { text: "Difference Engine", correct: false },
      { text: "Analytical Engine", correct: false },
      { text: "ENIAC", correct: false },
      { text: "Colossus", correct: true },
    ],
  },
]; 