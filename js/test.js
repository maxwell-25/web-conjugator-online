// | ARRAYS AND VARIABLES

const tenses = ["Present simple", "Preterite", "Imperfect", "Future", "Conditional", "Reflexive", "Present continuous", "Perfect", "Pluperfect", "Present subjuntive", "Positive imperative", "Negative imperative"];

const persons = ["I", "you", "he/she", "we", "y'all", "they"];

const verbs = {
    "pass": "pasar",
    "must": "deber",
    "stay": "quedar",
    "speak": "hablar"
}

let currentTense;
let currentPerson;
let currentVerb;

// | EVENT LISTENERS
// document.getElementById("test-show-ans").addEventListener("click", showAnswer);

// | TEST

function newVerb(){
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    console.log(currentTense);

    currentPerson = persons[Math.floor(Math.random() * persons.length)];
    console.log(currentPerson);

    currentVerb = Object.keys(verbs)[Math.floor(Math.random() * Object.keys(verbs).length)];
    console.log(currentVerb);


    document.getElementById("tense").innerHTML=currentTense;

    document.getElementById("English").innerHTML=currentPerson + " " + currentVerb;
}

newVerb();
