// | ARRAYS AND VARIABLES

const verbs = {
    hablar: "talk",
    vivir: "live"
}

const tenses = [presAr, pretAr];

const persons = {
    "yo": "I",
    "tú": "you",
    "él/ella": "he/she"
};

let currentVerb;
let currentTense;
let currentPerson;

// | EVENT LISTENERS
document.getElementById("test-show-ans").addEventListener("click", showAnswer);
document.getElementById("test-got-it").addEventListener("click", gotIt);
document.getElementById("test-not-it").addEventListener("click", tryAgain);

// | TEST

function newTest(){

    currentVerb = Object.keys(verbs)[Math.floor(Math.random() * Object.keys(verbs).length)];
    console.log("current verb: " + currentVerb);

    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    console.log("current tense: " + currentTense.title);
    // console.log("currentTense: " + JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("("))));

    document.getElementById("tense").innerHTML=JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("(")));
    // I THINK I CAN MASSIVELY CUT DOWN THE CODE IN APP.JS (ALL THE "IF TENSE ===" STUFF) BY USING VARIABLES IN MY CONST ARRAYS RATHER THAN STRINGS, THEN USING STRINGIFY TO CALL THEM)

    currentPerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    console.log("currentPerson: " + currentPerson);

    document.getElementById("english").innerHTML=persons[currentPerson] + " " + verbs[currentVerb];
}

function revealEnding(){
    document.getElementById("spanish").innerHTML=currentVerb.slice(0,-2) + currentTense[currentPerson].slice(1);
}

function questionView(){
    document.getElementById("test-show-ans").style.display="inline-block";
    document.getElementById("test-got-it").style.display="none";
    document.getElementById("test-not-it").style.display="none";
}

function answerView(){
    document.getElementById("test-show-ans").style.display="none";
    document.getElementById("test-got-it").style.display="inline-block";
    document.getElementById("test-not-it").style.display="inline-block";
}

function resetTable(){
    document.getElementById("spanish").innerHTML="?";
}

// | BUTTON FUNCTIONS

function showAnswer() {
    revealEnding();
    answerView()
}

function gotIt(){
    questionView();
    newTest();
    resetTable();
}

function tryAgain(){
    questionView();
    newTest();
    resetTable();
}

newTest();