// START BUTTON =================================================================

$(document).ready(function() {
    startButton = $("<button>")
    startButton.html('<button type="button" class="btn gameStart">Start</button>')
    startButton.appendTo("#quiz-body")
})

$(document).on("click", ".gameStart", function(){
    $("#quiz-body").empty()
    newQuestion()
})
    
// VARIABLES ===========================================================

var timeLeft = 0;
var interval;
var correctCount = 0;
var incorrectCount = 0;
var userCorrect = true;

var questionsArray = [
    {
        question: "What state does Katherine Lundy live in?",
        answers: ["Florida", "Tennessee", "Alabama", "Kentucky"],
        correctAnswer: "Florida",
    },
    {
        question: "Phil's dog weighs approximately:",
        answers: ["5lbs", "20lbs", "75lbs", "150lbs"],
        correctAnswer: "75lbs",
    },
    {
        question: "What sporting equipment can be seen hanging on Estiven Salazar's wall?",
        answers: ["Tennis racket", "Boxing gloves", "Gym towel", "Swim goggles"],
        correctAnswer: "Boxing gloves",
    },
    {
        question: "In the mirror behind Katie Mills, the following is visible:",
        answers: ["A Backstreet Boys poster", "A deer head", "A ceiling fan", "A chandelier"],
        correctAnswer: "A ceiling fan",
    },
    {
        question: "Mason Shadrick mentioned working at the following restaurant:",
        answers: ["McDonald's", "Sonic", "Applebee's", "Macaroni Grill"],
        correctAnswer: "Sonic",
    },
    {
        question: "Who in our class mentioned spreading the gospel on a mission trip?",
        answers: ["Anthony Dowell", "Chip Johnson", "Codie Mitchell", "Jordan Bassett"],
        correctAnswer: "Jordan Bassett",
    }
]

// CLOCK SECTION ===================================================================

var timeLeft = 30;
var interval;
var correctCount = 0;
var incorrectCount = 0;
var questionNumber = 1
var currentScreen = ""

function run() {
    clearInterval(interval);
    if (currentScreen === "question") {
    interval = setInterval(decrement, 1000);
    }
    else if (currentScreen === "answer") {
    interval = setInterval(answerScreenTimer, 1000); 
    }
}

function decrement() {
    timeLeft--;
    $("#time-left").html("<p>Time Remaining: " + timeLeft + " Seconds</p>")
    if (timeLeft < 27) {
        stop();
        answerScreen();
        }
    }

function answerScreenTimer(){
    timeLeft--;
    if (timeLeft < 1) {
        stop();
        newQuestion()
        }
}

function stop() {
    clearInterval(interval);
    }

// FUNCTIONS FOR GAMEPLAY =========================================================

function newQuestion(){
    currentScreen = "question"
    timeLeft = 30;
    run();
    $("#time-left").html("<p>Time Remaining: " + timeLeft + " Seconds</p>")
    newQuestionDiv = $("<div>")
    newQuestionDiv.html("<p id='quiz-question'>" + questionsArray[questionNumber].question + "</p>")
    newQuestionDiv.appendTo("#quiz-body")

    for (var j=0; j < questionsArray[questionNumber].answers.length; j++){
        var answerBtn = $('<button>', {
            text: questionsArray[questionNumber].answers[j],
        }
        ); 
        answerBtn.addClass("btn btn-primary btn-lg btn-block answer-btn")
        if (questionsArray[questionNumber].correctAnswer === questionsArray[questionNumber].answers[j]) {
            answerBtn.attr("value", "correct")    
        }
        else {
            answerBtn.attr("value", "incorrect")
        }

        answerBtn.appendTo("#quiz-body");    

        }
}

$(document).on("click", ".answer-btn", function(){
    if (this.value === "correct"){
        userCorrect = true;
    }
    else if (this.value === "incorrect"){
        userCorrect = false;   
    }
    answerScreen()
})


function answerScreen(){
    currentScreen = "answer"
    timeLeft = 2;
    $("#quiz-body").empty()
    run();

}