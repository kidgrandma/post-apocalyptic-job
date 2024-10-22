window.onload = function () {
    console.log("Page loaded");  // Check if the script is loading correctly
    
    document.getElementById("start-quiz").addEventListener("click", startQuiz);
    console.log("Start button event listener added");  // Ensure the event listener is attached properly

    let currentQuestion = 0;  // Tracks the current question index
    let userAnswers = [];  // Stores the user's answers

    const totalQuestions = 10;  // Set the total number of questions (adjust this if needed)
    const progressBar = document.getElementById("progress-fill");  // Reference the progress bar fill
}
// Function to start the quiz, hide the start page, and show the first question
function startQuiz() {
    console.log("Quiz started");  // Debug log
    document.getElementById("start-page").style.display = "none";  // Hides the start page
    document.getElementById("question-page").style.display = "block";  // Shows the first question
    updateProgressBar();  // Initialize the progress bar at the start of the quiz
    showQuestion();  // Call the function to display the first question
}

// Function to show the current question
function showQuestion() {
    console.log("Displaying question:", currentQuestion);  // Debug log
    const current = questions[currentQuestion];
    document.getElementById("question-text").innerText = current.question;
    document.getElementById("question-illustration").src = current.gif;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";  // Clears previous answers

    current.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.innerText = answer;
        answerButton.addEventListener("click", () => {
            console.log("Answer selected:", index);  // Debug log for answer selection
            selectAnswer(index);  // Calls selectAnswer function when an answer is clicked
        });
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();  // Ensure the progress bar is updated when a question is shown
}
  
// Function to handle answer selection and advance to the next question
function selectAnswer(index) {
    console.log("Current question:", currentQuestion, "Answer index:", index);  // Debug log for answer selection
    userAnswers.push(questions[currentQuestion].scores[index]);  // Record the user's answer

    currentQuestion++;

    // Handle Question 5 branching (leading to custom question 6A, 6B, or 6C)
    if (currentQuestion === 4) {
        if (index === 0) {
            showCustomQuestion(question6A);  // Go to custom Question 6A
            updateProgressBar();  // Update progress bar after showing custom Question 6A
        } else if (index === 1) {
            showCustomQuestion(question6B);  // Go to custom Question 6B
            updateProgressBar();  // Update progress bar after showing custom Question 6B
        } else {
            showCustomQuestion(question6C);  // Go to custom Question 6C
            updateProgressBar();  // Update progress bar after showing custom Question 6C
        }
    } 
    // After custom question 6, go back to question 7
    else if (currentQuestion === 6) {
        showQuestion7();  // Display question 7
        updateProgressBar();  // Update progress bar after showing Question 7
    } 
    else if (currentQuestion < questions.length) {
        showQuestion();  // Display the next question if there are more
        updateProgressBar();  // Update progress bar after showing the next question
    } 
    else {
        console.log("No more questions, showing results");  // Debug log
        showResults();  // Show results if no more questions
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
        currentQuestion = 6; // Index for Question 7
        const current = question7;

        document.getElementById("question-text").innerText = current.question;
        document.getElementById("question-illustration").src = current.gif;

        const answersContainer = document.getElementById("answers-container");
        answersContainer.innerHTML = "";

        current.answers.forEach((answer, index) => {
            const answerButton = document.createElement("button");
            answerButton.innerText = answer;
            answerButton.addEventListener("click", () => {
                userAnswers.push(current.scores[index]);  // Push score for Question 7
                showQuestion8(); // After Question 7, go to Question 8
            });
            answersContainer.appendChild(answerButton);
        });
    }

    // Function to show Question 8
    function showQuestion8() {
        currentQuestion = 7; // Index for Question 8
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
        currentQuestion = 8; // Index for Question 9
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
function updateProgressBar() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progressPercentage + "%";
}
    // Function to show Question 10
    function showQuestion10() {
        currentQuestion = 9; // Index for Question 10
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
        currentQuestion = 10; // Index for Question 11
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
    document.getElementById("result-page").style.display = "block";

    const totalScore = userAnswers.reduce((a, b) => a + b, 0);
    let outcome = determineOutcome(totalScore);
    
    // Set dynamic complementary color for crew name
    const crewColor = getCrewColor(outcome);

    // Update results page content
    const resultTitle = `Congrats! You’re now a bonafide certified authentic genuine verified member of the ${outcome}`;
    document.getElementById("result-title").innerHTML = resultTitle;
    document.getElementById("result-title").style.color = crewColor;  // Apply dynamic color

    document.getElementById("result-image").src = `images/outcome${getOutcomeImage(outcome)}.png`;

    // Display share buttons
    document.getElementById("share-buttons").style.display = "block";
}

// Function to map complementary color to the crew name
function getCrewColor(outcome) {
    switch(outcome) {
        case "Homicidal Power Ranger": return "#FF4500";  // Example bright orange
        case "Caffeine Nicotine Cartel": return "#008080";  // Teal
        case "Hermes Shredders": return "#9400D3";  // Dark violet
        case "The DMV (Club Kids)": return "#FFD700";  // Gold
        case "Internet Preservation Society": return "#00FF7F";  // Spring green
        case "Protein Priest": return "#FF6347";  // Tomato red
        case "Tupperware Tammy": return "#FF69B4";  // Hot pink
        case "Soap Saviors": return "#4B0082";  // Indigo
        case "Radioactive Radio Media Empire": return "#32CD32";  // Lime green
        case "The Olsen Twins": return "#4169E1";  // Royal blue
        case "Museum of Car Parts": return "#2F4F4F";  // Dark slate gray
        default: return "#FFFFFF";  // Default to white
    }
}

    // Function to determine outcome based on score
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
            default: return "unknown";  // Fallback in case of an unexpected outcome
        }
    }

    // Retake quiz button functionality
    document.getElementById("retake-quiz").addEventListener("click", () => {
        userAnswers = [];
        currentQuestion = 0;
        document.getElementById("result-page").style.display = "none";
        document.getElementById("start-page").style.display = "block";
    });

    // Redirect to website button functionality
    document.getElementById("meet-moderator").addEventListener("click", () => {
        window.location.href = "https://worksucks.net";
    });
// Functionality to copy quiz link to clipboard
document.getElementById("copy-link-btn").addEventListener("click", () => {
    const quizLink = window.location.href;  // Current quiz URL
    navigator.clipboard.writeText(quizLink).then(() => {
        alert("Quiz link copied to clipboard!");
    });
});
// Define the questions, answers, scores, and GIFs
const questions = [
    {
        question: "Welcome 2 the apocalypse! You just woke up in the ruins of Bill Nye's townhouse. Is something burning?!",
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

const question11 = {
    question: "Wellness club was a decoy. Order up before you meet your crew.",
    answers: ["Big Macintosh meal", "Pedialyte", "Straight-up bleach"],
    scores: [2, 1, 3],
    gif: "images/question11-illustration.gif"
};
