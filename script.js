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
// Updated function to ensure correct progress bar update
function updateProgressBar(completion = null) {
    let progressPercent;

    // Use the passed-in completion value if it exists
    if (completion !== null) {
        progressPercent = completion;
    } else {
        // Adjust for custom questions (6A, 6B, 6C) and calculate progress based on currentQuestion
        let adjustedQuestionIndex = currentQuestion;
        if (currentQuestion >= 6 && currentQuestion <= 9) {
            adjustedQuestionIndex--;  // Adjust the index for custom questions if needed
        }
        
        // Calculate progress percentage based on the adjusted question index
        progressPercent = ((adjustedQuestionIndex + 1) / totalQuestions) * 100;  // +1 because index is 0-based
    }

    // Update the progress bar's width
    console.log(`Progress: ${progressPercent}%`);  // Log progress for debugging
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

    userAnswers.push(questions[currentQuestion].scores[index]);  // Store the answer
    currentQuestion++;  // Move to the next question
    if (currentQuestion === 10 && index === 0) { // If on question 10 and option "Meet your new gang" is selected
        showResults();
        return;
    }

    if (currentQuestion < questions.length) {
        showQuestion();  // Show the next question
    } else {
        showResults();  // End quiz and show results
    }
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
            // Log the button click and the score recorded
            console.log(`Answer button clicked: ${answer} (Index: ${index})`);
            console.log(`Score recorded: ${customQuestion.scores[index]}`);

            userAnswers.push(customQuestion.scores[index]);
            moveToNextAfterCustom();  // After custom question, go to Question 7
        });

        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();
}

// Function to move to Question 7 after custom questions
function moveToNextAfterCustom() {
    currentQuestion = 5;  // Manually set to index 5 (Question 7) after custom question
    showQuestion();  // Show Question 7
    updateProgressBar();
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
            // Log the button click and the score recorded
            console.log(`Answer button clicked: ${answer} (Index: ${index})`);
            console.log(`Score recorded: ${current.scores[index]}`);

            // Push the selected answer's score to the userAnswers array
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

function showQuestion10() {
    const current = questions[9];  // Question 10 index
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clear previous answers

    // Track if score has already been recorded to prevent double scoring
    let scoreRecorded = false;

    // Create answer buttons
    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        console.log(`Creating button for '${answer}' (Index: ${index})`);

        // Add click event listener for the button
        answerButton.addEventListener("click", () => {
            if (!scoreRecorded) {
                console.log(`Answer selected: ${answer} (Index: ${index})`);
                userAnswers.push(current.scores[index]);  // Push score for Question 10
                scoreRecorded = true;  // Prevent multiple scores

                if (index === 0) {
                    console.log("Selected 'Meet your new gang'. Going to results.");
                    showResults();  // Directly show results for this option
                } else if (index === 1) {
                    console.log("Selected 'Hot yoga matcha baptism'. Going to bonus question.");
                    showBonusQuestion11();  // Go to the next question for index 1
                } else {
                    console.log(`Unexpected index ${index}, no action defined.`);
                }
            } else {
                console.log("Score already recorded, skipping...");
            }
        });

        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update progress bar when showing Question 10
}
// Function to show Bonus Question 11
function showBonusQuestion11() {
    const current = questions[10];  // Access Question 11

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
    console.log("Showing results...");

    document.getElementById("question-page").style.display = "none";  // Hide the question page
    document.getElementById("result-page").style.display = "block";  // Show the result page

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);  // Calculate total score
    console.log("Total score:", totalScore);

    const outcome = determineOutcome(totalScore);  // Determine the outcome based on score
    console.log("Determined outcome:", outcome);

    const crewColor = getCrewColor(outcome);
    document.getElementById("result-title").innerHTML = `Congrats! You’re a member of the ${outcome}`;
    document.getElementById("result-title").style.color = crewColor;

    const resultImageSrc = outcome === "Unknown"
        ? "images/unknown.gif"
        : `images/outcome${getOutcomeImage(outcome)}.png`;
    document.getElementById("result-image").src = resultImageSrc;

    // Set progress bar to 100% when showing results
    updateProgressBar(100);
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
