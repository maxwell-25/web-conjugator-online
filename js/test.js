// | ARRAYS AND VARIABLES

const tenses = [presAr, pretAr];

const persons = {
    "yo": "I"
};
// const persons = ["yo", "tú", "él/ella", "nosotros/nosotras", "vosotros/vosotras", "ellos/ellas"];

const verbs = {
    "hablar": "speak",
    "tomar": "take",
    "vivir": "live",
    "mirar": "watch",
    "trabajar": "work"
}

let currentTense;
let currentPerson;
let currentVerb;
let englishPerson;

// | EVENT LISTENERS
// document.getElementById("test-show-ans").addEventListener("click", showAnswer);

// | TEST

function newVerb(){
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    // console.log(currentTense);
    // console.log("currentTense: " + JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("("))));

    document.getElementById("tense").innerHTML=JSON.stringify(currentTense.title).slice(1, JSON.stringify(currentTense.title.indexOf("(")));
    // I THINK I CAN MASSIVELY CUT DOWN THE CODE IN APP.JS (ALL THE "IF TENSE ===" STUFF) BY USING VARIABLES IN MY CONST ARRAYS RATHER THAN STRINGS, THEN USING THIS STRINGIFY METHOD TO CALL THEM)

    currentPerson = Object.keys(persons)[Math.floor(Math.random() * Object.keys(persons).length)];
    console.log("currentPerson: " + currentPerson);

    currentVerb = Object.keys(verbs)[Math.floor(Math.random() * Object.keys(verbs).length)];
    console.log(currentVerb);

    document.getElementById("English").innerHTML=persons[currentPerson] + " " + verbs[currentVerb];
}

newVerb();
