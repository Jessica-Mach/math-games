
/**************** GLOBAL VARIABLES ************************/

/* BUTTONS */
let playButton = document.getElementById("play-btn"); // main user interface button for game
let answerButton = document.getElementById("answer-btn");
let chQuestion = document.getElementById("ch-question"); // challenge question


/* DISPLAY ELEMENTS */
let gameTitle = document.getElementById("title"); // title of game
let howTo = document.getElementById("how-to"); // how to play game
let infoIcon = document.getElementById("info-icon"); // info icon toggles on and off with title and how to play
let status = document.getElementById("status");
let gridRow1 = document.getElementById("oneToFive"); // answer grid 1 to 5
let gridRow2 = document.getElementById("sixToTen"); // answer grid 6 to 10
let gridRow3 = document.getElementById("elevenToFifteen"); // answer grid 11 to 15
let gridRow4 = document.getElementById("sixteenToTwenty"); // answer grid 16 to 20
let answerBox = document.getElementById("answer-box");
let grid1 = document.getElementById("one");
let grid2 = document.getElementById("two");
let grid3 = document.getElementById("three");
let grid4 = document.getElementById("four");
let grid5 = document.getElementById("five");
let grid6 = document.getElementById("six");
let grid7 = document.getElementById("seven");
let grid8 = document.getElementById("eight");
let grid9 = document.getElementById("nine");
let grid10 = document.getElementById("ten");
let grid11 = document.getElementById("eleven");
let grid12 = document.getElementById("twelve");
let grid13 = document.getElementById("thirteen");
let grid14 = document.getElementById("fourteen");
let grid15 = document.getElementById("fifteen");
let grid16 = document.getElementById("sixteen");
let grid17 = document.getElementById("seventeen");
let grid18 = document.getElementById("eighteen");
let grid19 = document.getElementById("nineteen");
let grid20 = document.getElementById("twenty");


/* GAME VARIABLES */
let game = 1; // determines which game is played
let userLevel = 1; // determines which level is played
let answeredCorrectly = 0; // tracks how many times player answered correctly
let answeredIncorrectly = 0; // tracks how many times player answered incorrectly
let answer = null; // stores answer 
let answerShape = null;
let previousShape = null;
let userAnswer = null; // stores user's answer
let locked = false;


/************ GAME COMPONENETS *************/
// Array of game objects
const games = [
  {
    id: 1,
    name: "Counting Game",
    howToPlay: "Count the shape. Click the grid to show correct amount.",
  }
];


/************ UPDATE HTML HELPER FUNCTIONS **********/
// hides any html element
const hide = (item) => item.hidden = true;

// shows any html element
const show = (item) => item.hidden = false;

// toggles info icon on and off - when icon displays - title and how to do not
const toggleInfo = function (){
	if(gameTitle.hidden === true){
		show(gameTitle);
		show(howTo);
	} else{
		hide(gameTitle);
		hide(howTo);
	}
}

// Takes in box and inserts a shape within the box
const insertShape = function(box, shapeString, shapeId){
	let shape = document.createElement("DIV");
	shape.className = shapeString;
	shape.id = shapeId;
	let childNode = box.appendChild(shape);
}

const removeShape = function(box, shape){
	box.removeChild(shape);
}

const randomShape = function(num) {
	let shape = Math.floor(Math.random() * num + 1);

	switch (shape){
		case 1: return "circle";
			break;
		case 2: return "triangle";
			break;
		case 3: return "square";
			break;
		default: return "circle";
	}
}

const removeAllChildNodes = function(box) {
	while(box.lastElementChild){
		box.removeChild(box.lastElementChild);
	}
}

const insertH1 = function(box, anyString, divClass){
	let h1 = document.createElement("H1");
	let div = document.createElement("DIV");
	h1.innerHTML = anyString;
	div.className = divClass;
	box.appendChild(div);
	div.appendChild(h1);
}

const insertP = function(box, anyString, divClass){
	let p = document.createElement("P");
	let div = document.createElement("DIV");
	p.innerHTML = anyString;
	div.className = divClass;
	box.appendChild(div);
	div.appendChild(p);
}

const insertIcon = function(box, iconClassString){
	let h1 = document.createElement("H1");
	let div = document.createElement("DIV");
	let icon = document.createElement("I");

	icon.className = iconClassString;
	div.className = "text-box";
	box.appendChild(div);
	div.appendChild(h1);
	h1.appendChild(icon);
}

const turnGreen = (box) => box.style.backgroundColor = "limegreen";

const turnRed = (box) => box.style.backgroundColor = "tomato";

const turnWhite = (box) => box.style.backgroundColor = "white";

const isCorrect = function(){
	if(answeredCorrectly === 3){
		userLevel++;
		answeredCorrectly = 0;
	}
}

const isIncorrect = function(){
	if(answeredIncorrectly === 3 && userLevel > 0){
		userLevel--;
		answeredIncorrectly = 0;
	}
}

/************* ANSWER GRID FUNCTIONALITY **************/

// Store grid row variables
const setGridRows = (row1, row2, row3, row4) => {
	let gridRowArray = []
	gridRowArray.push(row1);
	gridRowArray.push(row2);
	gridRowArray.push(row3);
	gridRowArray.push(row4);

	return gridRowArray;
}

// Create grid item object
const createGridItem = (idNum, element) => {
	let gridItem = {
		id: idNum, 
		gridElem: element, 
		clicked: false, 
		shape: false};
	element.addEventListener("click", function(){
		gridItemClick(gridItem);
	})
	return gridItem;
};

// Toggle shape appearing in grid
const gridItemClick = gridItem => {
	if(!locked){
		if(gridItem.clicked === false){
			gridItem.shape = gridItem.id + answerShape;
			insertShape(gridItem.gridElem, answerShape, gridItem.shape);
			gridItem.clicked = true;
		}else if (gridItem.clicked === true){
			removeAllChildNodes(gridItem.gridElem);
			gridItem.clicked = false;
			if(gridArray[gridItem.id + 1].clicked){
				gridItemClick(gridArray[gridItem.id + 1]);
			}
		}	
		if(gridItem.id > 1 && gridArray[gridItem.id - 2].clicked !== gridItem.clicked){
			gridItemClick(gridArray[gridItem.id - 2]);
		}
		for(let i = 0; i < gridArray.length; i++){
			if(gridArray[i].clicked){
				userAnswer++;
			}
		}
		status.innerHTML = userAnswer;
		userAnswer = 0;	
	}
}

// Initialize griditems
const initializeGrid = () => {
	let gridArray = [];
	
	gridArray.push(createGridItem(1, grid1));
	gridArray.push(createGridItem(2, grid2));
	gridArray.push(createGridItem(3, grid3));
	gridArray.push(createGridItem(4, grid4));
	gridArray.push(createGridItem(5, grid5));
	gridArray.push(createGridItem(6, grid6));
	gridArray.push(createGridItem(7, grid7));
	gridArray.push(createGridItem(8, grid8));
	gridArray.push(createGridItem(9, grid9));
	gridArray.push(createGridItem(10, grid10));
	gridArray.push(createGridItem(11, grid11));
	gridArray.push(createGridItem(12, grid12));
	gridArray.push(createGridItem(13, grid13));
	gridArray.push(createGridItem(14, grid14));
	gridArray.push(createGridItem(15, grid15));
	gridArray.push(createGridItem(16, grid16));
	gridArray.push(createGridItem(17, grid17));
	gridArray.push(createGridItem(18, grid18));
	gridArray.push(createGridItem(19, grid19));
	gridArray.push(createGridItem(20, grid20));
	
	return gridArray;
}



// Sets up grid variables for use in game functionality and display functionality
let gridRows = setGridRows(gridRow1, gridRow2, gridRow3, gridRow4);
let gridArray = initializeGrid();


/******************** PLAY BUTTON FUNCTIONALITY *********************/
const chooseGame = () => {
	if(game === 1){
		answer = 0;
		userAnswer = 0;
		hide(playButton);
		countingGame();
	}
}


/************** CHECK ANSWER BUTTON FUNCTIONALITY ***************/

// Determines game and level and checks user answer with actual answer
const checkAnswer = () => {
	let answerBox = document.getElementById("answer-box");
	locked = true;

	for(let i = 0; i < gridArray.length; i++){
		if(gridArray[i].clicked){
			userAnswer++;
		}
	}	
	status.innerHTML = answer;

	if(Number.isInteger(answer)){
		insertH1(answerBox, answer);
		hide(answerButton);
		show(playButton);
		for(let i = 0; i < answer; i++){
			if(userAnswer === answer){
				turnGreen(gridArray[i].gridElem);
			} else {
				turnRed(gridArray[i].gridElem);
			}	
		}
		if(userAnswer === answer){
			answeredCorrectly++;
		} else{
			answeredIncorrectly++;
		}
	}	
}



/**************** LEVEL DISPLAY FUNCTIONALITY ******************/
// Displays info bubble next to level buttons
const displayInfo = function(name, infoString){
	console.log(infoString);
	let info = document.getElementById(name);
	info.className = "ui-hover";
	info.innerHTML = infoString;
}

// Hides info bubble next to level button
const hideInfo = function(name){
	let info = document.getElementById(name);
	info.className = "none";
	info.innerHTML = "";
}

/**************** GAMES FUNCTIONALITY ******************/
const countingGame = function(){
	let shape = randomShape(3);
	if(shape === previousShape){
		if(shape < 3){
			shapeChoice++;
		}else{
			shapeChoice--;
		}
	}
	answerShape = shape;
	let challengeShape = document.getElementById("challenge-shape");
	let challengeSign = document.getElementById("challenge-sign");
	let answerBox = document.getElementById("answer-box");
	let gameLeft = document.getElementById("box-lt");
	let gameRight = document.getElementById("box-rt");
	
	//THIS IS WHERE YOU WERE MESSING WITH THINGS
	for(let i = 0; i < gridArray.length; i++){
		turnWhite(gridArray[i].gridElem);
		removeAllChildNodes(gridArray[i].gridElem);
		gridArray[i].clicked = false;
	}
	removeAllChildNodes(gameLeft);
	removeAllChildNodes(gameRight);
	removeAllChildNodes(challengeShape);
	removeAllChildNodes(challengeSign);
	removeAllChildNodes(answerBox);

	chQuestion.innerHTML = "How many?";
	show(chQuestion);
	insertShape(challengeShape, "answer-" + shape);
	insertP(challengeSign, "=", "text");
	show(answerButton);
	
	if(userLevel === 1){	
		answer = countShapes(5, 1, 1, shape);
		show(gridRow1);
		isCorrect();
	} else if (userLevel === 2){
		answer = countShapes(5, 3, 2, shape);
		show(gridRow1);
		isCorrect();
		isIncorrect();
	} else if (userLevel === 3){
		answer = countShapes(10, 5, 2, shape);
		show(gridRow1);
		show(gridRow2);
		isCorrect();
		isIncorrect();
	} else if (userLevel === 4){
		answer = countShapes(15, 10, 3, shape);
		show(gridRow1);
		show(gridRow2);
		show(gridRow3);
		isCorrect();
		isIncorrect();
	} else if (userLevel === 5){
		answer = countShapes(20, 15, 3, shape);
		show(gridRow1);
		show(gridRow2);
		show(gridRow3);
		//isCorrect();
		isIncorrect();
	}
}


/***************** FIRST ATTEMPT AT GAME ONE - WILL NEED TO BE UPDATED *************/
// Inserts squares, triangles, and circles randomly
const countShapes = function(maxShapes, minShapes, varietyOfShapes, shapeToCount){
	let boxR = document.getElementById("box-rt"); // stores the right box
	let boxL = document.getElementById("box-lt"); // stores the left box
	let shapesNum = Math.floor(Math.random() * maxShapes) + 1;
	if(shapesNum < minShapes){
		shapesNum = minShapes;
	}
	let side = 1;
	let variety = varietyOfShapes;
	let answerCount = 0;
	let userAnswer = 0;
	let randomIndex = Math.floor(Math.random() * shapesNum);
	let shapeChoice = 0;

	// Insert shapes a random number of times up to shapesNum
	// Alternate which side the shapes are displayed on
	for(let i = 0; i < shapesNum; i++){
		shapeChoice = Math.floor(Math.random() * variety) + 1;
		
		if(i === randomIndex){
			shapeChoice = 1;
		}
		if(shapeChoice === 1 && side === 1){
			insertShape(boxL, shapeToCount);
			side = 2;
			answerCount++;
		} else if(shapeChoice === 1 && side === 2) {
			insertShape(boxR, shapeToCount);
			side=1;
			answerCount++;
		} else if(shapeChoice === 2 && side === 1){
			insertShape(boxL, "circle");
			side = 2;
			if(shapeToCount === "circle"){
				answerCount++;
			}
		} else if(shapeChoice === 2 && side === 2){
			insertShape(boxR, "circle");
			side = 1;
			if(shapeToCount === "circle"){
				answerCount++;
			}
		} else if(shapeChoice === 3 && side === 1){
			insertShape(boxL, "square");
			side = 2;
			if(shapeToCount === "square"){
				answerCount++;
			}
		} else if(shapeChoice === 3 && side === 2){
			insertShape(boxR, "square");
			side = 1;
			if(shapeToCount === "square"){
				answerCount++;
			}
		} else if(shapeChoice === 4 && side === 1){
			insertShape(boxL, "triangle");
			side = 2;
			if(shapeToCount === "triangle"){
				answerCount++;
			}
		} else if(shapeChoice === 4 && side === 2){
			insertShape(boxR, "triangle");
			side = 1;
			if(shapeToCount === "square"){
				answerCount++;
			}
		} else{
			console.log("Error in countShapes() - shapeChoice");
		}
	}
	previousShape = shapeChoice;
	return answerCount;
}

/*************** BEGIN HERE ****************/
infoIcon.addEventListener("click", function(){
	toggleInfo();
});

playButton.addEventListener("click", function(){
	chooseGame();
	status.innerHTML = " ";
	locked = false;
	console.log(answeredCorrectly);
	console.log(previousShape);
});

answerButton.addEventListener("click", function(){
	checkAnswer();
});




// Initial display set-up
gridRows.every(hide);
hide(answerBox);
hide(answerButton);
hide(chQuestion);
toggleInfo();





