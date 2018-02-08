let quizApp = {
	currentQuestion: 0,
	overallCorrect: 0,
	questions: [
		{
			q: "Which best describes a belay device?",
			ans: ["a piece of climbing equipment used to control a rope during belaying", "a device used to secure climbers to the wall", "an equipment used to keep the rope from being untangled", "a device used to check if the rope is usable"],
			correct: 0,
			userAnswer: null
		},
		{
			q: "What is the name of the grading system for Bouldering in North America?",
			ans: ["Vermin/V-Grade", "Derick/D-Grade", "Eisen/E-Grade", "Francis/F-Grade"],
			correct: 0,
			userAnswer: null,
		},
		{
			q: "As a climber, what is the most common knot used to tie the rope to the harness?",
			ans: ["Fisherman knot", "Square knot", "Figure-8 knot", "Monkey knot"],
			correct: 2,
			userAnswer: null,
		},
		{
			q: "Which best describes a 'Crimp'? ",
			ans: ["A rock where one has to hold the rock as if it was a ball", "A rock where one has to pinch it", "A rock where one grabs the rock like a milk jug", "A rock where one has to use the tips of their fingers to hold"],
			correct: 3,
			userAnswer: null,
		},
		{
			q: "What is the role of a 'Belayer'?",
			ans: ["is a person who is climbing up the wall", " is the person on the ground who secures the climber", "a person who cleans the route of any debris", "a person that catches a person if they were to fall"],
			correct: 1,
			userAnswer: null,
		},
		{
			q: "__________ climbing is a style in climbing in which the climber is securely attached " +
			"to a rope which then passes up, through an anchor system at the top of the " +
			"climb, and down to a belayer at the foot of the climb.",
			ans: ["surface", "lead", "ascention", "top-rope"],
			correct: 3,
			userAnswer: null,
		},
		{
			q: "Which best describes a 'Sloper'?",
			ans: ["a term for a rock where one has to hold the rock like a ball", "A rock where one has to use the tips of their fingers to hold", "A rock where one grabs the rock like a milk jug", "A rock where one has to hold the rock as if it was a ball", "A rock where one has to pinch it"],
			correct: 0,
			userAnswer: null,
		},
		{
			q: "What is the name of the grading system for lead/top-rope climbing in North America? ",
			ans: ["Vermin Decimal System", "Yellowstone Decimal System", "Yosemite Decimal System", "Spiderman Decimal System"],
			correct: 2,
			userAnswer: null,
		},
		{
			q: "_______ is a specialized type of shackle, a metal loop where climbers can 'clip' the rope into it so that they are secured to the wall.",
			ans: ["belay device", "carabiner", "z-clips", "shovel"],
			correct: 1,
			userAnswer: null,
		},
		{
			q: "________ is when the climber grabs the rope from below the last clipped bolt and then clips it through a higher bolt, creating a _______.",
			ans: ["back-clipping/blacklash", "flagging/flail", "hangman/hazard", "z-clipping/z-shape"],
			correct: 3,
			userAnswer: null,
		}
	]
};
function startPage(){
	$("#questionPage").hide();
	$("#finalScore").hide();
	let intro = 
	'<div class="introduction">' +
		'<p>Welcome to the Rock-Climbing Fundemental Quiz! ' +
		'Here you will be tested on how well you know about ' +
		'the basic knowledge of the sport "Rock Climbing"!</p>' +
	'</div>' +
	'<button id="start" type="button">Start Quiz</button>';
	$("#startPage").append(intro);
	$('#start').on('click',function(){
		$("#startPage").hide();
		$("#questionPage").show();
		renderQuiz();
		handleSubmit();
		handleNext();
	});
}
function renderQuiz(){
	let currentQ = quizApp.currentQuestion;
	$("#qNum").text(currentQ + 1);
	$("#question").text(quizApp.questions[currentQ].q);
	$("#score").text(quizApp.overallCorrect + " out of " + quizApp.questions.length + " correct");
	$('input[name=answer]').prop('checked',false);
	quizApp.questions[currentQ].ans.forEach(function(current, index){
		$('label[for="ans' +index+ '"]').text(current);
	});
	$("#next-button").hide();
	
}
function handleSubmit(){
	$("#quizForm").submit(function(event){
		event.preventDefault();
		let userAns = Number($("input:radio:checked").val());
		console.log(userAns);
		storeUserAnswer(userAns);
		console.log(quizApp.questions[quizApp.currentQuestion]);
		checkUserAnswer();
		$("#submit-button").hide();
		$("#next-button").show();
	});
}
function handleNext(){
	$("#next-button").on('click', function(event){
		event.preventDefault();
		$("#correction").text("");
		if(quizApp.currentQuestion < quizApp.questions.length - 1){
			quizApp.currentQuestion +=1;
			renderQuiz();
		} else {
			results();
		}
		$("#submit-button").show();
		$("#next-button").hide();
	});
}
function storeUserAnswer(answer){
	quizApp.questions[quizApp.currentQuestion].userAnswer = answer;
}
function checkUserAnswer(){
	let currentQ = quizApp.currentQuestion;
	if(quizApp.questions[currentQ].userAnswer == quizApp.questions[currentQ].correct){
		$("#correction").text("That is Correct!");
		quizApp.overallCorrect += 1;
		$("#score").text(quizApp.overallCorrect + " out of " + quizApp.questions.length + " correct");
	} else {
		$("#correction").text("The correct answer is " + (quizApp.questions[currentQ].correct + 1));
	}
}
function results(){
	$("#questionPage").hide();
	$("#finalScore").show();
	let displayScore = 
	  '<h1>SCORE</h1>' +
		'<p>' + quizApp.overallCorrect + ' out of ' + quizApp.questions.length + ' correct</p>' +
		'<button id="restart">Try Again</button>';
	$("#finalScore").append(displayScore);
	$("#restart").on('click', function(event){
    event.preventDefault();
    $("#finalScore").text("");
    $("#finalScore").hide();
    $("#questionPage").show();
    newGame();
    renderQuiz();
  });
}	
function newGame(){
  quizApp.currentQuestion = 0;
  quizApp.overallCorrect = 0;
}
$(function(){
	startPage();
});