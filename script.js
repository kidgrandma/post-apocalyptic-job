let currentQuestion = 0;  // Tracks the current question index
let userAnswers = [];  // Stores the user's answers
const totalQuestions = 10;  // Total number of questions
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
        question: "Bill Nye didn't need you anyway. You'll need a BUDDY™️ to survive the next 24hrs. Who's it gonna be?",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [3, 4, 2],
        gif: "images/question2-illustration.gif"
    },
    {
        question: "Great work {{name}}! You're new here so you'll be in charge of the next meal. What's the plan?",
        answers: ["Waffle House", "Steal from someone's kid", "Street fighter for it"],
        scores: [2, 3, 1],
        gif: "images/question3-illustration.gif"
    },
    {
        question: "Uh oh! Not enough food for you and BUDDY™️. What's the move?",
        answers: ["Kill BUDDY™️", "Share food with BUDDY™️", "Sell BUDDY™️"],
        scores: [4, 2, 4],
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where are you headed?",
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
        scores: [3, 4],
        gif: "images/question9-illustration.gif"
    },
    {
        question: "The Protein Priest has saved you. You can join his wellness club or pledge your life to an apocalypse crew.",
        answers: ["Meet your new gang", "Hot yoga matcha baptism"],
        scores: [3, 6],
        gif: "images/question10-illustration.gif"
    },

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

let userName = ""; // Global variable to store the user's name

// Start the quiz
function startQuiz() {
    const nameInput = document.getElementById("name-input").value.trim();
    
    if (!nameInput) {
        alert("TELL ME WHO U R NOW!");  // Show alert if name is empty
        return;  // Exit function if no name provided
    }

    userName = nameInput; // Save the user's name if provided
    document.getElementById("start-page").style.display = "none";  // Hide the start page
    document.getElementById("question-page").style.display = "block";  // Show the question page
    showQuestion();
    
    // Prevent scroll jump by focusing on the container
    document.getElementById("quiz-container").scrollIntoView({ behavior: 'smooth' });
}
// Event listener for Start Quiz button
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    }
});

// Function to show the current question from the main array
function showQuestion() {
    // Define answersContainer and check if it exists (moved outside the if block)
    const answersContainer = document.getElementById("answers-container");
    if (!answersContainer) {
        console.error("Element with ID 'answers-container' not found.");
        return;  // Exit if the element doesn't exist
    }

    // Check if we're at Question 5 (index 4) and handle branching
    if (currentQuestion === 4) {  // Question 5
        const current = questions[currentQuestion];
        if (!current) {
            console.error("Question not found for index", currentQuestion);
            return;
        }
  // Replace placeholder with user's name in question text
    const questionText = current.question.replace("{{name}}", userName || "survivor");

        // Clear the answers container
        answersContainer.innerHTML = "";  

        document.getElementById("question-text").innerText = current.question;
        document.getElementById("question-illustration").src = current.gif;

        // Render answers for Question 5
        current.answers.forEach((answer, index) => {
            const answerButton = document.createElement("button");
            answerButton.innerText = answer;

            // Add click event listener for the button
            answerButton.addEventListener("click", () => {
                console.log(`Answer selected for Question 5: ${answer}`);  // Log selected answer
                userAnswers.push(current.scores[index]);  // Record score for Question 5
                console.log(`Score for Question 5 recorded: ${current.scores[index]}`);

                // Add a small delay before transitioning to ensure the score is logged
                setTimeout(() => {
                    // Now branch to custom questions (6A, 6B, or 6C) based on the selected answer
                    if (index === 0) {
                        showCustomQuestion(question6A);
                    } else if (index === 1) {
                        showCustomQuestion(question6B);
                    } else {
                        showCustomQuestion(question6C);
                    }
                }, 100);  // Small 100ms delay
            });

            answersContainer.appendChild(answerButton);  // Append each answer button to the container
        });

        updateProgressBar();  // Update progress bar after displaying Question 5
        return;  // Exit here to prevent further processing of other questions
    }

    // Regular question handling for non-branching questions
    const current = questions[currentQuestion];
    if (!current) {
        console.error("Question not found for index", currentQuestion);
        return;
    }
 // Apply alternating background color
    const quizContainer = document.getElementById("quiz-container");
    if (currentQuestion % 2 === 0) {
        quizContainer.classList.add("question-even");
        quizContainer.classList.remove("question-odd");
    } else {
        quizContainer.classList.add("question-odd");
        quizContainer.classList.remove("question-even");
    }

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        });

        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();
}
    // Clear previous question's answers
    answersContainer.innerHTML = "";  

    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            console.log(`Answer button clicked: ${answer} (Index: ${index})`);
            userAnswers.push(current.scores[index]);  // Record score for current question

            // Move to the next question
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();  // Show the next question
            } else {
                showResults();  // Show results if no more questions
            }
        });

        answersContainer.appendChild(answerButton);
    });

    updateProgressBar(); // Update progress after displaying a question
}
// Function to show custom questions (6A, 6B, or 6C)
function showCustomQuestion(customQuestion) {
    // Display the custom question and associated image
    document.getElementById("question-text").innerText = customQuestion.question;
    document.getElementById("question-illustration").src = customQuestion.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clear previous answers

    // Loop through answers and create buttons
    customQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            console.log(`Answer button clicked: ${answer} (Index: ${index})`);
            console.log(`Score recorded for custom question: ${customQuestion.scores[index]}`);

            // Push the score for this custom question
            userAnswers.push(customQuestion.scores[index]);

            // Move to the next question in the main sequence (after custom questions)
            moveToNextAfterCustom();  // Transition to Question 7 (or next in sequence)
        });

        // Add the button to the container
        answersContainer.appendChild(answerButton);
    });

    // Update progress bar after displaying the custom question
    updateProgressBar();
}
// function to update progress bar 
function updateProgressBar(completion = null) {
    let progressPercent;

    if (completion !== null) {
        progressPercent = completion;
    } else {
        progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
    }

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
}
// Function to move to Question 7 after custom questions
function moveToNextAfterCustom() {
    currentQuestion = 5;  // Manually set to index 5 (Question 7) after custom question
    showQuestion();  // Show Question 7
    updateProgressBar();  // Update progress bar after showing Question 7
}

// Function to handle Question 10 and go directly to results
function showQuestion10() {
    const current = questions[9];  // Question 10 is at index 9 in your array
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clear previous answers

    let scoreRecorded = false;  // Prevents double scoring

    // Create answer buttons for Question 10
    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        // Add click event listener for the button
        answerButton.addEventListener("click", () => {
            if (!scoreRecorded) {
                console.log(`Answer selected: ${answer} (Index: ${index})`);
                userAnswers.push(current.scores[index]);  // Record score for Question 10
                scoreRecorded = true;  // Prevent multiple scores

                // After answering, go directly to results regardless of the answer selected
                console.log("Going directly to results after Question 10.");
                showResults();  // Show results and exit
            }
        });

        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Update progress bar when showing Question 10
}
// Function to handle showing the results
// Function to handle showing the results
function showResults() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    const outcome = determineOutcome(totalScore);

    // Get crew color based on outcome
    const crewColor = getCrewColor(outcome);

    // Display personalized message with the outcome and set the crew color
    document.getElementById("result-title").innerHTML = userName
        ? `Saddle up, ${userName}, because ur rollin' with <span style="color:${crewColor};">${outcome}</span> till u die OR WORSE`
        : `Saddle up, because ur rollin' with <span style="color:${crewColor};">${outcome}</span> till u die OR WORSE`;

    // Set the result image source based on the outcome
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
    if (score <= 28) return "Caffeine Nicotine Cartel";
    if (score <= 26) return "Hermes Shredders";
    if (score <= 35) return "Homicidal Power Ranger";
    if (score <= 30) return "The DMV (Club Kids)";
    if (score <= 38) return "Internet Preservation Society";
    if (score <= 33) return "Tupperware Tammy";
    if (score <= 32) return "Protein Priest";
    if (score <= 40) return "Radioactive Radio Media Empire";
    if (score <= 45) return "The Olsen Twins";
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
        default: return "unknown";  // Fallback
    }
}

// Function to get brighter crew colors and apply a softer glow
function getCrewColor(outcome) {
    switch (outcome) {
        case "Homicidal Power Ranger": return "#ff6f61";  // Bright coral
        case "Caffeine Nicotine Cartel": return "#ffc107";  // Amber yellow
        case "Hermes Shredders": return "#00e5ff";  // Bright turquoise
        case "The DMV (Club Kids)": return "#e040fb";  // Vivid magenta
        case "Internet Preservation Society": return "#42a5f5";  // Sky blue
        case "Protein Priest": return "#ff8a65";  // Peachy coral
        case "Tupperware Tammy": return "#ffb74d";  // Soft orange
        case "Soap Saviors": return "#26c6da";  // Aqua blue
        case "Radioactive Radio Media Empire": return "#cddc39";  // Lime green
        case "The Olsen Twins": return "#ce93d8";  // Lavender purple
        case "Museum of Car Parts": return "#ffd54f";  // Golden yellow
        default: return "#ffffff";  // Fallback to white if needed
    }
}
// Function to copy the quiz link to the clipboard
function copyQuizLink() {
    const quizLink = window.location.href;  // Get the current quiz URL

    // Create a temporary input element to copy the link
    const tempInput = document.createElement("input");
    tempInput.value = quizLink;
    document.body.appendChild(tempInput);

    // Select and copy the value
    tempInput.select();
    document.execCommand("copy");

    // Remove the temporary input
    document.body.removeChild(tempInput);

    // Notify the user that the link has been copied
    alert("Quiz link copied to clipboard!");
}

// Attach the event listener to the Copy Link button
document.getElementById("copy-link-button").addEventListener("click", copyQuizLink);
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
