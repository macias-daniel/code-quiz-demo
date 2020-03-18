var questionPrompt = document.getElementById("title-section")
var possibleAnswers = document.getElementById("button-section")
var displayCorrectness = document.getElementById("correctness-section");

var answerSection = document.getElementById("answers")

var highScoreButton = document.getElementById("highscore-button")
var timeDisplay = document.getElementById("time-display")

var summary = "Welcome to my code quiz, see how you fare in this semi-challenging javascript quiz that tests your wits in all the right ways. Good luck, and be careful, get to many wrong and you might run out of time"


var currentQuestion = 0

var currentSavedScores = JSON.parse(localStorage.getItem("savedScores"))
if(currentSavedScores === null){
    currentSavedScores = []
}


//Question 1
var possibleQuestions = [["How do you store data in javascript?", "Booleans","Classes","Variables","Functions",3],
//Question 2
["Which of the following characters define classes in javascript?", "[]","{}","<>","//",2],
//Question 3
["Which is a valid function declaration?", "function()","function(){}","name function(){}","function name(){}",4],
//Question 4
["What is the HTML tag under which one can write the JavaScript code?","<javascript>","<scripted>","<script>","<js>",3],
//Question 5
["Which of the following is the correct syntax to display “Daniel is amazing” in an alert box using JavaScript?","alertbox(“Daniel is amazing”);","msg(“Daniel is amazing”);","showScreen(“Daniel is amazing”)","alert(“Daniel is amazing”)",4],
//Question 6
["What is the correct syntax for referring to an external script called “script.js”?", "<script src=”script.js”>", "<script href=”script.js”>", "<script ref=”script.js”>", "<script name=”script.js”>",1],
//Question 7
["How to write an ‘if’ statement for executing some code. If “i” is NOT equal to 8?", "if(i<>5)", "if(i!=5)", "if i<>5", "if i!=5",2],
//Question 8
["What is the JavaScript syntax for printing values in Console?","console.log(5);","print(5)","log(5);","console.log.num(5);",1]]


//Sets time equal to amout of question*10
var time = possibleQuestions.length*5 +1
var countDown


//What happens when the game starts
function onStartUp(){
    //Create code quiz title
    questionPrompt.textContent = "Code Quiz"

    //Creating summary section
    var displaySummary = document.createElement("p")
    displaySummary.textContent = summary
    displaySummary.setAttribute("id", "summary")
    possibleAnswers.appendChild(displaySummary)

    //Creating li with button inside
    var li = document.createElement("li")

    var startButton = document.createElement("button")
    li.setAttribute("id", "button1")
    startButton.textContent = "Start Quiz"

    //Adding l1 to body
    li.appendChild(startButton);
    possibleAnswers.appendChild(li);
}

//Displays next question from possibleQuestions array
function nextQuestion(){
    //Change questionPrompt to next question
    questionPrompt.textContent = possibleQuestions[currentQuestion][0]

    //Display possible answer on each button
    for(var i = 1; i <= 4; i++){
        
        var currentButton = document.getElementById("button" + i)
        currentButton.textContent = possibleQuestions[currentQuestion][i]

        //Create attribute to identify correct answer
        var correctAnswer = possibleQuestions[currentQuestion][5]

        if(correctAnswer === i){

            currentButton.setAttribute("isCorrect",true)

        }else{
    
            currentButton.setAttribute("isCorrect",false)

        }
    }
    currentQuestion++
}

//Sets up template for quiz
function setUpQuiz(){

    //Remove Summary and Start Button from onStartUpFunction
    var rmSummary = document.getElementById("summary")
    rmSummary.parentNode.removeChild(rmSummary)
    var rmButton = document.getElementById("button1")
    rmButton.parentNode.removeChild(rmButton)
    
    // Add 4 buttons in li to ul
    for(var i = 1 ; i <= 4; i ++){

        var li = document.createElement("li")
    
        var button = document.createElement("button")
        button.setAttribute("id", "button" + i)
                
        li.appendChild(button);
        possibleAnswers.appendChild(li);   
    }

    //Start Quiz Countdown
    countDown = setInterval(function(){
        time--
        timeDisplay.textContent = time

        if(time <= 0){
            time = 0
            highScores()
            endQuiz()
            
            timeDisplay.textContent = "0"
        }
    },1000)

    nextQuestion()

}

//Removes quiz template
function endQuiz(){
    //Go through each button element and remove it
    for(var i = 4 ; i > 0; i--){
        var rmButton = document.getElementById("button" + i)
        rmButton.parentNode.removeChild(rmButton)
    }
}

//Checks if the answer the user selected is correct
function isUserCorrect(userClicked){
    var isCorrectAnswer = userClicked.getAttribute("isCorrect")
    var quickDisplay

    //Displays whether or no the user got the answer correct
    if(isCorrectAnswer === "true"){
        displayCorrectness.style.borderTop = "1px solid black"
        displayCorrectness.textContent = "Your correct"

        //remove correctness display
        quickDisplay = setTimeout(function(){
            displayCorrectness.style.borderTop = "none"
            displayCorrectness.textContent = ""
            clearTimeout(quickDisplay)
        },1000)
        return true
    }else{
        displayCorrectness.style.borderTop = "1px solid black"
        displayCorrectness.textContent = "Your incorrect -10 seconds :("
        time -= 10
        quickDisplay = setTimeout(function(){
            displayCorrectness.style.borderTop = "none"
            displayCorrectness.textContent = ""
            clearTimeout(quickDisplay)
        },1000)
        return false
    }
}

//Allows user to input high score at the end of quiz
function highScores(){

    //stop countdown
    clearInterval(countDown)
    //Setting timer to 0
    timeDisplay.textContent = "0"

    questionPrompt.textContent = "All Done!"

    //Displaying score
    var score = document.createElement("p")
    score.textContent = "Your Score: "+ time
    answerSection.appendChild(score)
    

    //Displaying Score Input text
    var displayHighScoresLabel = document.createElement("p")
    displayHighScoresLabel.textContent = "Your Initials: "
    answerSection.appendChild(displayHighScoresLabel)
    displayHighScoresLabel.style.display = "inline"
    
    //Displaying form and user input
    var userInput = document.createElement("input")
    var userForm = document.createElement("form")
    userInput.setAttribute("id","userInput")
    userInput.setAttribute("type", "text")

    userForm.appendChild(userInput)
    answerSection.appendChild(userForm)
    userForm.style.display = "inline-block"
}

//Look for clicks in answers section of html page
possibleAnswers.addEventListener("click", function(event){

    //Checks if what was clicked was a button
    var onClick = event.target

    if(onClick.matches("button") === true){

        // If quiz was just started
        if(currentQuestion === 0){
            //Call set up quiz function
            setUpQuiz()
            //Start Quiz Timer
            
        //Check if user is correct
        }else if(isUserCorrect(onClick)){
        
            //If the last question is being check take user to highscore screen
            if(currentQuestion === possibleQuestions.length){

                highScores();
                endQuiz();

            }else{

                nextQuestion();

            }
        }
    }    
})

//looks for submit in highscore page and stores it to local storage
answerSection.addEventListener("submit", function(event){
    event.preventDefault()
    var userInput = document.getElementById("userInput")
    var newSave = userInput.value + "'s score: " + time
    currentSavedScores.push(newSave)
    localStorage.setItem("savedScores",JSON.stringify(currentSavedScores))
    //Go to highscores page
    window.location.href = "./highscores.html";

})



onStartUp();