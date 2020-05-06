// START BUTTON =================================================================

$(document).ready(function() {
    startButton = $('<button>', {
    text: "Press Here to Begin!",
    }); 
    startButton.attr("type", "button")
    startButton.addClass("btn btn-primary btn-lg gameStart")
    startButton.appendTo("#quiz-body")
})

$(document).on("click", ".gameStart", function(){
    $("#quiz-body").empty()
    newQuestion();
})
    
// VARIABLES ====================================================================

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
        imgSrc: "Florida.jpg"
    },
    {
        question: "Phil's dog weighs approximately:",
        answers: ["5lbs", "20lbs", "75lbs", "150lbs"],
        correctAnswer: "75lbs",
        imgSrc: "Dog.jpg"
    },
    {
        question: "What sporting equipment can be seen hanging on Estiven Salazar's wall?",
        answers: ["Tennis racket", "Boxing gloves", "Gym towel", "Swim goggles"],
        correctAnswer: "Boxing gloves",
        imgSrc: "Steven.jpg"
    },
    {
        question: "In the mirror behind Katie Mills, the following is visible:",
        answers: ["A Backstreet Boys poster", "A deer head", "A ceiling fan", "A chandelier"],
        correctAnswer: "A ceiling fan",
        imgSrc: "Katie.jpg"
    },
    {
        question: "Mason Shadrick mentioned working at the following restaurant:",
        answers: ["McDonald's", "Sonic", "Applebee's", "Macaroni Grill"],
        correctAnswer: "Sonic",
        imgSrc: "Sonic.jpg"
    },
    {
        question: "Who in our class mentioned spreading the gospel on a mission trip?",
        answers: ["Anthony Dowell", "Chip Johnson", "Codie Mitchell", "Jordan Bassett"],
        correctAnswer: "Jordan Bassett",
        imgSrc: "Jbassett.jpg"
    }
]

// TIMERS =======================================================================

var timeLeft = 10;
var interval;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var questionNumber = 0;
var currentScreen = ""
var timeOut = false;

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
    if (timeLeft < 1) {
        timeOut = true;
        unansweredCount++;
        stop();
        answerScreen();
        }
}

function answerScreenTimer(){
    timeLeft--;
    if (timeLeft < 1 && (correctCount + incorrectCount + unansweredCount) < questionsArray.length){
        questionNumber++;
        stop();
        newQuestion()
        }
    else if (timeLeft < 1 && (correctCount + incorrectCount + unansweredCount) === questionsArray.length){
        endGame();
    }
}

function stop() {
    clearInterval(interval);
    }

// QUESTION SCREEN  ====================================================================

function newQuestion(){
    $("#quiz-body").empty()
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
        correctCount++;
    }
    else if (this.value === "incorrect"){
        userCorrect = false;
        incorrectCount++;
    }
    answerScreen()
})

// ANSWER SCREEN ===============================================================


function answerScreen(){
    currentScreen = "answer"
    timeLeft = 4;
    $("#quiz-body").empty()
    run();
        
    if (timeOut) {
        answerReaction = "Out of time!"
        timeOut = false;
    }
    else if (!userCorrect) {
        answerReaction = "Nope!"
    }
    else if (userCorrect) {
        answerReaction = "Correct!"
    }

    answerDiv = $("<div>")
    answerDiv.html(
    "<h2>" + answerReaction + "</h2>" +
    "<img src='assets/images/" + questionsArray[questionNumber].imgSrc + "'>" +
    "<h3>" + questionsArray[questionNumber].correctAnswer + " was the correct answer!"
    )
    answerDiv.appendTo("#quiz-body")
    }

// ENDGAME SCREEN =====================================================================

function endGame(){
   
    $("#quiz-body").empty()
    $("#time-left").empty()

    endGameStats = $("<div>")
    endGameStats.html(
        '<h2>All Done! Let\'s see how you did:</h2><br />' + 
        '<h2>Correct Answers: <span id="correct-answers"></span></h2><br />' +
        '<h2>Incorrect Answers: <span id="incorrect-answers"></span></h2><br />' +
        '<h2>Unanswered: <span id="unanswered"></span></h2><br />'
    )

    endGameStats.appendTo("#quiz-body")
    $("#correct-answers").append(correctCount)
    $("#incorrect-answers").append(incorrectCount)
    $("#unanswered").append(unansweredCount)

    restartBtn = $('<button>', {
        text: "Press Here to Play Again!",
        }); 
    restartBtn.addClass("btn btn-primary btn-lg restart-btn")
    restartBtn.appendTo("#quiz-body")
    }      

$(document).on("click", ".restart-btn", function(){
    timeLeft = 30;
    correctCount = 0;
    incorrectCount = 0;
    unansweredCount = 0;
    questionNumber = 0;
    timeOut = false;
    newQuestion();
})