document.getElementById("start-quiz").addEventListener("click", startQuiz);

let currentQuestion = 0;
let userAnswers = [];

// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome 2 the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "SCREAM", "Jump out window"],
        scores: [2, 4, 3],  // Adjusted scoring to ensure higher priority results
        gif: "images/question1-illustration.gif"
    },
    {
        question: "Thank gosh you got out of there alive. Death by science guy would have been a weird way to go out. It’s breakfast time! Choose a BUDDY™️ to forage for food:",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [3, 5, 2],
        gif: "images/question2-illustration.gif"
    },
    {
        question: "Great work! You and your BUDDY™️ need to grab something to eat, where ya headed?",
        answers: ["Waffle House", "Steal from someone's kid", "Street fighter for it"],
        scores: [2, 3, 4],
        gif: "images/question3-illustration.gif"
    },
    {
        question: "Uh oh! Not enough food for you and BUDDY™️ - what do you do?",
        answers: ["Kill BUDDY™️", "Share food with BUDDY™️", "Sell BUDDY™️"],
        scores: [6, 2, 4],  // Higher score weight for important questions
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where do you go?",
        answers: ["Abandoned DMV", "Mojo Dojo Casa House", "Spirit Halloween"],
        scores: [6, 5, 3],
        gif: "images/question5-illustration.gif"
    }
];

// Branching logic for Question 5 to direct to custom Question 6A, 6B, or 6C
function selectAnswerForQuestion5(answerIndex) {
    userAnswers.push(questions[4].scores[answerIndex]);

    if (answerIndex === 0) {
        showCustomQuestion(question6A);  // Abandoned DMV leads to 6A
    } else if (answerIndex === 1) {
        showCustomQuestion(question6B);  // Mojo Dojo Casa House leads to 6B
    } else {
        showCustomQuestion(question6C);  // Spirit Halloween leads to 6C
    }
}

// Function to show custom Question 6A, 6B, or 6C
function showCustomQuestion(customQuestion) {
    document.getElementById("question-text").innerText = customQuestion.question;
    document.getElementById("question-illustration").src = customQuestion.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    customQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(customQuestion.scores[index]);  // Add custom question score
            showQuestion7();  // Proceed to Question 7
        });
        answersContainer.appendChild(answerButton);
    });
}

// Show Question 7 after 6A, 6B, or 6C
function showQuestion7() {
    currentQuestion = 6;
    const current = question7;

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

// Standard selectAnswer function for regular questions like 7 and beyond
function selectAnswer(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);

    if (currentQuestion === 9 && answerIndex === 1) {
        showCustomQuestion(question11);  // Bonus Question 11 if selected
    } else {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
}

// Define custom Question 6A, 6B, 6C with adjusted scores
const question6A = {
    question: "Post-apocalyptic club kids have kidnapped you! The bag's out, and they've been carpet farming for months. How do you escape?",
    answers: ["Agua gun", "Bible", "Butter knife"],
    scores: [2, 4, 6],
    gif: "images/question6a-illustration.gif"
};

const question6B = {
    question: "Ahh, the good old Olsen bait and switch. You're tied to the bed while they take turns reading your birth chart. How do you escape?",
    answers: ["Bible", "Agua gun", "Butter knife"],
    scores: [4, 2, 6],
    gif: "images/question6b-illustration.gif"
};

const question6C = {
    question: "We’re never closing!! You’re trapped inside an out-of-season Spirit Halloween with the Homicidal Power Ranger while he cries and reads Edgar Allen Poe Wikipedia facts. How do you escape?",
    answers: ["Agua gun", "Butter knife", "Bible"],
    scores: [2, 6, 4],
    gif: "images/question6c-illustration.gif"
};

// Question 7 and beyond with adjusted scores
const question7 = {
    question: "Great work. Now that you found shelter, food, and a weapon—you’ve become quite the dickhead and your aura points are BANKRUPT. How will you repent?",
    answers: ["Rehab", "Double down at the casino"],
    scores: [3, 6],
    gif: "images/question7-illustration.gif"
};

const question8 = {
    question: "Surprise! It’s a water witch and they've granted you three wishes in exchange for all your supplies.",
    answers: ["Wishy wish", "No deal", "Amateur massage"],
    scores: [6, 3, 4],
    gif: "images/question8-illustration.gif"
};

const question9 = {
    question: "Oh no! You’ve been ROBBED. I guess this is the end. How do you go out?",
    answers: ["OD on cigarettes", "Hadouken"],
    scores: [3, 6],
    gif: "images/question9-illustration.gif"
};

const question10 = {
    question: "The Protein Priest has saved you. You can join his wellness club or pledge your life to an apocalypse crew.",
    answers: ["Meet your new gang", "Hot yoga matcha baptism"],
    scores: [6, 3],
    gif: "images/question10-illustration.gif"
};
// Bonus Question 11 with adjusted scores
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

// Handle selecting an answer and moving through questions
function selectAnswer(answerIndex) {
    userAnswers.push(questions[currentQuestion].scores[answerIndex]);

    if (currentQuestion === 4) {  // Handle branch logic for Question 5
        selectAnswerForQuestion5(answerIndex);
    } else if (currentQuestion === '6A' || currentQuestion === '6B' || currentQuestion === '6C') {
        currentQuestion = 6;  // Move to Question 7 after 6A/B/C
        showQuestion7();
    } else if (currentQuestion === 9) {  // Branch logic for Question 10
        if (answerIndex === 1) {
            showCustomQuestion(question11);  // Go to Bonus Question 11
        } else {
            showResults();  // End the quiz and show results
        }
    } else {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();  // End of quiz, show results
        }
    }
}

// Calculate and display results
function showResults() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);

    // Adjusted score ranges based on total score
    let outcome;
    if (totalScore <= 12) {
        outcome = "Homicidal Power Ranger";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified accomplice of the Homicidal Power Ranger";
        document.getElementById("result-image").src = "images/outcome2.png";
    } else if (totalScore <= 15) {
        outcome = "Caffeine Nicotine Cartel";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Caffeine Nicotine Cartel";
        document.getElementById("result-image").src = "images/outcome11.png";
    } else if (totalScore <= 18) {
        outcome = "Hermes Shredders";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Hermes Shredders";
        document.getElementById("result-image").src = "images/outcome8.png";
    } else if (totalScore <= 21) {
        outcome = "The DMV (Club Kids)";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of The DMV";
        document.getElementById("result-image").src = "images/outcome7.png";
    } else if (totalScore <= 23) {
        outcome = "Internet Preservation Society";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Internet Preservation Society";
        document.getElementById("result-image").src = "images/outcome9.png";
    } else if (totalScore <= 25) {
        outcome = "Protein Priest";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Protein Priest";
        document.getElementById("result-image").src = "images/outcome12.png";
    } else if (totalScore <= 27) {
        outcome = "Tupperware Tammy";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified bestie of Tupperware Tammy";
        document.getElementById("result-image").src = "images/outcome3.png";
    } else if (totalScore <= 29) {
        outcome = "Soap Saviors";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of The Soap Saviors";
        document.getElementById("result-image").src = "images/outcome1.png";
    } else if (totalScore <= 31) {
        outcome = "Radioactive Radio Media Empire";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of Radioactive Radio Media Empire";
        document.getElementById("result-image").src = "images/outcome10.png";
    } else if (totalScore === 32) {
        outcome = "The Olsen Twins";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of The Olsen Twins";
        document.getElementById("result-image").src = "images/outcome4.png";
    } else if (totalScore === 33) {
        outcome = "Museum of Car Parts";
        document.getElementById("result-title").innerText = "Congrats! You’re now a bonafide certified authentic genuine verified member of the Museum of Car Parts";
        document.getElementById("result-image").src = "images/outcome13.png";
    }

    document.getElementById("result-description").innerText = "You are now part of the " + outcome + " crew!";
}
}
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
