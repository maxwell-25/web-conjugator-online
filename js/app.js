// I THINK I CAN MASSIVELY CUT DOWN THE CODE IN APP.JS (ALL THE "IF TENSE ===" STUFF) BY USING VARIABLES IN MY CONST ARRAYS RATHER THAN STRINGS – AS I'VE DONE IN TEST.JS

// | ARRAYS AND VARIABLES

const personIds = ["yo-per", "tú-per", "él/ella-per", "nosotros/nosotras-per", "vosotros/vosotras-per", "ellos/ellas-per"];

const endingIds = ["yo-end", "tú-end", "él/ella-end", "nosotros/nosotras-end", "vosotros/vosotras-end", "ellos/ellas-end"];

const exampleIds = ["yo-ex", "tú-ex", "él/ella-ex", "nosotros/nosotras-ex", "vosotros/vosotras-ex", "ellos/ellas-ex"];

const tenses = ["pres", "pret", "imperf", "fut", "cond", "ref", "presCon", "perf", "pluperf", "presSubj", "imperaPos", "imperaNeg"];

// DO I NEED TO REWRITE APP TO REMOVE GLOBAL VARS?
let count = 0;
let correct = 0;
let percentage = 0;

let currentTense;
let currentTenseDicts;
let currentTenseDict;
let currentDictIndex;
let currentPerson;

// | EVENT LISTENERS

for (const tense of tenses) {
    document.getElementById(tense).addEventListener("click", selectTense);
}

document.getElementById("quit-btn").addEventListener("click", appQuit);
document.getElementById("show-ans").addEventListener("click", showAnswer);
document.getElementById("got-it").addEventListener("click", gotIt);
document.getElementById("try-again").addEventListener("click", tryAgain);

document.getElementById("score-back-btn").addEventListener("click", scoreBack);

// | APP-MENU

function selectTense(){
    currentTense = this.id;
    newTenseDicts();
    newTenseDict();
    appView();
}

function appView(){
    document.getElementById("app-menu").style.display="none";
    document.getElementById("app").style.display="block";
}

// | MAIN

// Generate currentTenseDicts as nested arrays based on currentTense
function newTenseDicts(){
    if (currentTense === "pres"){
        currentTenseDicts = [JSON.parse(JSON.stringify(presAr)), JSON.parse(JSON.stringify(presEr)), JSON.parse(JSON.stringify(presIr))];
    } else if (currentTense === "pret"){
        currentTenseDicts = [JSON.parse(JSON.stringify(pretAr)), JSON.parse(JSON.stringify(pretEr)), JSON.parse(JSON.stringify(pretIr))];
    } else if (currentTense === "imperf"){
        currentTenseDicts = [JSON.parse(JSON.stringify(imperfAr)), JSON.parse(JSON.stringify(imperfEr)), JSON.parse(JSON.stringify(imperfIr))];
    } else if (currentTense === "fut"){
        currentTenseDicts = [JSON.parse(JSON.stringify(futAr)), JSON.parse(JSON.stringify(futEr)), JSON.parse(JSON.stringify(futIr))];
    } else if (currentTense === "cond"){
        currentTenseDicts = [JSON.parse(JSON.stringify(condAr)), JSON.parse(JSON.stringify(condEr)), JSON.parse(JSON.stringify(condIr))];
    } else if (currentTense === "ref"){
        currentTenseDicts = [JSON.parse(JSON.stringify(refAr)), JSON.parse(JSON.stringify(refEr)), JSON.parse(JSON.stringify(refIr))];
    } else if (currentTense === "presCon"){
        currentTenseDicts = [JSON.parse(JSON.stringify(presConAr)), JSON.parse(JSON.stringify(presConEr)), JSON.parse(JSON.stringify(presConIr))];
    } else if (currentTense === "perf"){
        currentTenseDicts = [JSON.parse(JSON.stringify(perfAr)), JSON.parse(JSON.stringify(perfEr)),JSON.parse(JSON.stringify( perfIr))];
    } else if (currentTense === "pluperf"){
        currentTenseDicts = [JSON.parse(JSON.stringify(pluperfAr)), JSON.parse(JSON.stringify(pluperfEr)), JSON.parse(JSON.stringify(pluperfIr))];
    } else if (currentTense === "presSubj"){
        currentTenseDicts = [JSON.parse(JSON.stringify(presSubjAr)), JSON.parse(JSON.stringify(presSubjEr)), JSON.parse(JSON.stringify(presSubjIr))];
    } else if (currentTense === "imperaPos"){
        currentTenseDicts = [JSON.parse(JSON.stringify(imperaPosAr)), JSON.parse(JSON.stringify(imperaPosEr)), JSON.parse(JSON.stringify(imperaPosIr))];
    } else if (currentTense === "imperaNeg"){
        currentTenseDicts = [JSON.parse(JSON.stringify(imperaNegAr)), JSON.parse(JSON.stringify(imperaNegEr)), JSON.parse(JSON.stringify(imperaNegIr))];
    }
}

// load new dict (-ar, -er, or -ir) at random from active list of currentTenseDicts and remove from list
function newTenseDict(){
    currentTenseDict = currentTenseDicts[Math.floor(Math.random() * currentTenseDicts.length)];

    // console.log("CURRENT DICTS BEFORE DELETE:", currentTenseDicts)
    // this code returns a currentTenseDict at random from currentTenseDicts
    currentDictIndex = currentTenseDicts.indexOf(currentTenseDict);
    if(currentDictIndex !== -1) {
        currentTenseDicts.splice(currentDictIndex, 1);
    }
    // console.log("CURRENT DICTS AFTER DELETE:", currentTenseDicts)

    updateTableTitle();
    updateEndingTitle();

    newPerson();
}

// select new person (yo, tú, nosotros/nosotras, etc.) at random from currentTenseDict to test
function newPerson(){
    // console.log("CURRENT TENSE DICT:", currentTenseDict);
    // console.log("CURRENT TENSE DICT LENGTH:", Object.keys(currentTenseDict).length);
    // this code returs a currentPerson at random from currentTenseDict
    if(Object.keys(currentTenseDict).length > 0){
        currentPerson = Object.keys(currentTenseDict)[Math.floor(Math.random() * Object.keys(currentTenseDict).length)];
        // console.log("current person: ", currentPerson);

        // block out persons unused in imperative tenses
        if(currentTense === "imperaPos" || currentTense === "imperaNeg"){
            document.getElementById("yo-per").style.opacity=0.3;

            document.getElementById("él/ella-per").style.opacity=0.3;

            document.getElementById("ellos/ellas-per").style.opacity=0.3;
        }

        updateEndingTitle();
        updateEndingBlanks();
        updateExampleText();

        document.getElementById([currentPerson + "-per"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-per"])).getPropertyValue("--my-red");

        document.getElementById([currentPerson + "-end"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-end"])).getPropertyValue("--my-red");

        document.getElementById([currentPerson + "-ex"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-ex"])).getPropertyValue("--my-red");        
    }
    else if(Object.keys(currentTenseDict).length === 0 && Object.keys(currentTenseDicts).length > 0){
        resetTable();
        newTenseDict();
        updateExampleText();
    }
    else if(Object.keys(currentTenseDict).length === 0 && Object.keys(currentTenseDict).length === 0){
        percentage = parseInt((correct/count)*100);
        saveScore();
    }
}

function saveScore(){
    // console.log("PERCENTAGE: ", percentage);
    document.getElementById("score").innerHTML="Score: " + percentage + "%";
    document.getElementById("app").style.display="none";
    document.getElementById("score-container").style.display="flex";

}

function resetCounts(){
    count = 0;
    correct = 0;
}


// | TEST-TABLE

function updateTableTitle(){
    if(Object.keys(currentTenseDict).includes("title")){
        document.getElementById("app-title").innerHTML=currentTenseDict.title;
        delete currentTenseDict.title;
        // console.log("CURRENT DICT AFTER DELETE: ", currentTenseDict);
    }
}

function updateEndingTitle(){
    if(currentTense === "presCon" || currentTense === "perf" || currentTense === "pluperf"){
        document.getElementById("title-ending").innerHTML="? / ??";
    }
    else{
        document.getElementById("title-ending").innerHTML="?";
    }
}

function updateEndingBlanks(){
    if(currentTense === "presCon" || currentTense === "perf" || currentTense === "pluperf"){
        document.getElementById([currentPerson + "-end"]).innerHTML="? / ??";
    }
    else{
        document.getElementById([currentPerson + "-end"]).innerHTML="?";
    }
}

function revealEnding(){
    // console.log(currentPerson + "-end");
    document.getElementById([currentPerson + "-end"]).innerHTML=currentTenseDict[currentPerson];
}

function updateExampleText(){
    if(currentTense === "pres" || currentTense === "pret" || currentTense === "imperaPos" || currentTense === "imperf" || currentTense === "presSubj"){
        // console.log("PRINT: ", document.getElementById("app-title").innerHTML);
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="habl-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="com-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="viv-";
        }
    }
    else if(currentTense === "presCon" || currentTense === "perf" || currentTense === "pluperf"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ habl-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ com-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ viv-";
        }
    }
    else if(currentTense === "imperaNeg"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="no habl-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="no com-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="no decid-";
        }
    }
    else if(currentTense === "ref"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="? bañ" + presAr[currentPerson].substring(1);
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="? cre" + presEr[currentPerson].substring(1);
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            if(currentPerson === "nosotros/nosotras" || currentPerson === "vosotros/vosotras"){
                document.getElementById([currentPerson + "-ex"]).innerHTML="? dorm" + presIr[currentPerson].substring(1);
            }
            else{
                document.getElementById([currentPerson + "-ex"]).innerHTML="? duerm" + presIr[currentPerson].substring(1);
            }
        }
    }
    else if(currentTense === "fut" || currentTense === "cond"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="hablar-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="comer-";
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="vivir-";
        }
    }
}

function revealExample(){
    if(currentTense === "presCon" || currentTense === "perf" || currentTense === "pluperf"){
        // console.log("TEST: ", document.getElementById([currentPerson + "-ex"]).innerHTML.replace("___", currentTenseDict[currentPerson].split("/")[0]).replace("-", currentTenseDict[currentPerson].split("-")[1]));
        document.getElementById([currentPerson + "-ex"]).innerHTML = document.getElementById([currentPerson + "-ex"]).innerHTML.replace("___", currentTenseDict[currentPerson].split("/")[0]).replace("-", currentTenseDict[currentPerson].split("-")[1]);
    }
    else if(currentTense === "ref"){
        document.getElementById([currentPerson + "-ex"]).innerHTML = document.getElementById([currentPerson + "-ex"]).innerHTML.replace("?", currentTenseDict[currentPerson]);
    }
    else{
        document.getElementById([currentPerson + "-ex"]).innerHTML = document.getElementById([currentPerson + "-ex"]).innerHTML.replace("-", currentTenseDict[currentPerson].substr(1));
    }

    answerView();
}

function questionView(){
    // console.log("question view");
    document.getElementById("show-ans").style.display="inline-block";
    document.getElementById("got-it").style.display="none";
    document.getElementById("try-again").style.display="none";
    
    updateEndingTitle();
}

function answerView(){
    // console.log("answer view");
    document.getElementById("show-ans").style.display="none";
    document.getElementById("got-it").style.display="inline-block";
    document.getElementById("try-again").style.display="inline-block";
}

function resetTable(){
    questionView();

    for(const personId in personIds){
        document.getElementById(personIds[personId]).style.color=getComputedStyle(document.getElementById(personIds[personId])).getPropertyValue("--paragraph-color");
        document.getElementById(personIds[personId]).style.opacity=1;
    }
    
    for(const personId in endingIds){
        document.getElementById(endingIds[personId]).innerHTML="";
        document.getElementById(endingIds[personId]).style.color=getComputedStyle(document.getElementById(personIds[personId])).getPropertyValue("--paragraph-color");
    }
    for(const personId in exampleIds){
        document.getElementById(exampleIds[personId]).innerHTML="";
        document.getElementById(exampleIds[personId]).style.color=getComputedStyle(document.getElementById(personIds[personId])).getPropertyValue("--paragraph-color");
    }
}

// | BUTTON FUNCTIONS

function showAnswer(){
    revealEnding();
    revealExample();
    }

function gotIt(){
    count += 1;
    correct +=1;
    // console.log("count: ", count);
    // console.log("correct: ", correct);

    document.getElementById([currentPerson + "-per"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-per"])).getPropertyValue("--my-green");

    document.getElementById([currentPerson + "-end"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-end"])).getPropertyValue("--my-green");

    document.getElementById([currentPerson + "-ex"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-ex"])).getPropertyValue("--my-green");

    // remove currentPerson from currentTenseDict
    // console.log("BEFORE: ", currentTenseDict);
    delete currentTenseDict[currentPerson];
    // console.log("AFTER: ", currentTenseDict);

    newPerson();
    questionView();
}

function tryAgain(){
    count += 1;
    // console.log("count: ", count);
    // console.log("correct: ", correct);

    document.getElementById([currentPerson + "-per"]).style.color=getComputedStyle(document.getElementById([currentPerson + "-per"])).getPropertyValue("--paragraph-color");

    document.getElementById([currentPerson + "-end"]).innerHTML="";
    document.getElementById([currentPerson + "-ex"]).innerHTML="";

    newPerson();
    questionView();
}

function appQuit(){
    document.getElementById("app-menu").style.display="block";
    document.getElementById("app").style.display="none";

    resetTable();
    resetCounts();
}

function scoreBack(){
    document.getElementById("app-menu").style.display="block";
    document.getElementById("score-container").style.display="none";

    resetTable();
    resetCounts();
}