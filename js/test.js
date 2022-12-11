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

const reflexiveArVerbs = {
    lavar: "To wash"
};

const reflexiveErVerbs = {
    atreverse: "To dare"
};

const reflexiveIrVerbs = {
    aburrir: "To get bored"
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

// const tenses = [
//     presAr,
//     pretAr,
//     imperfAr,
//     futAr,
//     condAr,
//     refAr,
//     presConAr,
//     perfAr,
//     pluperfAr,
//     presSubjAr,
//     imperaPosAr,
//     imperaNegAr,
// ];

const reflexiveTenses = [refAr, refEr, refIr];

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
    if (currentTense.title.includes("Reflexive")){
        if (currentTense.title.includes("(-ar)")){
            currentVerbType = reflexiveArVerbs;
        } else if (currentTense.title.includes("(-er)")){
            currentVerbType = reflexiveErVerbs;
        } else if (currentTense.title.includes("(-ir)")){
            currentVerbType = reflexiveIrVerbs;
        }
    } else if (currentTense.title.includes("(-ar)")){
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
    if (currentTense.title.includes("imperative")){
        console.log("test");
        const imperativePersons = {
        "tú": "you",
        "nosotros/nosotras": "we",
        "vosotros/vosotras": "you all"
        };
        currentPerson = Object.keys(imperativePersons)[Math.floor(Math.random() * Object.keys(imperativePersons).length)]
     } else{currentPerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    console.log("currentPerson: " + currentPerson);
    }
}

function updateEnglish(){
    document.getElementById("english").innerHTML=currentVerbType[currentVerb] + "<br />" + "(" + persons[currentPerson] + ")";
}

function newAnswer(){
    if(currentTense.title.includes("Present continuous") || currentTense.title.includes("Perfect") || currentTense.title.includes("Pluperfect")){
        document.getElementById("spanish").innerHTML = currentTense[currentPerson].split("/")[0] + " " + currentVerb.slice(0,-2) + currentTense[currentPerson].split("-")[1];
    } else if (currentTense.title.includes("Future") || currentTense.title.includes("Conditional")) {
        document.getElementById("spanish").innerHTML = currentVerb + currentTense[currentPerson].slice(1);
    } else if(currentTense.title.includes("Reflexive")){
        if(currentTense.title.includes("-ar")){
            const reflexiveEnding = presAr;
            console.log("refEnding:", reflexiveEnding[currentPerson]);
            document.getElementById("spanish").innerHTML = currentTense[currentPerson] + " " + currentVerb.slice(0,-2) + reflexiveEnding[currentPerson].slice(1);
        } else if(currentTense.title.includes("-er")){
            const reflexiveEnding = presEr;
            console.log("refEnding:", reflexiveEnding[currentPerson]);
            document.getElementById("spanish").innerHTML = currentTense[currentPerson] + " " + currentVerb.slice(0,-2) + reflexiveEnding[currentPerson].slice(1);
        } else if(currentTense.title.includes("-ir")){
            const reflexiveEnding = presIr;
            console.log("refEnding:", reflexiveEnding[currentPerson]);
            document.getElementById("spanish").innerHTML = currentTense[currentPerson] + " " + currentVerb.slice(0,-2) + reflexiveEnding[currentPerson].slice(1);
        }
    } else {
        document.getElementById("spanish").innerHTML=currentVerb.slice(0,-2) + currentTense[currentPerson].slice(1);
    }
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
    newAnswer();
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