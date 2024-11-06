//Lesson1Script.js
//This takes the data from the text box and saves it to a variable once the submit button has been pressed.
document.getElementById("Submit").addEventListener("click", function(){
    textareaContent = document.getElementById("UserCode").value;
    
    if(textareaContent == "Passed"){
        window.location.href = 'Lesson2.html';
        alert("Correct!")
    } else {
        alert("Incorrect Please Try Again");
    }
})