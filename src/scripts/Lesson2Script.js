//Lesson1Script.js
//This takes the data from the text box and saves it to a variable once the submit button has been pressed.
document.getElementById("Submit").addEventListener("click", function(){
    textareaContent = document.getElementById("UserCode").value;
    alert(textareaContent);
    if(textareaContent == "Passed"){
        window.location.href = 'Lesson2.html';
    }
})