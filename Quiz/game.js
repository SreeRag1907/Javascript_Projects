const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const timerDisplay = document.getElementById('timer'); // Timer display element
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeLeft = 15; // Timer for 15 seconds
let timer; // Timer variable

// JSON Questions
// JSON Questions
let questions = [
    
  {
      "question": "In which group of places the Kumbha Mela is held every twelve years?",
      "choices": {
        "choice1": "Ujjain, Puri, Prayag, Haridwar",
        "choice2": "Prayag, Haridwar, Ujjain, Nasik",
        "choice3": "Rameshwaram, Puri, Badrinath, Dwarika",
        "choice4": "Chitrakoot, Ujjain, Prayag, Haridwar"
      },
      "answer": 2
    },
    {
      "question": "Which river is known as the 'Sorrow of Bihar'?",
      "choices": {
        "choice1": "Yamuna",
        "choice2": "Ganga",
        "choice3": "Kosi",
        "choice4": "Godavari"
      },
      "answer": 3
    },
    {
      "question": "Who wrote the Indian National Anthem, 'Jana Gana Mana'?",
      "choices": {
        "choice1": "Rabindranath Tagore",
        "choice2": "Bankim Chandra Chattopadhyay",
        "choice3": "Sarojini Naidu",
        "choice4": "Mohandas Karamchand Gandhi"
      },
      "answer": 1
    },
    {
      "question": "Which is the largest state in India by area?",
      "choices": {
        "choice1": "Uttar Pradesh",
        "choice2": "Rajasthan",
        "choice3": "Maharashtra",
        "choice4": "Madhya Pradesh"
      },
      "answer": 2
    },
    {
      "question": "Which Indian city is famous for its 'Charminar' monument?",
      "choices": {
        "choice1": "Kolkata",
        "choice2": "Hyderabad",
        "choice3": "Mumbai",
        "choice4": "Jaipur"
      },
      "answer": 2
    },
    {
      "question": "Who is known as the 'Iron Man of India'?",
      "choices": {
        "choice1": "Jawaharlal Nehru",
        "choice2": "Sardar Vallabhbhai Patel",
        "choice3": "Subhas Chandra Bose",
        "choice4": "B.R. Ambedkar"
      },
      "answer": 2
    },
    {
      "question": "Which state in India is famous for the 'Valley of Flowers'?",
      "choices": {
        "choice1": "Uttarakhand",
        "choice2": "Himachal Pradesh",
        "choice3": "Jammu and Kashmir",
        "choice4": "Sikkim"
      },
      "answer": 1
    },
    {
      "question": "Which Indian state is known as the 'Land of the Gods'?",
      "choices": {
        "choice1": "Uttar Pradesh",
        "choice2": "Himachal Pradesh",
        "choice3": "Rajasthan",
        "choice4": "Kerala"
      },
      "answer": 2
    },
    {
      "question": "Who was the first woman Prime Minister of India?",
      "choices": {
        "choice1": "Indira Gandhi",
        "choice2": "Sonia Gandhi",
        "choice3": "Pratibha Patil",
        "choice4": "Sheila Dikshit"
      },
      "answer": 1
    },
    {
      "question": "Which Indian festival is known as the 'Festival of Lights'?",
      "choices": {
        "choice1": "Diwali",
        "choice2": "Holi",
        "choice3": "Dussehra",
        "choice4": "Navratri"
      },
      "answer": 1
    },
    {
      "question": "Which city in India is famous for its Mysore Palace?",
      "choices": {
        "choice1": "Mumbai",
        "choice2": "Bengaluru",
        "choice3": "Chennai",
        "choice4": "Hyderabad"
      },
      "answer": 2
    },
    {
      "question": "Who was the first President of independent India?",
      "choices": {
        "choice1": "Jawaharlal Nehru",
        "choice2": "Sardar Vallabhbhai Patel",
        "choice3": "Dr. Rajendra Prasad",
        "choice4": "B.R. Ambedkar"
      },
      "answer": 3
    },
    {
      "question": "What is the national animal of India?",
      "choices": {
        "choice1": "Lion",
        "choice2": "Tiger",
        "choice3": "Elephant",
        "choice4": "Leopard"
      },
      "answer": 2
    },
    {
      "question": "Which Indian state is known as the 'Land of Festivals'?",
      "choices": {
        "choice1": "Uttar Pradesh",
        "choice2": "Punjab",
        "choice3": "West Bengal",
        "choice4": "Kerala"
      },
      "answer": 3
    },
    {
      "question": "Who is known as the 'Missile Man of India'?",
      "choices": {
        "choice1": "A.P.J. Abdul Kalam",
        "choice2": "Vikram Sarabhai",
        "choice3": "Homai Vyarawalla",
        "choice4": "Satish Dhawan"
      },
      "answer": 1
    },
    {
      "question": "Which Indian city is famous for its Marina Beach?",
      "choices": {
        "choice1": "Mumbai",
        "choice2": "Kolkata",
        "choice3": "Chennai",
        "choice4": "Goa"
      },
      "answer": 3
    },
    {
      "question": "Who composed the Indian national song 'Vande Mataram'?",
      "choices": {
        "choice1": "Rabindranath Tagore",
        "choice2": "Bankim Chandra Chattopadhyay",
        "choice3": "Sarojini Naidu",
        "choice4": "Mohandas Karamchand Gandhi"
      },
      "answer": 2
    },
    {
      "question": "Which Indian state is known as the 'Spice Garden of India'?",
      "choices": {
        "choice1": "Kerala",
        "choice2": "Karnataka",
        "choice3": "Tamil Nadu",
        "choice4": "Andhra Pradesh"
      },
      "answer": 1
    },
    {
      question: "Who is known as the Father of the Indian Constitution?",
      choices: {
          choice1: "Mahatma Gandhi",
          choice2: "Jawaharlal Nehru",
          choice3: "B.R. Ambedkar",
          choice4: "Sardar Patel"
      },
      answer: 3
  }, 
  
  {
      question: "Which Indian state is known as the 'Land of Five Rivers'?",
      choices: {
          choice1: "Punjab",
          choice2: "Uttar Pradesh",
          choice3: "Maharashtra",
          choice4: "Rajasthan"
      },
      answer: 1
  }

];


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    startTimer(); // Start the timer when the game starts
};

getNewQuestion = () => {
  resetTimer(); // Reset timer for each new question
  if (availableQuestions.length === 0 || questionCounter >= questions.length) {
      localStorage.setItem('mostRecentScore', score);
      // Go to the end page
      return window.location.assign('./end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${questions.length}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
      choice.innerText = currentQuestion.choices['choice' + (index + 1)];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  startTimer(); // Start the timer for the new question
};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = () => {
    score += 10;
    scoreText.innerText = score;
};

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
      if (timeLeft > 0) {
          timeLeft--;
          timerDisplay.innerText = timeLeft; // Update timer display
      } else {
          clearInterval(timer); // Clear the timer when it reaches 0
          // Handle timeout, for example, move to the next question or show correct answer
          // You can add your logic here
          getNewQuestion(); // Move to the next question when time runs out
      }
  }, 1000); // Timer updates every second
}


// Function to reset the timer
function resetTimer() {
    clearInterval(timer); // Clear the timer
    timeLeft = 15; // Reset timer to 15 seconds
    timerDisplay.innerText = timeLeft; // Update timer display
}

startGame();
