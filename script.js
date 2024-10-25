let currentQuestion = 0;  // Tracks the current question index
let userAnswers = [];  // Stores the user's answers
const totalQuestions = 11;  // Total number of questions
let progressBar = document.getElementById("progress-fill");

// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome to the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "SCREAM", "Jump out window"],
        scores: [2, 3, 3],
        gif: "images/question1-illustration.gif"
    },
    {
        question: "Thank gosh you got out of there alive. Death by science guy would have been a weird way to go out. It’s breakfast time! Choose a BUDDY™️ to forage for food:",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [3, 4, 2],
        gif: "images/question2-illustration.gif"
    },
    {
        question: "Great work! You and your BUDDY™️ need to grab something to eat, where ya headed?",
        answers: ["Waffle House", "Steal from someone's kid", "Street fighter for it"],
        scores: [2, 3, 1],
        gif: "images/question3-illustration.gif"
    },
    {
        question: "Uh oh! Not enough food for you and BUDDY™️ - what do you do?",
        answers: ["Kill BUDDY™️", "Share food with BUDDY™️", "Sell BUDDY™️"],
        scores: [4, 2, 4],
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where do you go?",
        answers: ["Abandoned DMV", "Mojo Dojo Casa House", "Spirit Halloween"],
        scores: [3, 5, 3],
        gif: "images/question5-illustration.gif"
    },
    {
          // Question 7 after custom questions 6A, 6B, or 6C
        question: "Now that you found shelter, food, and a weapon—you’ve become quite the dickhead. How will you repent?",
        answers: ["Rehab", "Double down at the casino"],
        scores: [3, 6],
        gif: "images/question7-illustration.gif"
    },
    {
        question: "Surprise! It’s a water witch and they've granted you three wishes in exchange for all your supplies.",
        answers: ["Wishy wish", "No deal", "Amateur massage"],
        scores: [6, 3, 4],
        gif: "images/question8-illustration.gif"
    },
    {
        question: "Oh no! You’ve been ROBBED. How do you go out?",
        answers: ["OD on cigarettes", "Hadouken"],
        scores: [3, 6],
        gif: "images/question9-illustration.gif"
    },
    {
        question: "The Protein Priest has saved you. You can join his wellness club or pledge your life to an apocalypse crew.",
        answers: ["Meet your new gang", "Hot yoga matcha baptism"],
        scores: [6, 3],
        gif: "images/question10-illustration.gif"
    },
    {
        question: "Wellness club was a decoy. Order up before you meet your crew.",
        answers: ["Big Macintosh meal", "Pedialyte", "Straight-up bleach"],
        scores: [2, 1, 3],
        gif: "images/question11-illustration.gif"
    }
];
// Define custom Question 6A, 6B, 6C
const question6A = {
    question: "Post-apocalyptic club kids have kidnapped you! The bag's out, and they've been carpet farming for months. How do you escape?",
    answers: ["Agua gun", "Bible", "Butter knife"],
    scores: [2, 4, 5],
    gif: "images/question6a-illustration.gif"
};
const question6B = {
    question: "Ahh, the good old Olsen bait and switch. You're tied to the bed while they take turns reading your birth chart. How do you escape?",
    answers: ["Bible", "Agua gun", "Butter knife"],
    scores: [4, 2, 4],
    gif: "images/question6b-illustration.gif"
};
const question6C = {
    question: "We’re never closing!! You’re trapped inside an out-of-season Spirit Halloween with the Homicidal Power Ranger. How do you escape?",
    answers: ["Agua gun", "Butter knife", "Bible"],
    scores: [2, 2, 4],
    gif: "images/question6c-illustration.gif"
};

// Start the quiz
function startQuiz() {
    document.getElementById("start-page").style.display = "none";  // Hides the start page
    document.getElementById("question-page").style.display = "block";  // Show the question page
    showQuestion();
}

// Update the progress bar with optional completion percentage
function updateProgressBar(completion = null) {
    const progressPercent = completion || (currentQuestion / totalQuestions) * 100;
    console.log(`Progress: ${progressPercent}%`);
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
}

// Function to handle answer selection and branching logic
function selectAnswer(index) {
    if (currentQuestion === 4) {  // Branching at Question 5
        if (index === 0) {
            showCustomQuestion(question6A);
        } else if (index === 1) {
            showCustomQuestion(question6B);
        } else {
            showCustomQuestion(question6C);
        }
        return;
    }

    // Default behavior for other questions
    userAnswers.push(questions[currentQuestion].scores[index]);
    currentQuestion++;  // Increment the current question

    if (currentQuestion < questions.length) {
        showQuestion();  // Show the next question
    } else {
        showResults();  // If no more questions, show results
    }
}
// Function to show the current question from the main array
function showQuestion() {
    const current = questions[currentQuestion];

    if (!current) {
        console.error("Question not found for index", currentQuestion);
        return;
    }

    // Clear previous question's answers before rendering new ones
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Make sure container is cleared

    // Display question text and associated GIF
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    // Create buttons for each answer in the current question
    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        // Ensure that the event listener is added only once
        answerButton.addEventListener("click", () => {
            // Push the selected answer's score to the userAnswers array
            console.log(`Answer selected: ${answer}, Index: ${index}`);
            userAnswers.push(current.scores[index]);

            // Move to the next question
            currentQuestion++;  // Increment to the next question

            if (currentQuestion < questions.length) {
                showQuestion();  // Show the next question
            } else {
                showResults();  // No more questions, so show results
            }

            updateProgressBar();  // Update progress bar
        });

        answersContainer.appendChild(answerButton);  // Append button to container
    });

    updateProgressBar();  // Update the progress bar after showing the question
}

// Function to show custom questions (6A, 6B, or 6C)
function showCustomQuestion(customQuestion) {
    document.getElementById("question-text").innerText = customQuestion.question;
    document.getElementById("question-illustration").src = customQuestion.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    customQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(customQuestion.scores[index]);
            moveToNextAfterCustom();  // After custom question, go to Question 7
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();
}

// Function to move to Question 7 after custom questions
function moveToNextAfterCustom() {
    currentQuestion = 5;  // Manually reset to index 5 for Question 7
    showQuestion();  // Show Question 7
    updateProgressBar();
}
// Function to show Question 8
function showQuestion8() {
    const current = questions[7];  // Accessing question 8 based on array index

    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clears previous answers

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Record answer
            showQuestion9();  // Move to Question 9
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update progress bar after showing Question 8
}

// Function to show Question 9
function showQuestion9() {
    const current = questions[8];  // Accessing question 9 based on array index

    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clears previous answers

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Record answer
            showQuestion10();  // Move to Question 10
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update progress bar after showing Question 9
}
// Function to handle branching logic and navigation for Question 10
function showQuestion10() {
    const current = questions[9];  // Accessing Question 10

    // Display the question and associated GIF
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clear previous answers

    // Log answers for Question 10
    console.log("Question 10 Answers: ", current.answers);

    // Create buttons for each answer in Question 10
    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            console.log(`Question 10 Answer Selected: ${answer}, Index: ${index}`);
            userAnswers.push(current.scores[index]);  // Push score for Question 10

            // If answer is "Meet your new gang" (index 0)
            if (index === 0) {
                console.log("Going directly to results for 'Meet your new gang'...");
                showResults();  // Should go directly to results
            } 
            // If "Hot yoga matcha baptism" (index 1) is selected, go to Bonus Question 11
            else if (index === 1) {
                console.log("Going to Bonus Question 11...");
                showBonusQuestion11();
            } 
            // Fallback if index is unexpected
            else {
                console.error("Unexpected answer index in Question 10.");
            }
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update the progress bar when showing Question 10
}

// Function to show Bonus Question 11
function showBonusQuestion11() {
    const current = questions[10];  // Accessing question 11

    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clear previous answers

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);  // Push score for Bonus Question 11
            showResults();  // Go to results after Bonus Question 11
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update progress bar when showing Bonus Question 11
}

// Function to show results and calculate the outcome
function showResults() {
    console.log("Showing results...");  // Log this to see if results page is shown

    document.getElementById("question-page").style.display = "none";  // Hide the question page
    document.getElementById("result-page").style.display = "block";  // Show the result page

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);  // Calculate total score
    console.log("Total score:", totalScore);  // Log the total score

    const outcome = determineOutcome(totalScore);  // Determine outcome based on score
    console.log("Determined outcome:", outcome);  // Log the outcome

    const crewColor = getCrewColor(outcome);
    document.getElementById("result-title").innerHTML = `Congrats! You’re a member of the ${outcome}`;
    document.getElementById("result-title").style.color = crewColor;

    const resultImageSrc = outcome === "Unknown" 
        ? "images/unknown.gif"
        : `images/outcome${getOutcomeImage(outcome)}.png`;
    document.getElementById("result-image").src = resultImageSrc;

    updateProgressBar(100);  // Set progress bar to 100% at the results page
}

// Function to determine the outcome based on total score
function determineOutcome(score) {
    if (score <= 20) return "Soap Saviors";
    if (score <= 30) return "Caffeine Nicotine Cartel";
    if (score <= 35) return "Hermes Shredders";
    if (score <= 37) return "Homicidal Power Ranger";
    if (score <= 38) return "The DMV (Club Kids)";
    if (score <= 40) return "Internet Preservation Society";
    if (score <= 45) return "Tupperware Tammy";
    if (score <= 54) return "Protein Priest";
    if (score <= 56) return "Radioactive Radio Media Empire";
    if (score <= 57) return "The Olsen Twins";
    if (score === 58) return "Museum of Car Parts";
    return "Unknown";  // Fallback for unexpected scores
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

// Event listeners for buttons to start quiz, retake quiz, etc.
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
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
