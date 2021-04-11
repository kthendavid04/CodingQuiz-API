var currentQuizQuestionsIndex = 0;
var time = questions.length * 13;
var setTimer = "";

var quizQuestions = document.getElementById("questions");
var timerCount = document.getElementById("timer");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startQuiz");
var initials = document.getElementById("initials");
var scores= document.getElementById("scores");





function startQuiz () {
    var startscrn = document.getElementById("start-screen");
    startscrn.setAttribute("class", "hide");

    quizQuestions.removeAttribute("class");

    setTimer = setInterval(clockTick, 1000);

    timerCount.textContent = time;

    getQuizQuestions();
}

function getQuizQuestions(){
    var currentQuizQuestions = questions[currentQuizQuestionsIndex];
    var inquiry = document.getElementById("questions-inquiry");
    inquiry.textContent = currentQuizQuestions.inquiry;
    options.innerHTML = "";
    currentQuizQuestions.options.forEach(function (options, i){
        var choicesNode = document.createElement("button");
        choicesNode.setAttribute("class", "choices");
        choicesNode.setAttribute("value", options);
        choicesNode.textContent = i + 1 + " . " + options;
        choicesNode.onclick = questionsClick;
        optionsEl.appendChild(choicesNode);

    });
}


function questionsClick(){
    if(this.value !== questions[currentQuizQuestionsIndex].answer) {
        time -= 13;
        if (time < 0){
            time = 0;
        }
        
        timerCount.textContent = time;
        scores.textContent = "Incorrect";
    } else{
        scores.textContent = "You got it!"
    }

    scores.setAttribute("class", "feedback");
    setTimeout(function(){
        scores.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuizQuestionsIndex++;

    if(currentQuizQuestionsIndex === questions.length){
        quizEnd();
    } else { 
        getQuizQuestions();
    }
}

function quizEnd(){
    clearInterval(setTimer);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute ("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    quizQuestions.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerCount.textContent = time;
    if (time <= 0) {
        quizEnd()
    }
}



function saveHighscore(){
    var initials = initials.value.trim();
    if(initials !== ""){
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time, 
            initials: initials
        };
         
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event){
    if(event.key ==="Enter"){
        saveHighscore();
    }
}


startBtn.onclick = startQuiz;



initials.onkeyup = checkForEnter;
 


