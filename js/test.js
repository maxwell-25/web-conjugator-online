// | ARRAYS AND VARIABLES

const verbs = Object.assign({}, arVerbs, erVerbs, irVerbs);
// reflexiveArVerbs, reflexiveErVerbs, reflexiveIrVerbs

const tenses = [
    presAr, presEr, presIr,
    // pretAr, pretEr, pretIr,
    // imperfAr, imperfEr, imperfIr,
    // futAr, futEr, futIr,
    // condAr, condEr, condIr,
    // refAr, refEr, refIr,
    // presConAr, presConEr, presConIr,
    // perfAr, perfEr, perfIr,
    // pluperfAr, pluperfEr, pluperfIr,
    // presSubjAr, presSubjEr, presSubjIr,
    // imperaPosAr, imperaPosEr, imperaPosIr,
    // imperaNegAr, imperaNegEr, imperaNegIr
];

const reflexiveTenses = [refAr, refEr, refIr];

const persons = {
    "yo": "I",
    "tú": "you",
    "él/ella": "he/she",
    "nosotros/nosotras": "we",
    "vosotros/vosotras": "you all",
    "ellos/ellas": "they"
};

let currentSampleVerb;
let currentSampleVerbType;
let currentSampleTense;
let currentSamplePerson;
let currentSample;

let currentTestCluster;
let currentTestTense;
let currentTestVerb;
let currentTestPerson;

let currentAnswer;

let count = 0;
let correct = 0;

// | EVENT LISTENERS
document.getElementById("test-show-ans").addEventListener("click", showAnswer);
document.getElementById("test-got-it").addEventListener("click", gotIt);
document.getElementById("test-not-it").addEventListener("click", tryAgain);

// | TEST
function newSampleTense(){
    currentSampleTense = tenses[Math.floor(Math.random() * tenses.length)];
    // console.log("currentSampleTense.title: " + currentSampleTense.title);
}

function newSampleVerbType(){
    if (currentSampleTense.title.includes("Reflexive")){
        if (currentSampleTense.title.includes("(-ar)")){
            currentSampleVerbType = reflexiveArVerbs;
        } else if (currentSampleTense.title.includes("(-er)")){
            currentSampleVerbType = reflexiveErVerbs;
        } else if (currentSampleTense.title.includes("(-ir)")){
            currentSampleVerbType = reflexiveIrVerbs;
        }
    } else if (currentSampleTense.title.includes("(-ar)")){
        currentSampleVerbType = arVerbs;
        // console.log("currentSampleVerbType:", currentSampleVerbType);
    } else if (currentSampleTense.title.includes("(-er)")){
        currentSampleVerbType = erVerbs;
        // console.log("currentSampleVerbType:", currentSampleVerbType);
    } else if (currentSampleTense.title.includes("(-ir)")){
        currentSampleVerbType = irVerbs;
        // console.log("currentSampleVerbType:", currentSampleVerbType);
    }
}

function newSampleVerb(){
    currentSampleVerb = Object.keys(currentSampleVerbType)[Math.floor(Math.random() * Object.keys(currentSampleVerbType).length)];
    // console.log("currentSampleVerb: " + currentSampleVerb);
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
    newSampleTense();
    newSampleVerbType();
    newSampleVerb();
    newSamplePerson();
    // newAnswer();
    // console.log("currentSampleTense: ", currentSampleTense);
    // console.log("currentSampleVerb: ", currentSampleVerb);
    // console.log("currentSamplePerson: ", currentSamplePerson);
    // console.log("currentAnswer: ", currentAnswer);
    currentSample = [];
    let currentCluster = [];
    for (let i = 0; i < 10; i++){
        currentCluster = [currentSampleTense, currentSampleVerb, currentSamplePerson];
        // console.log("currentCluster: ", currentCluster);
        currentSample.push(currentCluster);
        newSampleTense();
        newSampleVerb();
        newSamplePerson();
    }
    // console.log("currentSample: ", currentSample);
}

newSample();

function newTest(){
    newTestElements();
}

function newTestElements(){
    console.log("currentSample: ", currentSample);
    currentTestCluster = currentSample[0];
    console.log("currentTestCluster: ", currentTestCluster);
    currentTestTense = currentTestCluster[0];
    console.log("currentTestTense: ", currentTestTense);
    currentTestVerb = currentTestCluster[1];
    console.log("currentTestVerb: ", currentTestVerb);
    currentTestPerson = currentTestCluster[2];
    console.log("currentTestPerson: ", currentTestPerson);

    updateEnglish();
}

function newAnswer(){
    if(currentTestTense.title.includes("Present continuous") || currentTestTense.title.includes("Perfect") || currentTestTense.title.includes("Pluperfect")){
        currentAnswer = currentTestTense[currentTestPerson].split("/")[0] + " " + currentTestVerb.slice(0,-2) + currentTestTense[currentTestPerson].split("-")[1];
        document.getElementById("spanish").innerHTML = currentAnswer;
    } else if (currentTestTense.title.includes("Future") || currentTestTense.title.includes("Conditional")) {
        currentAnswer = currentTestVerb + currentTestTense[currentTestPerson].slice(1);
        document.getElementById("spanish").innerHTML = currentAnswer;
    } else if (currentTestTense.title.includes("Negative imperative")){
        currentAnswer = "no " + currentTestVerb.slice(0,-2) + currentTestTense[currentTestPerson].slice(1);
        document.getElementById("spanish").innerHTML = currentAnswer;
    } else if(currentTestTense.title.includes("Reflexive")){
        if(currentTestTense.title.includes("-ar")){
            const reflexiveEnding = presAr;
            // console.log("refEnding:", reflexiveEnding[currentSamplePerson]);
            currentAnswer = currentTestTense[currentTestPerson] + " " + currentTestVerb.slice(0,-2) + reflexiveEnding[currentTestPerson].slice(1);
            document.getElementById("spanish").innerHTML = currentAnswer;
        } else if(currentSampleTense.title.includes("-er")){
            const reflexiveEnding = presEr;
            // console.log("refEnding:", reflexiveEnding[currentSamplePerson]);
            currentAnswer = currentTestTense[currentTestPerson] + " " + currentTestVerb.slice(0,-2) + reflexiveEnding[currentTestPerson].slice(1);
            document.getElementById("spanish").innerHTML = currentAnswer;
        } else if(currentTestTense.title.includes("-ir")){
            const reflexiveEnding = presIr;
            // console.log("refEnding:", reflexiveEnding[currentSamplePerson]);
            currentAnswer = currentTestTense[currentTestPerson] + " " + currentTestVerb.slice(0,-2) + reflexiveEnding[currentTestPerson].slice(1);
            document.getElementById("spanish").innerHTML = currentAnswer;
        }
    } else {
        currentAnswer = currentTestVerb.slice(0,-2) + currentTestTense[currentTestPerson].slice(1);
        document.getElementById("spanish").innerHTML = currentAnswer;
    }
}

function updateEnglish(){
   document.getElementById("tense").innerHTML=currentTestTense.title.slice(0, currentTestTense.title.indexOf("("));

    document.getElementById("english").innerHTML=currentSampleVerbType[currentTestVerb] + "<br />" + "(" + persons[currentTestPerson] + ")";
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

function scoreView(){
    document.getElementById("test-show-ans").style.display="none";

    document.getElementById("spanish").innerHTML="";
    document.getElementById("tense").innerHTML = "";
    document.getElementById("english").innerHTML = "Accuracy: " + (correct/count*100).toFixed(2) + "%";
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
        scoreView();
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

newTest();