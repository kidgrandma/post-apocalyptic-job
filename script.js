document.getElementById("start-quiz").addEventListener("click", startQuiz);

let currentQuestion = 0;
let userAnswers = [];

const questions = [
    {
        question: "Welcome 2 the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "Jump out window", "SCREAM"],
        scores: [1, 2, 3],
        illustration: "images/question1-illustration.gif"
    },
    {
        question: "Thank gosh you got out of there alive. Death by science guy would have been a weird way to go out. It’s breakfast time! Choose a BUDDY™️ to forge for food:",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [3, 1, 2],
        illustration: "images/question2-illustration.gif"
    }
];

function startQuiz() {
    document.getElementById("quiz-container").classList.remove("glitch");
    document.getElementById("start-page").style.display = "none";
    document.getElementById("question-page").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const questionPage = document.getElementById("question-page");

    // Add the slide-enter class for sliding effect
    questionPage.classList.add('slide-enter');
    
    // Small delay to trigger the animation
    setTimeout(() => {
        questionPage.classList.remove('slide-enter');
        questionPage.classList.add('slide-enter-active');
    }, 10);

    const current = questions[currentQuestion];
    
    // Update question text and illustration
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.illustration;

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
    const resultPage = document.getElementById("result-page");
    
    // Add the fade-in class for the results
    resultPage.classList.add('show');
    resultPage.style.display = "block";

    document.getElementById("question-page").style.display = "none";
    
    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    const resultTitle = totalScore > 5 ? "You're Type A!" : "You're Type B!";
    document.getElementById("result-title").innerText = resultTitle;
    document.getElementById("result-description").innerText = "Description of the result goes here.";
}

document.getElementById("retake-quiz").addEventListener("click", () => {
    userAnswers = [];
    currentQuestion = 0;
    
    // Reset classes and view
    document.getElementById("result-page").classList.remove('show');
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
});
