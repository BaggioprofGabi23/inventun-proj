const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
        answer: "Brasília"
    },
    {
        question: "Quantos planetas existem no sistema solar?",
        options: ["7", "8", "9", "10"],
        answer: "8"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Charles Dickens", "Jorge Luis Borges"],
        answer: "Miguel de Cervantes"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submitBtn");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";

    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        optionsElement.appendChild(button);
        button.addEventListener("click", checkAnswer);
    });
}

function checkAnswer(event) {
    const selectedOption = event.target.innerText;
    const currentQuizData = quizData[currentQuestion];

    if (selectedOption === currentQuizData.answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.innerText = "Quiz Concluído!";
    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
    scoreElement.innerText = `Você marcou ${score} de ${quizData.length} pontos.`;
}

loadQuestion();
