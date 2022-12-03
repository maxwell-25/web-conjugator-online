// | ARRAYS AND VARIABLES

const tenses = ["Present simple"];

const persons = ["I"];
// const persons = ["I", "you", "he/she", "we", "you all", "they"];

const verbs = {
    "speak": "hablar",
    "take": "tomar",
    "live": "vivir",
    "watch": "mirar",
    "work": "trabajar"
}

let currentTense;
let currentPerson;
let currentVerb;
let translation;

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

    translation = verbs[currentVerb].slice(0, -2);

    // CHANGE THIS TO ACCESS FROM TENSE-DICTS
    if (currentPerson === "I"){
        document.getElementById("Spanish").innerHTML=translation + "o";        
    }
}

newVerb();
