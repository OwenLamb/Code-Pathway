document.addEventListener("DOMContentLoaded", function () {
    // Get a random question from the backend
    fetch('/get_random_question')
      .then(response => response.json())
      .then(data => {
        // Update the question text with the fetched question
        document.getElementById('question-text').innerText = data.question;
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        document.getElementById('question-text').innerText = 'Failed to load question.';
      });
  
    const form = document.getElementById('code-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const userAnswer = document.getElementById('user-answer').value;
      const questionText = document.getElementById('question-text').innerText;
  
      // Send question and answer to the backend
      fetch('/evaluate_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: questionText,
          answer: userAnswer
        })
      })
      .then(response => response.json())
      .then(data => {
        // Show feedback in frontend
        document.getElementById('feedback-text').innerText = data.feedback;
      })
      .catch(error => {
        console.error('Error submitting answer:', error);
        document.getElementById('feedback-text').innerText = 'Error in submission.';
      });
    });
  });
  
