// | ARRAYS AND VARIABLES

const arVerbs = {
    hablar: "talk"
};

const erVerbs = {
    comer: "to eat"
};

const irVerbs = {
    vivir: "live"
};

const tenses = [presAr, presIr, pretAr];

const persons = {
    "yo": "I",
    "tú": "you",
    "él/ella": "he/she",
    "nosotros/nosotras": "we",
    "vosotros/vosotras": "you all",
    "ellos/ellas": "they"
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
    updateTense();
    newVerb();
    newPerson();
    updateEnglish();
}

function updateTense(){
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    console.log("current tense: " + currentTense.title);
    // console.log("currentTense: " + JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("("))));

    document.getElementById("tense").innerHTML=JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("(")));
    // I THINK I CAN MASSIVELY CUT DOWN THE CODE IN APP.JS (ALL THE "IF TENSE ===" STUFF) BY USING VARIABLES IN MY CONST ARRAYS RATHER THAN STRINGS, THEN USING STRINGIFY TO CALL THEM)
}

function newVerb(){
    if (String(currentTense).includes("(-ar)")){
        currentVerb = Object.keys(arVerbs)[Math.floor(Math.random() * Object.keys(arVerbs).length)];
        console.log("current verb: " + currentVerb);
    } else if (String(currentTense).includes("(-er")){
        currentVerb = Object.keys(erVerbs)[Math.floor(Math.random() * Object.keys(erVerbs).length)];
        console.log("current verb: " + currentVerb);
    } else if (String(currentTense).includes("(-ir")){
        currentVerb = Object.keys(irVerbs)[Math.floor(Math.random() * Object.keys(irVerbs).length)];
        console.log("current verb: " + currentVerb);
    }
}

function newPerson(){
    currentPerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    console.log("currentPerson: " + currentPerson);
}


function updateEnglish(){
    if (currentPerson == "él/ella") {
        document.getElementById("english").innerHTML=persons[currentPerson] + " " + arVerbs[currentVerb] + "s";
    } else {
        document.getElementById("english").innerHTML=persons[currentPerson] + " " + currentVerb;
    }
}

function newEnding(){
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
    newEnding();
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