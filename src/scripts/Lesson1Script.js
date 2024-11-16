//Lesson1Script.js
//This takes the data from the text box and saves it to a variable once the submit button has been pressed.
var userQuizGrade = false;
document.getElementById("Submit").addEventListener("click", function(){
    textareaContent = document.getElementById("UserCode").value;

    //Change to get AI's response on whether it works
    //Update Users progress here too
    if(textareaContent == "Passed"){
        userQuizGrade = true;
        document.getElementById('Continue').classList.remove('hidden');
    } else {
        alert("Incorrect Please Try Again");
    }

    let AIResponseDiv = document.getElementById('AIResponse');
    AIResponseDiv.classList.remove('hidden')
    AIResponseDiv.innerHTML = "Input AI's response here"
})

document.getElementById("Continue").addEventListener("click", function(){
    if(userQuizGrade){
        window.location.href = 'Lesson2.html';
    } else {
        alert("You have not yet passed the quiz")
    }
})