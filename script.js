let currentQuestion = 0;  // Tracks the current question index
let userAnswers = [];  // Stores the user's answers
const totalQuestions = 10;  // Total number of questions
const progressBarContainer = document.getElementById("progress-bar"); // Reference to the progress bar container
const progressFill = document.getElementById("progress-fill"); // Reference to the progress fill element

// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome to the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
        answers: ["Check it out", "SCREAM", "Jump out window"],
        scores: [1, 5, 10],
        gif: "images/question1-illustration.gif"
    },
    {
        question: "Bill Nye didn't need you anyway. You'll need a BUDDY™️ to survive the next 24hrs. Who's it gonna be?",
        answers: ["Tupperware Tammy", "The Hermes Shredders", "The Used Bar Salesman"],
        scores: [7, 1, 8],
        gif: "images/question2-illustration.gif"
    },
    {
        question: "Great work {{name}}! You're new here so you'll be in charge of the next meal. What's the plan?",
        answers: ["Waffle House", "Steal from someone's kid", "Street fighter for it"],
        scores: [8, 3, 10],
        gif: "images/question3-illustration.gif"
    },
    {
        question: "Uh oh! Not enough food for you and BUDDY™️. What's the move?",
        answers: ["Kill BUDDY™️", "Share food with BUDDY™️", "Sell BUDDY™️"],
        scores: [1, 2, 8],
        gif: "images/question4-illustration.gif"
    },
    {
        question: "Aw, BUDDY™️ died anyways. Time to look for shelter. Where are you headed?",
        answers: ["Abandoned DMV", "Mojo Dojo Casa House", "Spirit Halloween"],
        scores: [10, 5, 1],
        gif: "images/question5-illustration.gif"
    },
    {
          // Question 7 after custom questions 6A, 6B, or 6C
        question: "You're kind of an asshole now that you have food, shelter, and a weapon. How will you celebrate?",
        answers: ["Rehab baby!", "Double down at the casino"],
        scores: [3, 10],
        gif: "images/question7-illustration.gif"
    },
    {
        question: "OMG {{name}}! You've met a Smart Water Witch, you get unlimited wishes—but there's a price. What's the deal?",
        answers: ["Wishy wish", "No deal", "Cut them and run"],
        scores: [6, 3, 4],
        gif: "images/question8-illustration.gif"
    },
    {
        question: "Turns out, the Smart Water Witch sold you to the Caffeine Nicotine Cartel. How do you approach?",
        answers: ["OD on cigarettes", "Hadouken"],
        scores: [10, 2],
        gif: "images/question9-illustration.gif"
    },
    {
        question: "The Protein Priest rescues you. You can join his wellness club or find literally anyone else to be friends with so you don't...die.",
        answers: ["Meet your new gang", "Hot yoga matcha baptism"],
        scores: [3, 10],
        gif: "images/question10-illustration.gif"
    },

];

// Define custom Question 6A, 6B, 6C
const question6A = {
    question: "Post-apocalyptic club kids have kidnapped you! The bag's out, and they've been carpet farming for months. How do you escape?",
    answers: ["Agua gun", "Bible", "Butter knife"],
    scores: [2, 10, 5],
    gif: "images/question6a-illustration.gif"
};
const question6B = {
    question: "Ahh, the good old Olsen bait and switch. You're tied to the bed while they take turns reading your birth chart. How do you escape?",
    answers: ["Bible", "Agua gun", "Butter knife"],
    scores: [4, 2, 10],
    gif: "images/question6b-illustration.gif"
};
const question6C = {
    question: "We’re never closing!! You’re trapped inside an out-of-season Spirit Halloween with the Homicidal Power Ranger. How do you escape?",
    answers: ["Agua gun", "Butter knife", "Bible"],
    scores: [10, 6, 4],
    gif: "images/question6c-illustration.gif"
};

let userName = ""; // Global variable to store the user's name

// Function to start the quiz
function startQuiz() {
    const nameInput = document.getElementById("name-input").value.trim();
    
    if (!nameInput) {
        alert("TELL ME WHO U R NOW!");  // Show alert if name is empty
        return;  // Exit function if no name provided
    }

    userName = nameInput; // Save the user's name if provided
    document.getElementById("start-page").style.display = "none";  // Hide the start page
    document.getElementById("question-page").style.display = "block";  // Show the question page

    // Show the progress bar
    progressBarContainer.style.display = 'block'; // Show the progress bar
    updateProgressBar(0); // Reset progress to 0%

    showQuestion(); // Show the first question

    // Prevent scroll jump by focusing on the container
    document.getElementById("quiz-container").scrollIntoView({ behavior: 'smooth' });
}

// Event listener for Start Quiz button
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
        document.getElementById('progress-bar').style.display = 'block';
    }
});
function showQuestion() {
    const answersContainer = document.getElementById("answers-container");
    if (!answersContainer) {
        console.error("Element with ID 'answers-container' not found.");
        return;  // Exit if the element doesn't exist
    }

    const quizContainer = document.getElementById("quiz-container");
    const current = questions[currentQuestion];
    if (!current) {
        console.error("Question not found for index", currentQuestion);
        return;
    }

    // Apply alternating background color based on question index
    if (currentQuestion % 2 === 0) {
        quizContainer.classList.add("question-even");
        quizContainer.classList.remove("question-odd");
    } else {
        quizContainer.classList.add("question-odd");
        quizContainer.classList.remove("question-even");
    }

    // Set question text, replacing {{name}} with userName or a fallback
    const questionText = current.question.replace("{{name}}", userName || "survivor");
    document.getElementById("question-text").innerText = questionText;
    document.getElementById("question-illustration").src = current.gif;
    updateProgressBar();
    
    // Clear previous answers
    answersContainer.innerHTML = "";  // Clear previous answers

    // Create answer buttons
    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;

        answerButton.addEventListener("click", () => {
            userAnswers.push(current.scores[index]);

            // Reset all buttons
            answersContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('selected'); // Remove selected class
                btn.style.backgroundColor = ''; // Reset background color
                btn.style.color = ''; // Reset text color
            });

            // Apply the selected style to the clicked button
            answerButton.classList.add('selected'); // Add class for visual feedback

            // Handle Question 5 branching to custom questions (6A, 6B, or 6C)
            if (currentQuestion === 4) {  // Check if it's Question 5
                updateProgressBar(); // Update progress bar
                setTimeout(() => {
                    if (index === 0) showCustomQuestion(question6A);
                    else if (index === 1) showCustomQuestion(question6B);
                    else showCustomQuestion(question6C);
                }, 100);
            } else {
                // Progress to next question or results for non-branching questions
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    updateProgressBar(); // Update progress bar for non-custom questions
                    showQuestion();
                } else {
                    showResults();
                }
            }
        });

        answersContainer.appendChild(answerButton); // Append each answer button to the container
    });
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
// Update Progress Bar Function
function updateProgressBar(completion = null) {
    let progressPercent;

    if (completion !== null) {
        progressPercent = completion; // Use the provided completion value
    } else {
        progressPercent = ((currentQuestion + 1) / totalQuestions) * 100; // Calculate progress percentage
    }

    if (progressFill) { // Ensure progressFill is defined
        progressFill.style.width = `${progressPercent}%`; // Set the width of the progress fill element
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
    const current = questions[9];  // Question 10 is at index 9
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

                // After answering, go directly to results
                console.log("Going directly to results after Question 10.");
                showResults();  // Show results and exit
            }
        });

        answersContainer.appendChild(answerButton); // Append each answer button to the container
    });

    updateProgressBar();  // Update progress bar when showing Question 10
}

// Function to show results
function showResults() {
    // Hide the question page and show the results page
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";

    // Hide the progress bar when showing results
    progressBarContainer.style.display = 'none'; // Hide the progress bar

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    console.log(`Total Score: ${totalScore}`);  // Log the total score to the console
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
    if (score <= 30) return "Caffeine Nicotine Cartel";
    if (score <= 40) return "Hermes Shredders";
    if (score <= 50) return "Homicidal Power Ranger";
    if (score <= 60) return "The DMV (Club Kids)";
    if (score <= 76) return "Internet Preservation Society";
    if (score <= 72) return "Tupperware Tammy";
    if (score <= 74) return "Protein Priest";
    if (score <= 78) return "Radioactive Radio Media Empire";
    if (score <= 80) return "The Olsen Twins";
    if (score === 82) return "Museum of Car Parts";
    if (score === 85) return "Used Bar Salesman";
    if (score === 150) return "Unfortune Teller";
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
        case "Used Bar Salesman": return 5;
        case "Unfortune Teller": return 6;
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
        case "Used Bar Salesman": return "#8d6e63";  // Brownish
        case "Unfortune Teller": return "#7e57c2"; // Purple
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
