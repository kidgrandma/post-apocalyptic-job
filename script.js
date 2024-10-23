let currentQuestion = 0;  // Tracks the current question index
let userAnswers = [];  // Stores the user's answers
const totalQuestions = 11;  // Total number of questions
let progressBar; // Reference the progress bar fill

// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome to the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "SCREAM", "Jump out window"],
        scores: [2, 4, 3],
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
        scores: [6, 2, 4],
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where do you go?",
        answers: ["Abandoned DMV", "Mojo Dojo Casa House", "Spirit Halloween"],
        scores: [6, 5, 3],
        gif: "images/question5-illustration.gif"
    }
];

// Define custom Question 6A, 6B, 6C
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
    question: "We’re never closing!! You’re trapped inside an out-of-season Spirit Halloween with the Homicidal Power Ranger. How do you escape?",
    answers: ["Agua gun", "Butter knife", "Bible"],
    scores: [2, 6, 4],
    gif: "images/question6c-illustration.gif"
};

// Other questions...
const question7 = {
    question: "Now that you found shelter, food, and a weapon—you’ve become quite the dickhead. How will you repent?",
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
    question: "Oh no! You’ve been ROBBED. How do you go out?",
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
const question11 = {
    question: "Wellness club was a decoy. Order up before you meet your crew.",
    answers: ["Big Macintosh meal", "Pedialyte", "Straight-up bleach"],
    scores: [2, 1, 3],
    gif: "images/question11-illustration.gif"
};

// Start quiz and display the first question
function startQuiz() {
    document.getElementById("start-page").style.display = "none";  // Hides the start page
    document.getElementById("question-page").style.display = "block";  // Show the question page
    updateProgressBar();
    showQuestion();
}

// Function to show the current question
function showQuestion() {
    const current = questions[currentQuestion];
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clears previous answers

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
    updateProgressBar();
}

// Function to handle answer selection and advance to the next question
function selectAnswer(index) {
    userAnswers.push(questions[currentQuestion].scores[index]);  // Record user's answer
    currentQuestion++;
    updateProgressBar();
// Add this inside the selectAnswer function
console.log('Answer chosen:', index, 'Score added:', questions[currentQuestion].scores[index]);
console.log('Current userAnswers:', userAnswers);
    if (currentQuestion === 4) {
        if (index === 0) showCustomQuestion(question6A);
        else if (index === 1) showCustomQuestion(question6B);
        else showCustomQuestion(question6C);
    } else if (currentQuestion === 5) {
        currentQuestion++;  // Move to Question 7
        showQuestion7();
    } else if (currentQuestion < totalQuestions) {
        showQuestion();  // Show next question
    } else {
        showResults();  // Show quiz results
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
            userAnswers.push(customQuestion.scores[index]);  // Record score
            currentQuestion++;
            console.log('Answer chosen:', index, 'Score added:', customQuestion.scores[index]);
            console.log('Current userAnswers after custom question:', userAnswers);
            showQuestion7();  // Proceed to Question 7 after custom question
        });
        answersContainer.appendChild(answerButton);
    });
}
// Show Question 7 after custom questions
function showQuestion7() {
    const current = question7;
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);
            showQuestion8();
        });
        answersContainer.appendChild(answerButton);
    });
}

// Function to show Question 8
function showQuestion8() {
    const current = question8;
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Push score for Question 8
            showQuestion9();  // After Question 8, go to Question 9
        });
        answersContainer.appendChild(answerButton);
    });
}

// Function to show Question 9
function showQuestion9() {
    const current = question9;
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Push score for Question 9
            showQuestion10();  // After Question 9, go to Question 10
        });
        answersContainer.appendChild(answerButton);
    });
}

// Function to show Question 10
function showQuestion10() {
    const current = question10;
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Push score for Question 10
            if (index === 1) {
                showBonusQuestion11();  // Go to Bonus Question 11 if they select the second answer
            } else {
                showResults();  // End the quiz and show results for any other answer
            }
        });
        answersContainer.appendChild(answerButton);
    });
}

// Function to show Bonus Question 11
function showBonusQuestion11() {
    const current = question11;
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Push score for Bonus Question 11
            showResults();  // After Bonus Question 11, show results
        });
        answersContainer.appendChild(answerButton);
    });
}

// Function to display the quiz results
function showResults() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";  // Ensure the result page is shown
    // Add this inside the showResults function
console.log('Total score:', totalScore);
    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    const outcome = determineOutcome(totalScore);
    
    // Now log the outcome and the image path
    console.log('Outcome:', outcome);
    console.log('Image path:', `images/outcome${getOutcomeImage(outcome)}.png`);
    
    // Set dynamic color for crew name and update results
    const crewColor = getCrewColor(outcome);
    document.getElementById("result-title").innerHTML = `Congrats! You’re a member of the ${outcome}`;
    document.getElementById("result-title").style.color = crewColor;

    // Set the image for the result
    const resultImageSrc = outcome === "Unknown" 
        ? "images/unknown.gif"  // New fallback GIF 
        : `images/outcome${getOutcomeImage(outcome)}.png`;
        
    document.getElementById("result-image").src = resultImageSrc;
}

// Function to determine the outcome based on total score
function determineOutcome(score) {
    if (score <= 12) return "Homicidal Power Ranger";
    if (score <= 15) return "Caffeine Nicotine Cartel";
    if (score <= 18) return "Hermes Shredders";
    if (score <= 21) return "The DMV (Club Kids)";
    if (score <= 23) return "Internet Preservation Society";
    if (score <= 25) return "Protein Priest";
    if (score <= 27) return "Tupperware Tammy";
    if (score <= 29) return "Soap Saviors";
    if (score <= 31) return "Radioactive Radio Media Empire";
    if (score === 32) return "The Olsen Twins";
    if (score === 33) return "Museum of Car Parts";
    return "Unknown";  // Fallback in case of an unexpected score
}

// Function to map the outcome to the corresponding image
function getOutcomeImage(outcome) {
    switch (outcome) {
        case "Homicidal Power Ranger": return 2;
        case "Caffeine Nicotine Cartel": return 11;
        case "Hermes Shredders": return 8;
        case "The DMV (Club Kids)": return 7;
        case "Internet Preservation Society": return 9;
        case "Protein Priest": return 12;
        case "Tupperware Tammy": return 3;
        case "Soap Saviors": return 1;
        case "Radioactive Radio Media Empire": return 10;
        case "The Olsen Twins": return 4;
        case "Museum of Car Parts": return 13;
        default: return "unknown";  // Now the fallback is "unknown.gif"
    }
}

// Function to get dynamic crew color based on the outcome
function getCrewColor(outcome) {
    switch (outcome) {
        case "Homicidal Power Ranger": return "#ff0000";  // Red
        case "Caffeine Nicotine Cartel": return "#ff9900";  // Orange
        case "Hermes Shredders": return "#00ffcc";  // Turquoise
        case "The DMV (Club Kids)": return "#ff00ff";  // Magenta
        case "Internet Preservation Society": return "#3399ff";  // Blue
        case "Protein Priest": return "#ffcc00";  // Yellow
        case "Tupperware Tammy": return "#ff66ff";  // Pink
        case "Soap Saviors": return "#33cc33";  // Green
        case "Radioactive Radio Media Empire": return "#cc3300";  // Dark Red
        case "The Olsen Twins": return "#9966ff";  // Purple
        case "Museum of Car Parts": return "#666666";  // Grey
        default: return "#000000";  // Black (fallback)
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progressPercent = (currentQuestion / totalQuestions) * 100;
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
}

// Functionality to copy quiz link to clipboard
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded");  // Check if the script is loading correctly

    progressBar = document.getElementById("progress-fill");
    if (progressBar) {
        console.log("Progress bar initialized");
    } else {
        console.error("Progress bar not found");
    }

    const startButton = document.getElementById("start-quiz");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
        console.log("Start button event listener added");
    } else {
        console.error("Start button not found");
    }

    const copyLinkBtn = document.getElementById("copy-link-btn");
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", () => {
            const quizLink = window.location.href;  // Current quiz URL
            navigator.clipboard.writeText(quizLink).then(() => {
                alert("Quiz link copied to clipboard!");
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    }

    const retakeButton = document.getElementById("retake-quiz");
    if (retakeButton) {
        retakeButton.addEventListener("click", () => {
            userAnswers = [];
            currentQuestion = 0;
            document.getElementById("result-page").style.display = "none";
            document.getElementById("start-page").style.display = "block";
        });
    }

    const meetModeratorButton = document.getElementById("meet-moderator");
    if (meetModeratorButton) {
        meetModeratorButton.addEventListener("click", () => {
            window.location.href = "https://worksucks.net";
        });
    }
});
