var listScores = document.getElementById("listScores")
var savedScores = JSON.parse(localStorage.getItem("savedScores"))

var returnHomeButton = document.getElementById("return-home")
var resetScoresButton = document.getElementById("reset-scores")


//Display all scores saved
function renderScores(){

    //Checks if there are any scores to be displayed
    if(savedScores === null){
        savedScores = []

        //If no scores are available display that on highscore page
        var newLi = document.createElement("li")
        newLi.textContent = "No scores saved, play game to display score"
        listScores.appendChild(newLi)
    }

    //If there are scores to be displayed go through them and display themon highscore page
    for(var i = 0; i < savedScores.length; i++){

        var newLi = document.createElement("li")
        newLi.textContent = savedScores[i]

        //Adds color styles to everyother li
        if((i % 2)===0){
            newLi.setAttribute("class","list-group-item list-group-item-info")
        }else{
            newLi.setAttribute("class","list-group-item")
        }

    listScores.appendChild(newLi)
}
}

//listens for clicks on return home button, wehn clicked directs user to index.html
returnHomeButton.addEventListener("click",function(){
    window.location.href = "./index.html";
})

//listens for clicks on reset scores button, wehn clicked directs will clear local storage
resetScoresButton.addEventListener("click",function(){
    localStorage.clear()
    location.reload()
})


renderScores()