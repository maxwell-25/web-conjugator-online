// | ARRAYS AND VARIABLES

const verbs = Object.assign({}, arVerbs, erVerbs, irVerbs);
// reflexiveArVerbs, reflexiveErVerbs, reflexiveIrVerbs

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
let verbSample;

// | EVENT LISTENERS
document.getElementById("test-show-ans").addEventListener("click", showAnswer);
document.getElementById("test-got-it").addEventListener("click", gotIt);
document.getElementById("test-not-it").addEventListener("click", tryAgain);

// | TEST
function newTest(){
    newVerbSample();
    updateTense();
    // newVerbType();
    newVerb();
    newPerson();
    updateEnglish();
}

function newVerbSample(){
    verbSample = {};
    for (let i = 0; i < 10; i++){
        let currentKey = Object.keys(verbs)[Math.floor(Math.random() * Object.keys(verbs).length)];
    // console.log("currentKey: ", currentKey); 
    verbSample[currentKey] = verbs[currentKey];
    }
    console.log("verbSample: ", verbSample);
}

function updateTense(){
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    console.log("currentTense.title: " + currentTense.title);

    document.getElementById("tense").innerHTML=currentTense.title.slice(0, currentTense.title.indexOf("("));
}

// function newVerbType(){
//     if (currentTense.title.includes("Reflexive")){
//         if (currentTense.title.includes("(-ar)")){
//             currentVerbType = reflexiveArVerbs;
//         } else if (currentTense.title.includes("(-er)")){
//             currentVerbType = reflexiveErVerbs;
//         } else if (currentTense.title.includes("(-ir)")){
//             currentVerbType = reflexiveIrVerbs;
//         }
//     } else if (currentTense.title.includes("(-ar)")){
//         currentVerbType = arVerbs;
//         console.log("currentVerbType:", currentVerbType);
//     } else if (currentTense.title.includes("(-er)")){
//         currentVerbType = erVerbs;
//         console.log("currentVerbType:", currentVerbType);
//     } else if (currentTense.title.includes("(-ir)")){
//         currentVerbType = irVerbs;
//         console.log("currentVerbType:", currentVerbType);
//     }
// }

function newVerb(){
    currentVerb = Object.keys(verbSample)[Math.floor(Math.random() * Object.keys(verbSample).length)];
    console.log("current verb: " + currentVerb);
}

function newPerson(){
    if (currentTense.title.includes("imperative")){
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
    document.getElementById("english").innerHTML=verbSample[currentVerb] + "<br />" + "(" + persons[currentPerson] + ")";
}

function newAnswer(){
    if(currentTense.title.includes("Present continuous") || currentTense.title.includes("Perfect") || currentTense.title.includes("Pluperfect")){
        document.getElementById("spanish").innerHTML = currentTense[currentPerson].split("/")[0] + " " + currentVerb.slice(0,-2) + currentTense[currentPerson].split("-")[1];
    } else if (currentTense.title.includes("Future") || currentTense.title.includes("Conditional")) {
        document.getElementById("spanish").innerHTML = currentVerb + currentTense[currentPerson].slice(1);
    } else if (currentTense.title.includes("Negative imperative")){
        document.getElementById("spanish").innerHTML="no " + currentVerb.slice(0,-2) + currentTense[currentPerson].slice(1);
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