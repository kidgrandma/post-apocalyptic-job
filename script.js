document.getElementById("start-quiz").addEventListener("click", startQuiz);

let currentQuestion = 0;
let userAnswers = [];

const questions = [
    {
        question: "Welcome 2 the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "Jump out window", "SCREAM"],
        scores: [1, 2, 3]
    },
    {
        question: "Question 2: Choose a color",
        answers: ["Red", "Blue", "Green"],
        scores: [3, 1, 2]
    }
    // Add more questions here
];

function startQuiz() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("question-page").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const current = questions[currentQuestion];
    document.getElementById("question-text").innerText = current.question;
    
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

function selectAnswer(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";
    
    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    const resultTitle = totalScore > 5 ? "You're Type A!" : "You're Type B!";
    document.getElementById("result-title").innerText = resultTitle;
    document.getElementById("result-description").innerText = "Description of the result goes here.";
}

document.getElementById("retake-quiz").addEventListener("click", () => {
    userAnswers = [];
    currentQuestion = 0;
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
});
