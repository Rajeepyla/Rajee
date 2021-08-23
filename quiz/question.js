
(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input id="option"type="radio" data-type="horizontal" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers" id="options" style="background-colour:red;"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}
      <div id="result"> </div>
      <div id="piechart">  </div>`;  
      google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart(numCorrect));
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Who invented HTML?",
        answers: {
          a: "Tim Berbers Lee",
          b: "Ryan Dahl",
          c: "Sheryl Sandberg"
        },
        correctAnswer: "a"
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm"
        },
        correctAnswer: "c"
      },
      {
        question: "Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        },
        correctAnswer: "d"
      },
      {
          question: "DOM stands for?",
        answers: {
          a: "Document Object Model",
          b: "Database Object Method",
          c: "Data output Module"
        },
        correctAnswer: "a"
       },
       {
        question: "BOM stands for?",
        answers: {
          a: "Browser Object Method",
          b: "Browser Object Model",
          c: "Byte Output Module"
        },
        correctAnswer: "b"
      },
      {
        question: "IIFE stands for?",
        answers: {
          a: "Integrated Image Front End",
          b: "Imense Info Function Extension",
          c: "Immediately Invoked Function Extension"
        },
        correctAnswer:"c"
      },
      {
        question: "DOM stands for?",
      answers: {
        a: "Document Object Model",
        b: "Database Object Method",
        c: "Data output Module"
      },
      correctAnswer: "a"
     },
     {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
      question: "BOM stands for?",
      answers: {
        a: "Browser Object Method",
        b: "Browser Object Model",
        c: "Byte Output Module"
      },
      correctAnswer: "b"
    },
    {
      question: "BOM stands for?",
      answers: {
        a: "Browser Object Method",
        b: "Browser Object Model",
        c: "Byte Output Module"
      },
      correctAnswer: "b"
    },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  function drawChart(numCorrect) {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Wrong', 10-numCorrect],
    ['Correct', numCorrect],
  ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {'title':'Your Score', 'width':550, 'height':400};
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    if(numCorrect>=4){
      document.getElementById('result').innerHTML='Passed';
    }
    else{
      document.getElementById('result').innerHTML='Fail';
    }
  }
  