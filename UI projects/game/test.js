const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris",
        answered: false
    },
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Bangkok", "Tokyo", "Beijing"],
        correctAnswer: "Tokyo",
        answered: false
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Mercury"],
        correctAnswer: "Mars",
        answered: false
    },
    {
        question: "In what year did the Titanic sink?",
        options: ["1905", "1912", "1923", "1898"],
        correctAnswer: "1912",
        answered: false
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
        correctAnswer: "William Shakespeare",
        answered: false
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Gorilla"],
        correctAnswer: "Blue Whale",
        answered: false
    },
    {
        question: "In which year did World War II end?",
        options: ["1941", "1950", "1939", "1945"],
        correctAnswer: "1945",
        answered: false
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", " Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
        answered: false
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", " Pacific Ocean ", "Southern Ocean"],
        correctAnswer: "Pacific Ocean ",
        answered: false
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Garlic"],
        correctAnswer: "Avocado",
        answered: false
    },
    {
        question: "Who is known as the Father of Modern Physics?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: "Albert Einstein",
        answered: false
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["South Korea", "China", "Vietnam", "Japan"],
        correctAnswer: "Japan",
        answered: false
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Atacama Desert", "Antarctica", "Sahara Desert", "Gobi Desert"],
        correctAnswer: "Antarctica",
        answered: false
    },
    {
        question: "Who wrote the play Hamlet?",
        options: ["Mark Twain", "Jane Austen", "William Shakespeare", "Charles Dickens"],
        correctAnswer: "William Shakespeare",
        answered: false
    },
    {
        question: "What is the currency of Brazil?",
        options: ["Euro", "Brazilian Real ", "Peso", "Dollar"],
        correctAnswer: "Brazilian Real",
        answered: false
    },
];

let rand = Math.floor(Math.random() * 3);
let currentQuestionIndex = 0;
let score = 0;
let fiftyFifty = false;

// Reference to HTML elements
const questionTextElement = document.querySelector('.question-text');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const questionContainers = document.querySelectorAll('.questions');
const requestButtons = document.querySelectorAll('.options button');


requestButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        switch (index) {
            case 0:
                fifty(questions[currentQuestionIndex].options);
                break;
            case 1:
                audience();
                break;
            case 2:
                walkAway();
                break;
            default:
                break;
        }
    });
});

function walkAway() {
    endGame();
}



function optionFilter(options, right, checker) {
    wrongRightArray = []
    if (checker == 0) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] != right) {
                wrongRightArray.push(options[i])
            }
            } 
    }
    else {
        for (let i = 0; i < options.length; i++) {
            if (options[i] == right) {
                wrongRightArray.push(options[i])
            }
            }
    }
    return wrongRightArray;
}

function fifty(options) {
    if (options.length >= 4) {
        // filter off the correct answer
        const rightAnswer = optionFilter(questions[currentQuestionIndex].options, questions[currentQuestionIndex].correctAnswer, 1)
        
        const wrongOptions = optionFilter(questions[currentQuestionIndex].options, questions[currentQuestionIndex].correctAnswer, 0)

        

        // Shuffle the options to randomize their order
        const shuffledOptions = random([rightAnswer, wrongOptions[rand]]);

        optionsContainer.innerHTML = '';
        shuffledOptions.forEach((option, i) => {
            const button = document.createElement('button');
            button.textContent = option;

            // Add a click event listener to the button
            button.addEventListener('click', () => {
                checkAnswer(option);
            });

            optionsContainer.appendChild(button);
         });
    }
}

const questionDivAppear = document.getElementById('options-container')
const startButton = document.getElementById('start-button')
const lifeLinesAppear = document.querySelector('.options')
const questionAppear = document.querySelector('.question-text')

startButton.onclick = function(index) {
    questionDivAppear.style.display = 'flex';
    startButton.style.display = 'none';
    lifeLinesAppear.style.display = 'flex';
    
    displayQuestion(0);
}


document.getElementById('exit').onclick = () => aud.style.top = -100 + "px";

const gameOverDiv = document.getElementById('game-over')
const gameOverTitle = document.getElementById('game-over').querySelector('h3');
const wonCash = document.getElementById('game-over').querySelector('h2');
const scoreCash = document.getElementById('game-over').querySelector('p');

function gameOver() {
    gameOverDiv.style.top= 300 + "px";
    gameOverTitle.textContent = "CASH WON";
    wonCash.textContent = "GAME OVER: ";
    scoreCash.textContent = `$${score};`

}

const scoreExit = document.getElementById('scoreExit').querySelector('button');
scoreExit.onclick = () => {
    gameOverDiv.style.top = -400 + "px";
    setTimeout(function() {
        window.location.href = 'home.html';
    }, 1000);
}

function random(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function findHighest(percent) {
    highest = 0;
    for (i = 0; i <= percent.length; i++) {
        if (percent[i] > highest) {
            highest = percent[i];
        }
    }   
    return highest;
} 


function audience() {
    audienceResponseData();
}


const aud = document.getElementById('audience-response')

function audienceResponseData() {
    audienceResponse();
    aud.style.top = 300 + "px";
}



function audienceResponse() {
    const currentQuestion = questions[currentQuestionIndex].options;
    const answerCorrect = questions[currentQuestionIndex].correctAnswer;
    const answerBar = document.getElementsByClassName('bar');
    console.log(answerCorrect)

    let num1 = Math.floor(Math.random() * 101);
    let num2 = Math.floor(Math.random() * (101 - num1));
    let num3 = Math.floor(Math.random() * (101 - num1 - num2));
    let num4 = 100 - (num1 + num2 + num3);

    let percent = [num1, num2, num3, num4];
    
    const answerOption = document.querySelectorAll('.optioned');
    let high = findHighest(percent);
    high = percent.indexOf(high);

    for (let i = 0; i < currentQuestion.length; i++) {
        answerOption[i].innerHTML = currentQuestion[i];

    
    if (answerOption[i].innerHTML == answerCorrect) {
        answerBar[i].innerHTML = percent[high]
    } else {
        answerBar[i].innerHTML = percent[i]
    }
    
}
}

function displayQuestion(index) {
    currentQuestionIndex = index;
    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = '';

    // Display the existing special button and add a click event listener
    const specialButton = document.querySelector('.options button:first-child');
    specialButton.addEventListener('click', () => {
        // Set the flag to indicate that the special button is clicked
        fiftyFifty = true;
    fifty(currentQuestion.options);
    });

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;

        // Add a click event listener to the button
        button.addEventListener('click', () => {
            checkAnswer(option);
            
    });

    optionsContainer.appendChild(button)
});
    
}

function scoreCheck(score) {
    if (score >= 500 && score < 1000) {
        return 500;
    } else if (score >= 1000 && score < 1500) {
        return 1000;
    } else {
        while (currentQuestionIndex >= questions.length)
            return 1500;
        return 0;
    }
    }

// Function to check the selected answer
function checkAnswer(selectedAnswer) {
    console.log(selectedAnswer)
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion.correctAnswer)

    if (selectedAnswer == currentQuestion.correctAnswer) {
        if (currentQuestion.answered) {
            return;
        } else {
        score += 100;
        currentQuestion.answered = true;
        updateScore();
        displayNextQuestion();
        }
    } else {
        score = scoreCheck(score);
            updateScore();
            endGame();
    }

    
}

// Function to update the displayed score
function updateScore() {
    scoreElement.textContent = `$${score}`;
}

// Function to handle the end of the game
function endGame() {
    gameOver();
}

// Function to display the next question
function displayNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

// Add click event listeners to each question div
questionContainers.forEach((questionDiv, index) => {
    questionDiv.addEventListener('click', () => displayQuestion(index));
});


 
// Initial display of the first question (optional)
// displayQuestion(0);