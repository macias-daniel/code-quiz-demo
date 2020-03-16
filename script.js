var questionPrompt = document.getElementById("title-section")
var answers = document.getElementById("answer-section")
var displayCorrectness = document.getElementById("correctness-section");

var highScoreButton = document.getElementById("highscore-button")
var timeDisplay = document.getElementById("time-display")

var summary = "Welcome to my code quiz, see how you fare in this semi-challenging javascript quiz that tests your wits in all the right ways. Good luck, and be careful, get to many wrong and you might run out of time"

var currentQuestion = 0

var possibleQuestions = [["How do you store data in javascript?", "Booleans","Classes","Variables","Functions",3],
                         ["What chracters define classes in javascript?", "[]","{}","<>","//",2],
                         ["Which is a valid function declaration?", "Answer1","Answer2","Answer3","Answer4",4],
                         ["Question4", "Answer1","Answer2","Answer3","Answer4",1]]


function onStartUp(){

    //Create code quiz title
    questionPrompt.textContent = "Code Quiz"

    //Creating summary section
    var displaySummary = document.createElement("p")
    displaySummary.textContent = summary
    displaySummary.setAttribute("id", "summary")
    answers.appendChild(displaySummary)

    //Creating li with button inside
    var li = document.createElement("li")

    var startButton = document.createElement("button")
    li.setAttribute("id", "button1")
    startButton.textContent = "Start Quiz"

    //Adding l1 to body
    li.appendChild(startButton);
    answers.appendChild(li);
}


function setQuestion(){
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
        answers.appendChild(li);
        console.log(li)
        
    }

    setQuestion()

}

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

    //Displays whether or no the user got the answer correct
    if(isCorrectAnswer === "true"){
        displayCorrectness.style.borderTop = "1px solid black"
        displayCorrectness.textContent = "Your correct"

        //Display next question
        setQuestion()

    }else{
        displayCorrectness.style.borderTop = "1px solid black"
        displayCorrectness.textContent = "Your incorrect :("
    }

    //After 1 second the announcement whether you were correct or not disapears
    var disapear = setTimeout(function(){
        displayCorrectness.style.borderTop = "none"
        displayCorrectness.textContent = ""
        clearTimeout(disapear)
    },1000)
}

//Look for clicks in answers section of html page
answers.addEventListener("click", function(event){

    //Checks if what was clicked was a button
    var onClick = event.target

    
    if(onClick.matches("button")=== true){

        // If quiz was just started
        if(currentQuestion === 0){

            //Call set up quiz function
            setUpQuiz()

        }else if(possibleQuestions.length <= currentQuestion){

            //Check if user is correct
            isUserCorrect(onClick)

            //Call end quiz function
            endQuiz()

            //Reset page so it looks like new
            onStartUp()

            //Set current question to 0 
            currentQuestion = 0

        //otherwise check if what the user clicked on was correct
        }else{

            //Check if user is correct
            isUserCorrect(onClick)
        }
    }
})

onStartUp()