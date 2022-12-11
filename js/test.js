// I THINK I CAN MASSIVELY CUT DOWN THE CODE IN APP.JS (ALL THE "IF TENSE ===" STUFF) BY USING VARIABLES IN MY CONST ARRAYS RATHER THAN STRINGS, THEN USING STRINGIFY TO CALL THEM)

// | ARRAYS AND VARIABLES

const arVerbs = {
    hablar: "To talk"
};

const erVerbs = {
    comer: "To eat"
};

const irVerbs = {
    vivir: "To live"
};

const tenses = [
    presAr, presEr, presIr,
    pretAr, pretEr, pretIr,
    imperfAr, imperfEr, imperfIr,
    futAr, futEr, futIr,
    condAr, condEr, condIr,
    refAr, refEr, refIr,
    presConAr, presConEr, presConIr,
    perfAr, perfEr, perfIr,
    pluperfAr, pluperfEr, pluperfIr,
    presSubjAr, presSubjEr, presSubjIr,
    imperaPosAr, imperaPosEr, imperaPosIr,
    imperaNegAr, imperaNegEr, imperaNegIr
];

const persons = {
    "yo": "I",
    "tú": "you",
    "él/ella": "he/she",
    "nosotros/nosotras": "we",
    "vosotros/vosotras": "you all",
    "ellos/ellas": "they"
};

let currentVerb;
let currentVerbType;
let currentTense;
let currentPerson;

// | EVENT LISTENERS
document.getElementById("test-show-ans").addEventListener("click", showAnswer);
document.getElementById("test-got-it").addEventListener("click", gotIt);
document.getElementById("test-not-it").addEventListener("click", tryAgain);

// | TEST
function newTest(){
    updateTense();
    newVerbType();
    newVerb();
    newPerson();
    updateEnglish();
}

function updateTense(){
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    console.log("currentTense.title: " + currentTense.title);

    document.getElementById("tense").innerHTML=currentTense.title.slice(0, currentTense.title.indexOf("("));
}

function newVerbType(){
    if (currentTense.title.includes("(-ar)")){
        currentVerbType = arVerbs;
        console.log("currentVerbType:", currentVerbType);
    } else if (currentTense.title.includes("(-er)")){
        currentVerbType = erVerbs;
        console.log("currentVerbType:", currentVerbType);
    } else if (currentTense.title.includes("(-ir)")){
        currentVerbType = irVerbs;
        console.log("currentVerbType:", currentVerbType);
    }
}

function newVerb(){
    currentVerb = Object.keys(currentVerbType)[Math.floor(Math.random() * Object.keys(currentVerbType).length)];
    console.log("current verb: " + currentVerb);
}

function newPerson(){
    currentPerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    console.log("currentPerson: " + currentPerson);
}


function updateEnglish(){
    document.getElementById("english").innerHTML=currentVerbType[currentVerb] + "<br />" + "(" + persons[currentPerson] + ")";
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