// | ARRAYS AND VARIABLES
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

let currentSampleTense;
let currentSampleVerb = {};
let currentSamplePerson;
let currentSample;

let currentTestCluster;
let currentTestTense;
let currentTestVerbType;
let currentTestVerb;
let currentTestPerson;

let currentAnswer;

let count = 0;
let correct = 0;
let percentage = 0;

// | EVENT LISTENERS
document.getElementById("test-quit-btn").addEventListener("click", testQuit);
document.getElementById("test-show-ans").addEventListener("click", showAnswer);
document.getElementById("test-got-it").addEventListener("click", gotIt);
document.getElementById("test-not-it").addEventListener("click", tryAgain);

document.getElementById("test-score-back-btn").addEventListener("click", scoreBack);

// | TEST - GENERATE SAMPLE
function newSampleTense(){
    currentSampleTense = tenses[Math.floor(Math.random() * tenses.length)];
}

function newSampleVerb(){
    // const allVerbs = [arVerbs, erVerbs, irVerbs, reflexiveArVerbs, reflexiveErVerbs, reflexiveIrVerbs];

    let verbType;
    if (currentSampleTense.title.includes("Reflexive")){
        if (currentSampleTense.title.includes("(-ar)")){
            verbType = reflexiveArVerbs;
        } else if (currentSampleTense.title.includes("(-er)")){
            verbType = reflexiveErVerbs;
        } else if (currentSampleTense.title.includes("(-ir)")){
            verbType = reflexiveIrVerbs;
        }
    } else if (!currentSampleTense.title.includes("Reflexive")){
        if (currentSampleTense.title.includes("(-ar)")){
        verbType = arVerbs;
    } else if (currentSampleTense.title.includes("(-er)")){
        verbType = erVerbs;
    } else if (currentSampleTense.title.includes("(-ir)")){
        verbType = irVerbs;
    }
}

    let keys = Object.keys(verbType);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let value = verbType[key];
    currentSampleVerb = {[key]: value};
}

function newSamplePerson(){
    if (currentSampleTense.title.includes("imperative")){
        const imperativePersons = {
        "tú": "you",
        "nosotros/nosotras": "we",
        "vosotros/vosotras": "you all"
        };
        currentSamplePerson = Object.keys(imperativePersons)[Math.floor(Math.random() * Object.keys(imperativePersons).length)]
     } else{currentSamplePerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    // console.log("currentSamplePerson: " + currentSamplePerson);
    }
}

function newSample(){
    currentSample = [];
    let currentSampleCluster = [];
    for (let i = 0; i < 10; i++){
        newSampleTense();
        newSampleVerb();
        newSamplePerson();
        currentSampleCluster = [currentSampleTense, currentSampleVerb, currentSamplePerson];
        currentSample.push(currentSampleCluster);
    }
}

newSample();

// | TEST - RUN TEST

function newTest(){
    console.log("currentSample: ", currentSample);
    currentTestCluster = currentSample[0];
    // console.log("currentTestCluster: ", currentTestCluster);
    currentTestTense = currentTestCluster[0];
    // console.log("currentTestTense: ", currentTestTense);
    currentTestVerb = currentTestCluster[1];
    // console.log("currentTestVerb: ", currentTestVerb);
    currentTestPerson = currentTestCluster[2];
    // console.log("currentTestPerson: ", currentTestPerson);

    document.getElementById("word-count").innerHTML = "Words remaining: " + currentSample.length;

    updateEnglish();

    newAnswer();
    revealHint();
}

function newAnswer(){
    if(currentTestTense.title.includes("Present continuous") || currentTestTense.title.includes("Perfect") || currentTestTense.title.includes("Pluperfect")){
        currentAnswer = currentTestTense[currentTestPerson].split("/")[0] + " " + JSON.stringify(Object.keys(currentTestVerb)).slice(2,-4) + currentTestTense[currentTestPerson].split("-")[1];
    } else if (currentTestTense.title.includes("Future") || currentTestTense.title.includes("Conditional")) {
        currentAnswer = JSON.stringify(Object.keys(currentTestVerb)).slice(2,-2) + currentTestTense[currentTestPerson].slice(1);
    } else if (currentTestTense.title.includes("Negative imperative")){
        currentAnswer = "no " + JSON.stringify(Object.keys(currentTestVerb)).slice(2,-4) + currentTestTense[currentTestPerson].slice(1);
    } else if(currentTestTense.title.includes("Reflexive")){
        if(currentTestTense.title.includes("-ar")){
            const reflexiveEnding = presAr;
            currentAnswer = currentTestTense[currentTestPerson] + " " + JSON.stringify(Object.keys(currentTestVerb)).slice(2,-4) + reflexiveEnding[currentTestPerson].slice(1);
        } else if(currentTestTense.title.includes("-er")){
            const reflexiveEnding = presEr;
            currentAnswer = currentTestTense[currentTestPerson] + " " + JSON.stringify(Object.keys(currentTestVerb)).slice(2, -4) + reflexiveEnding[currentTestPerson].slice(1);
        } else if(currentTestTense.title.includes("-ir")){
            const reflexiveEnding = presIr;
            currentAnswer = currentTestTense[currentTestPerson] + " " + JSON.stringify(Object.keys(currentTestVerb)).slice(2,-4) + reflexiveEnding[currentTestPerson].slice(1);
        }
    } else {
        currentAnswer = JSON.stringify(Object.keys(currentTestVerb)).slice(2,-4) + currentTestTense[currentTestPerson].slice(1);
    }
    console.log("answer: ", currentAnswer);
}

function revealHint(){
    // console.log("currentAnswer: ", currentAnswer);
    let hint = "";
    let words = currentAnswer.split(" ");
    // console.log("words: ", words);
    for (let word in words){
        // console.log(words[word][0] + "...");
        hint += words[word][0] + "... ";
        hint.trim();
    }
    // console.log("hint: ", hint); 
    document.getElementById("spanish").innerHTML = hint;
}

function updateEnglish(){
   document.getElementById("tense").innerHTML=currentTestTense.title.slice(0, currentTestTense.title.indexOf("("))
   
   document.getElementById("english").innerHTML=JSON.stringify(Object.values(currentTestVerb)).slice(2, -2) + "<br />" + "(" + persons[currentTestPerson] + ")";
}

function revealAnswer(){
    document.getElementById("spanish").innerHTML = currentAnswer;
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

function saveScore(){
    document.getElementById("test-score").innerHTML="Score: " + percentage + "%";
    document.getElementById("test").style.display="none";
    document.getElementById("test-score-container").style.display="flex";
}

function resetCounts(){
    count = 0;
    correct = 0;
}

// | BUTTON FUNCTIONS
function showAnswer() {
    revealAnswer();
    answerView();
}

function gotIt(){
    count += 1;
    correct += 1;
    console.log("CORRECT: ", correct);

    console.log("SHIFTED: ", currentSample.shift());

    questionView();
    resetTable();

    if (currentSample.length > 0){
        newTest();
    } else {
        console.log("GAME OVER")
        percentage = parseInt((correct/count)*100);
        saveScore();
    }
}

function tryAgain(){
    count += 1;

    // move incorrectly-guessed example to the end of currentSample
    currentSample.push(currentSample.splice(0, 1)[0]);

    questionView();
    resetTable();
    newTest();
}

function testQuit(){
    window.location.href = "./index.html";
    resetTable();
    resetCounts();
}

function scoreBack(){
    document.getElementById("test-score-container").style.display="none";
    document.getElementById("test").style.display="block";

    newSample();
    resetTable();
    resetCounts();
    newTest();
}

newTest();