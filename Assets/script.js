let score = 0;

const questions = [
    {
        question: "What is Javascript?",
        options: ["A gaming company", "A programming language", "A coffee shop"],
        correct: 1,
    },
    {
        question: "What is a function?",
        options: ["A set of statements that perform a task", "A gathering of friends", "The ability to complete a purpose"],
        correct: 0,
    },
    {
        question: "What does 'const' mean in Javascript?",
        options: ["Constable", "Constantinople", "Constant"],
        correct: 2,
    },
    {
        question: "An if/else statement is apart of JavaScript's ____ statements",
        options: ["Awesome", "Conditional", "Final"],
        correct: 1,
    },
    {
        question: "The creator of JavaScript is named _____",
        options: ["Brendan Eich", "Steve Jobs", "Todd Howard"],
        correct: 0,
    },
];

const startButton = document.getElementById("start-button");
const timeLeft = document.getElementById("time-left");
const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const scoreValue = document.getElementById("score-value");
const initials = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

let currentQuestionIndex = 0;
let timer;
let time = 900;

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";
    displayQuestion(currentQuestionIndex);
    timer = setInterval(updateTimer, 1000);
}

optionsList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const selectedOption = e.target.innerText;
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.options.indexOf(selectedOption) === currentQuestion.correct) {
            score++;
            updateScore();
        } else {
            time -= 120;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            endGame();
        }
    }
});

submitScoreButton.addEventListener("click", () => {
    const userInitials = initials.value;
    
    if (userInitials) {
        saveHighScore(userInitials, score);
    }
});

function saveHighScore(userInitials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    const newScore = {
        initials: userInitials,
        score: score,
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoreList = document.getElementById("high-score-list");

    highScoreList.innerHTML = "";

    highScores.forEach((score, index) => {
        const scoreItem = document.createElement("li");
        scoreItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoreList.appendChild(scoreItem);
    });
}

function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionText.innerText = `Question ${index + 1}: ${currentQuestion.question}`;
    optionsList.innerHTML = currentQuestion.options.map((option, idx) => `<li>${option}</li>`).join("");
}

function updateTimer() {
    if (time > 0) {
        time--;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeLeft.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionText.innerText = "Game Over";
    optionsList.style.display = "none";
    initials.style.display = "block";
    submitScoreButton.style.display = "block";
    displayHighScores();
}

function updateScore() {
    scoreValue.textContent = score;
}

displayHighScores();
