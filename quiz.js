document.addEventListener("DOMContentLoaded", function() {
    let currentQuestionIndex = 0;
    let score = 0;
    const questions = [
      {
        question: "What is the result of 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
      },
      {
        question: "Which operator is used for division?",
        options: ["+", "-", "*", "/"],
        correctAnswer: 3,
      },
      {
        question: "Which one is not a data type in JavaScript?",
        options: ["Number", "String", "Boolean", "Float"],
        correctAnswer: 3,
      },
      {
        question: "What is the result of 5 % 2?",
        options: ["1", "2", "0", "3"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is used for single-line comments in JavaScript?",
        options: ["/* */", "//", "#", "<!-- -->"],
        correctAnswer: 1,
      },
    ];

    // Load the quiz question and options
    function loadQuestion() {
      const question = questions[currentQuestionIndex];
      const questionText = document.getElementById("question");
      const optionsList = document.getElementById("options");

      questionText.textContent = question.question;
      optionsList.innerHTML = "";
      question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", function() {
          selectOption(index, li);
        });
        optionsList.appendChild(li);
      });

      // Update progress bar
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

      // Enable Next button
      document.getElementById("nextButton").disabled = true;
    }

    // Handle option selection and background color change
    function selectOption(selectedIndex, selectedElement) {
      const options = document.querySelectorAll(".options li");
      
      // If an option is already selected, ignore further clicks until the "Next" button is clicked
      if (!selectedElement.classList.contains("selected")) {
        options.forEach((option) => {
          option.classList.remove("selected"); // Remove previously selected option
        });
        selectedElement.classList.add("selected"); // Add 'selected' class to the clicked option
        // Enable next button after selecting an option
        document.getElementById("nextButton").disabled = false;
      }
    }

    // Proceed to the next question
    function nextQuestion() {
      const selectedOption = document.querySelector(".options li.selected");
      if (selectedOption) {
        const selectedIndex = Array.from(selectedOption.parentNode.children).indexOf(selectedOption);
        const correctIndex = questions[currentQuestionIndex].correctAnswer;
        if (selectedIndex === correctIndex) {
          score++;
        }
      }

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
        // Disable "Next" button after the new question is loaded
        document.getElementById("nextButton").disabled = true;
      } else {
        showResult();
      }
    }

    // Display the result on the final page
    function showResult() {
      const result = document.getElementById("result");
      result.textContent = `Your score is: ${score} out of ${questions.length}`;
      document.getElementById("quizContent").style.display = "none";
      document.getElementById("finalPage").style.display = "block";
    }

    // Restart the quiz
    function restartQuiz() {
      score = 0;
      currentQuestionIndex = 0;
      document.getElementById("result").textContent = "";
      document.getElementById("finalPage").style.display = "none";
      document.getElementById("nameSection").style.display = "block";
    }

    // Start button click event
    document.getElementById("startButton").addEventListener("click", function() {
      const name = document.getElementById("username").value;
      if (name) {
        document.getElementById("nameSection").style.display = "none";
        document.getElementById("quizContent").style.display = "block";
        loadQuestion();
      } else {
        alert("Please enter your name.");
      }
    });

    // Next button click event
    document.getElementById("nextButton").addEventListener("click", nextQuestion);

    // Restart button click event
    document.getElementById("restartButton").addEventListener("click", function() {
      restartQuiz();
    });
  });