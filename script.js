document.getElementById("start-quiz").addEventListener("click", startQuiz);

let currentQuestion = 0;
let userAnswers = [];

// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome 2 the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "SCREAM", "Jump out window"],
        scores: [1, 3, 2],
        gif: "images/question1-illustration.gif"
    },
    {
        question: "Thank gosh you got out of there alive. Death by science guy would have been a weird way to go out. It’s breakfast time! Choose a BUDDY™️ to forage for food:",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [2, 3, 1],
        gif: "images/question2-illustration.gif"
    },
    {
        question: "Great work! You and your BUDDY™️ need to grab something to eat, where ya headed?",
        answers: ["Waffle House", "Steal from someone's kid", "Street fighter for it"],
        scores: [1, 2, 3],
        gif: "images/question3-illustration.gif"
    },
    {
        question: "Uh oh! Not enough food for you and BUDDY™️ - what do you do?",
        answers: ["Kill BUDDY™️", "Share food with BUDDY™️", "Sell BUDDY™️"],
        scores: [3, 1, 2],
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where do you go?",
        answers: ["Abandoned DMV", "Mojo Dojo Casa House", "Spirit Halloween"],
        scores: [3, 2, 1],
        gif: "images/question5-illustration.gif"
    }
];

// Define question 6A, 6B, and 6C with correct file paths for GIFs
const question6A = {
    question: "You’ve been kidnapped by post-apocalyptic club kids! The bag's out and they've been carpet farming for months. How do you escape?",
    answers: ["Agua gun", "Bible", "Butter knife"],
    scores: [1, 2, 3],
    gif: "images/6a-illustration.gif"
};

const question6B = {
    question: "Ahh, the good old Olsen bait and switch. You're tied to the bed while they take turns reading your birth chart. How do you escape?",
    answers: ["Bible", "Agua gun", "Butter knife"],
    scores: [2, 1, 3],
    gif: "images/6b-illustration.gif"
};

const question6C = {
    question: "We’re never closing!! You’re trapped inside an out-of-season Spirit Halloween with the Homicidal Power Ranger while he cries and reads Edgar Allen Poe Wikipedia facts. How do you escape?",
    answers: ["Agua gun", "Butter knife", "Bible"],
    scores: [1, 3, 2],
    gif: "images/6c-illustration.gif"
};

// After answering 6A, 6B, or 6C, redirect back to question 7
function selectAnswer(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);

    if (currentQuestion === '6A' || currentQuestion === '6B' || currentQuestion === '6C') {
        currentQuestion = 6;  // Go to question 7 after answering 6A, 6B, or 6C
        questions.splice(6, 0, question7);  // Insert Question 7
        showQuestion();
    } else if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Function to display custom questions (like 6A, 6B, 6C) and move to next stage
function showCustomQuestion(customQuestion) {
    document.getElementById("question-text").innerText = customQuestion.question;
    document.getElementById("question-illustration").src = customQuestion.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    customQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

// For branching after question 5
function selectAnswerForQuestion5(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);

    if (answerIndex === 0) {
        currentQuestion = '6A';
        showCustomQuestion(question6A);
    } else if (answerIndex === 1) {
        currentQuestion = '6B';
        showCustomQuestion(question6B);
    } else {
        currentQuestion = '6C';
        showCustomQuestion(question6C);
    }
}
};

// Question 7
const question7 = {
    question: "Great work. Now that you found shelter, food, and a weapon—you’ve become quite the dickhead and your aura points are BANKRUPT. How will you repent?",
    answers: ["Rehab", "Double down at the casino"],
    scores: [1, 2],
    gif: "images/question7-illustration.gif"
};

// Question 8 and beyond
const question8 = {
    question: "Surprise! It’s a water witch and they've granted you three wishes in exchange for all your supplies.",
    answers: ["Wishy wish", "No deal", "Amateur massage"],
    scores: [3, 1, 2],
    gif: "images/question8-illustration.gif"
};

const question9 = {
    question: "Oh no! You’ve been ROBBED. I guess this is the end. How do you go out?",
    answers: ["OD on cigarettes", "Hadouken"],
    scores: [1, 3],
    gif: "images/question9-illustration.gif"
};

const question10 = {
    question: "You’ve been saved by The Protein Priest. You can join his wellness club or pledge your life to an apocalypse crew.",
    answers: ["Meet your new gang", "Hot yoga matcha baptism"],
    scores: [3, 1],
    gif: "images/question10-illustration.gif"
};

// Bonus Question 11
const question11 = {
    question: "Wellness club was a decoy. Order up before you meet your crew.",
    answers: ["Big Macintosh meal", "Pedialyte", "Straight-up bleach"],
    scores: [2, 1, 3],
    gif: "images/question11-illustration.gif"
};

// Start the quiz
function startQuiz() {
    document.getElementById("quiz-container").classList.remove("glitch");
    document.getElementById("start-page").style.display = "none";
    document.getElementById("question-page").style.display = "block";
    showQuestion();
}

// Show the current question
function showQuestion() {
    const current = questions[currentQuestion];
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

// Handle branching after Question 5
function selectAnswer(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);

    // Handle branching logic after question 5
    if (currentQuestion === 4) {
        if (answerIndex === 0) {
            currentQuestion = '6A';
            showCustomQuestion(question6A);
        } else if (answerIndex === 1) {
            currentQuestion = '6B';
            showCustomQuestion(question6B);
        } else {
            currentQuestion = '6C';
            showCustomQuestion(question6C);
        }
    } else if (currentQuestion === '6A' || currentQuestion === '6B' || currentQuestion === '6C') {
        currentQuestion = 6;  // Go back to the normal flow after 6
        questions.splice(6, 0, question7);  // Insert Question 7
        showQuestion();
    } else if (currentQuestion === 9) {
        if (answerIndex === 1) {
            currentQuestion = '11';  // Go to Question 11
            showCustomQuestion(question11);
        } else {
            showResults();  // Go to results if they choose "Meet your new gang"
        }
    } else if (currentQuestion === '11') {
        showResults();  // After question 11, go to results
    } else if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// For custom questions like 6A, 6B, 6C, and 11
function showCustomQuestion(customQuestion) {
    document.getElementById("question-text").innerText = customQuestion.question;
    document.getElementById("question-illustration").src = customQuestion.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    customQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

// Calculate and display results
function showResults() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);

    // Handle results based on the score
    let outcome;
    if (totalScore < 10) {
        outcome = "Homicidal Power Ranger";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Homicidal Power Ranger";
        document.getElementById("result-image").src = "images/outcome2.png";
    } else if (totalScore < 15) {
        outcome = "Caffeine Nicotine Cartel";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Caffeine Nicotine Cartel";
        document.getElementById("result-image").src = "images/outcome11.png";
    } else if (totalScore < 20) {
        outcome = "Hermes Shredders";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Hermes Shredders";
        document.getElementById("result-image").src = "images/outcome8.png";
    } else if (totalScore < 25) {
        outcome = "The DMV (Club Kids)";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of The DMV (Club Kids)";
        document.getElementById("result-image").src = "images/outcome7.png";
    } else if (totalScore < 30) {
        outcome = "Internet Preservation Society";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Internet Preservation Society";
        document.getElementById("result-image").src = "images/outcome9.png";
    } else if (totalScore < 35) {
        outcome = "Protein Priest";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Protein Priest";
        document.getElementById("result-image").src = "images/outcome12.png";
    } else if (totalScore < 40) {
        outcome = "Tupperware Tammy";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of Tupperware Tammy";
        document.getElementById("result-image").src = "images/outcome3.png";
    } else if (totalScore < 45) {
        outcome = "Soap Saviors";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Soap Saviors";
        document.getElementById("result-image").src = "images/outcome1.png";
    } else if (totalScore < 50) {
        outcome = "Radioactive Radio Media Empire";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of Radioactive Radio Media Empire";
        document.getElementById("result-image").src = "images/outcome10.png";
    } else if (totalScore < 55) {
        outcome = "The Olsen Twins";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of The Olsen Twins";
        document.getElementById("result-image").src = "images/outcome4.png";
    } else if (totalScore < 60) {
        outcome = "Used Bar Salesman";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Used Bar Salesman";
        document.getElementById("result-image").src = "images/outcome5.png";
    } else if (totalScore < 65) {
        outcome = "Unfortune Teller";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Unfortune Teller";
        document.getElementById("result-image").src = "images/outcome6.png";
    } else {
        outcome = "Museum of Car Parts";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Museum of Car Parts";
        document.getElementById("result-image").src = "images/outcome13.png";
    }

    document.getElementById("result-description").innerText = "You are now part of the " + outcome + " crew!";
}

// Retake quiz
document.getElementById("retake-quiz").addEventListener("click", () => {
    userAnswers = [];
    currentQuestion = 0;
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
});

// Redirect to website
document.getElementById("meet-moderator").addEventListener("click", () => {
    window.location.href = "https://worksucks.net";
});
