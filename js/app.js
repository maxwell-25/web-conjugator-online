// GENERAL ARRAYS AND VARIABLES

var personIds = ["yo-per", "tú-per", "él/ella-per", "nosotros/nosotras-per", "vosotros/vosotras-per", "ellos/ellas-per"]

var endingIds = ["yo-end", "tú-end", "él/ella-end", "nosotros/nosotras-end", "vosotros/vosotras-end", "ellos/ellas-end"]

var exampleIds = ["yo-ex", "tú-ex", "él/ella-ex", "nosotros/nosotras-ex", "vosotros/vosotras-ex", "ellos/ellas-ex"]

var tenses = ["pres", "pret", "imperf", "fut", "cond", "ref", "presCon", "perf", "pluperf", "presSubj", "imperaPos", "imperaNeg"]

var count = 0
var correct = 0
var percentage = 0

                    // APP-MENU

// EVENT LISTENERS

document.getElementById("pres").addEventListener("click", selectTense);
document.getElementById("pret").addEventListener("click", selectTense);
document.getElementById("imperf").addEventListener("click", selectTense);
document.getElementById("fut").addEventListener("click", selectTense);
document.getElementById("cond").addEventListener("click", selectTense);
document.getElementById("ref").addEventListener("click", selectTense);
document.getElementById("presCon").addEventListener("click", selectTense);
document.getElementById("perf").addEventListener("click", selectTense);
document.getElementById("pluperf").addEventListener("click", selectTense);
document.getElementById("presSubj").addEventListener("click", selectTense);
document.getElementById("imperaPos").addEventListener("click", selectTense);
document.getElementById("imperaNeg").addEventListener("click", selectTense);

document.getElementById("show-ans").addEventListener("click", showAnswer);
document.getElementById("app-back-btn").addEventListener("click", appBack);
document.getElementById("got-it").addEventListener("click", gotIt);
document.getElementById("try-again").addEventListener("click", tryAgain);

document.getElementById("score-back-btn").addEventListener("click", scoreBack);


// CUSTOM FUNCTIONS

function selectTense(){
    currentTense = this.id;
    newTenseDicts();
    newTenseDict();
    appView();
}

function appView(){
    document.getElementById("app-menu").style.display="none"
    document.getElementById("app").style.display="block"
}

// Generate currentTenseDicts as variables based on currentTense
function newTenseDicts(tense){
    if (currentTense == "pres"){
        currentTenseDicts = [presAr, presEr, presIr];
    } else if (currentTense == "pret"){
        currentTenseDicts = [pretAr, pretEr, pretIr];
    } else if (currentTense == "imperf"){
        currentTenseDicts = [imperfAr, imperfEr, imperfIr];
    } else if (currentTense == "fut"){
        currentTenseDicts = [futAr, futEr, futIr];
    } else if (currentTense == "cond"){
        currentTenseDicts = [condAr, condEr, condIr];
    } else if (currentTense == "ref"){
        currentTenseDicts = [refAr, refEr, refIr];
    } else if (currentTense == "presCon"){
        currentTenseDicts = [presConAr, presConEr, presConIr];
    } else if (currentTense == "perf"){
        currentTenseDicts = [perfAr, perfEr, perfIr];
    } else if (currentTense == "pluperf"){
        currentTenseDicts = [pluperfAr, pluperfEr, pluperfIr];
    } else if (currentTense == "presSubj"){
        currentTenseDicts = [presSubjAr, presSubjEr, presSubjIr];
    } else if (currentTense == "imperaPos"){
        currentTenseDicts = [imperaPosAr, imperaPosEr, imperaPosIr];
    } else if (currentTense == "imperaNeg"){
        currentTenseDicts = [imperaNegAr, imperaNegEr, imperaNegIr];
    }
}

// load new dict (-ar, -er, or -ir) from active list of CurrentTenseDicts and remove from list
function newTenseDict(){
    currentTenseDict = currentTenseDicts[Math.floor(Math.random() * currentTenseDicts.length)];

    // remove currentTenseDict from currentTenseDicts
    // console.log("CURRENT DICTS BEFORE DELETE:", currentTenseDicts)
    var currentDictIndex = currentTenseDicts.indexOf(currentTenseDict);
    if(currentDictIndex !== -1) {
        currentTenseDicts.splice(currentDictIndex, 1);
    }
    // console.log("CURRENT DICTS AFTER DELETE:", currentTenseDicts)

    updateTableTitle();
    updateEndingTitle();

    newPerson();
}

function newPerson(){
    // console.log("CURRENT TENSE DICT:", currentTenseDict);
    // console.log("CURRENT TENSE DICT LENGTH:", Object.keys(currentTenseDict).length);
    if(Object.keys(currentTenseDict).length > 0){
        currentPerson = Object.keys(currentTenseDict)[Math.floor(Math.random() * Object.keys(currentTenseDict).length)];
        // console.log("current person: ", currentPerson);


        updateEndingTitle();
        updateEndingBlanks();
        updateExampleText();

        document.getElementById([currentPerson + "-per"]).style.color="red";
        document.getElementById([currentPerson + "-end"]).style.color="red";
        document.getElementById([currentPerson + "-ex"]).style.color="red";
    }
    else if(Object.keys(currentTenseDict).length == 0 && Object.keys(currentTenseDicts).length > 0){
        resetTable();
        newTenseDict();
        updateExampleText();
    }
    else if(Object.keys(currentTenseDict).length == 0 && Object.keys(currentTenseDict).length == 0){
        percentage = (correct/count)*100;
        saveScore();
        resetTable();
        resetCounts();
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


// TEST-TABLE

function updateTableTitle(){
    if(Object.keys(currentTenseDict).includes("title")){
        document.getElementById("app-title").innerHTML=currentTenseDict.title;
        delete currentTenseDict.title;
        // console.log("CURRENT DICT AFTER DELETE: ", currentTenseDict);
    }
}

function updateEndingTitle(){
    if(currentTense == "presCon" || currentTense == "perf" || currentTense == "pluperf"){
        document.getElementById("title-ending").innerHTML="? / ??"
    }
    else{
        document.getElementById("title-ending").innerHTML="?"
    }
}

function updateEndingBlanks(){
    if(currentTense == "presCon" || currentTense == "perf" || currentTense == "pluperf"){
        document.getElementById([currentPerson + "-end"]).innerHTML="? / ??"
    }
    else{
        document.getElementById([currentPerson + "-end"]).innerHTML="?"
    }
}

function revealEnding(){
    // console.log(currentPerson + "-end");
    document.getElementById([currentPerson + "-end"]).innerHTML=currentTenseDict[currentPerson];
}

function updateExampleText(){
    if(currentTense == "pres" || currentTense == "pret" || currentTense == "imperaPos" || currentTense == "imperf" || currentTense == "presSubj"){
        // console.log("PRINT: ", document.getElementById("app-title").innerHTML);
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="habl-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="com-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="viv-"
        }
    }
    else if(currentTense == "presCon" || currentTense == "perf" || currentTense == "pluperf"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ habl-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ com-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="___ viv-"
        }
    }
    else if(currentTense == "imperaNeg"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="No habl-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="No com-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="No decid-"
        }
    }
    else if(currentTense == "ref"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="? bañ" + presAr[currentPerson].substring(1)
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="? cre" + presEr[currentPerson].substring(1)
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            if(currentPerson == "nosotros/nosotros" || currentPerson == "vosotros/vosotras"){
                document.getElementById([currentPerson + "-ex"]).innerHTML="? dorm" + presIr[currentPerson].substring(1)
            }
            else{
                document.getElementById([currentPerson + "-ex"]).innerHTML="? duerm" + presIr[currentPerson].substring(1)
            }
        }
    }
    else if(currentTense == "fut" || currentTense == "cond"){
        if(document.getElementById("app-title").innerHTML.includes("-ar")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="hablar-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="comer-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="vivir-"
        }
    }
}

function revealExample(){
    if(currentTense == "presCon" || currentTense == "perf" || currentTense == "pluperf"){
        // console.log("TEST: ", document.getElementById([currentPerson + "-ex"]).innerHTML.replace("___", currentTenseDict[currentPerson].split("/")[0]).replace("-", currentTenseDict[currentPerson].split("-")[1]));
        document.getElementById([currentPerson + "-ex"]).innerHTML = document.getElementById([currentPerson + "-ex"]).innerHTML.replace("___", currentTenseDict[currentPerson].split("/")[0]).replace("-", currentTenseDict[currentPerson].split("-")[1]);
    }
    else if(currentTense == "ref"){
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

    for(i in personIds){
        document.getElementById(personIds[i]).style.color="#6e7076";
    }
    for(i in endingIds){
        document.getElementById(endingIds[i]).innerHTML="";
        document.getElementById(endingIds[i]).style.color="#6e7076";
    }
    for(i in exampleIds){
        document.getElementById(exampleIds[i]).innerHTML="";
        document.getElementById(exampleIds[i]).style.color="#6e7076";
    }
}

// BUTTON FUNCTIONS

function showAnswer(){
    revealEnding();
    revealExample();
    }

function gotIt(){
    count += 1;
    correct +=1;
    // console.log("count: ", count);
    // console.log("correct: ", correct);

    document.getElementById([currentPerson + "-per"]).style.color="green";
    document.getElementById([currentPerson + "-end"]).style.color="green";
    document.getElementById([currentPerson + "-ex"]).style.color="green";

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

    document.getElementById([currentPerson + "-per"]).style.color="#6e7076";
    document.getElementById([currentPerson + "-end"]).style.color="#6e7076";
    document.getElementById([currentPerson + "-ex"]).style.color="#6e7076";

    document.getElementById([currentPerson + "-end"]).innerHTML="";
    document.getElementById([currentPerson + "-ex"]).innerHTML="";

    newPerson();
    questionView();
}

function appBack(){
    document.getElementById("app-menu").style.display="grid";
    document.getElementById("app").style.display="none";

    resetTable();
    resetCounts();
}

function scoreBack(){
    document.getElementById("app-menu").style.display="grid";
    document.getElementById("score-container").style.display="none";
}