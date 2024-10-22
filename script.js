window.onload = function () {
    console.log("Page loaded");  // Check if the script is loading correctly
    
    document.getElementById("start-quiz").addEventListener("click", startQuiz);
    console.log("Start button event listener added");  // Ensure the event listener is attached properly

    let currentQuestion = 0;  // Tracks the current question index
    let userAnswers = [];  // Stores the user's answers

    // Continue with the rest of the script...
};
    // Function to start the quiz, hide the start page, and show the first question
    function startQuiz() {
        console.log("Quiz started");  // Debug log
        document.getElementById("start-page").style.display = "none";  // Hides the start page
        document.getElementById("question-page").style.display = "block";  // Shows the first question
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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
            answerButton.addEventListener("click", () => {
                console.log("Answer selected:", index);  // Debug log for answer selection
                selectAnswer(index);
            });
            answersContainer.appendChild(answerButton);
        });
    }

    // Function to handle answer selection and advance to the next question
    function selectAnswer(index) {
        console.log("Current question:", currentQuestion, "Answer index:", index);  // Debug log for answer selection
        userAnswers.push(questions[currentQuestion].scores[index]);  // Record the user's answer

        // Increment the question number and move to the next question
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();  // Display the next question
        } else {
            console.log("No more questions, showing results");  // Debug log
            showResults();  // Show results if no more questions
        }
    }

    // Placeholder for the showResults function
    function showResults() {
        console.log("Displaying results");  // Debug log for results
        // Add your result logic here
    }
};

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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
            answersContainer.appendChild(answerButton);
        });
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
                    showBonusQuestion11();  // Go to Bonus Question 11
                } else {
                    showResults();  // End the quiz and show results
                }
            });
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
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
            answerButton.style.width = '100%';  // Ensure the whole button is clickable
            answersContainer.appendChild(answerButton);
        });
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
};  // This closes the window.onload function
