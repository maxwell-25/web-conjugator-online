// GENERAL ARRAYS AND VARIABLES

var personIds = ["yo_person", "tú_person", "él/ella_person", "nosotros/nosotras_person",
"vosotros/vosotras_person", "ellos/ellas_person"]

var endingIds = ["yo_ending", "tú_ending", "él/ella_ending", "nosotros/nosotras_ending",
"vosotros/vosotras_ending", "ellos/ellas_ending"]

var exampleIds = ["yo_example", "tú_example", "él/ella_example", "nosotros/nosotras_example",
 "vosotros/vosotras_example", "ellos/ellas_example"]

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


// CUSTOM FUNCTIONS

function selectTense(){
    currentTense = this.id;
    newTenseDicts();
    newTenseDict(); 
    appView();
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
    var currentDictIndex = currentTenseDicts.indexOf(currentTenseDict);
    if(currentDictIndex !== -1) {
        currentTenseDicts.splice(currentDictIndex, 1);
    }
    console.log("CURRENT DICTS AFTER DELETE:", currentTenseDicts)

    updateTableTitle();
    updateEndingTitle();

    newPerson();
}

function newPerson(){
    console.log("CURRENT TENSE DICT:", currentTenseDict);
    console.log("CURRENT TENSE DICT LENGTH:", Object.keys(currentTenseDict).length);
    if(Object.keys(currentTenseDict).length > 0){
        currentPerson = Object.keys(currentTenseDict)[Math.floor(Math.random() * Object.keys(currentTenseDict).length)];
        console.log("current person: ", [currentPerson + "-per"]);


        updateEndingTitle();
        updateEndingBlanks();
        updateExampleText();

        document.getElementById([currentPerson + "-per"]).style.color="red";
        document.getElementById([currentPerson + "-end"]).style.color="red";
        document.getElementById([currentPerson + "-ex"]).style.color="red";
    }
    else if(Object.keys(currentTenseDict).length == 0 && Object.keys(currentTenseDict).length > 0){
        // resetTable();
        newTenseDict();
        updateExampleText();
    }
    else if(Object.keys(currentTenseDict).length == 0 && Object.keys(currentTenseDict).length == 0){
        percentage = (correct/count)*100

        // saveScore();
        // resetTable();
        // resetCounts();
    }
}

function appView(){
    document.getElementById("app-menu").style.display="none"
    document.getElementById("app").style.display="block"
}

// TEST-TABLE

function updateTableTitle(){
    if(Object.keys(currentTenseDict).includes("title")){
        document.getElementById("app-title").innerHTML=currentTenseDict.title;
        delete currentTenseDict.title;
        console.log("CURRENT DICT AFTER DELETE: ", currentTenseDict);
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
    console.log(currentPerson + "-end");
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
            document.getElementById([currentPerson + "-ex"]).innerHTML="Hablar-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-er")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="Comer-"
        }
        else if(document.getElementById("app-title").innerHTML.includes("-ir")){
            document.getElementById([currentPerson + "-ex"]).innerHTML="Vivir-"
        }
    }
}


// EVENT LISTENERS
document.getElementById("show-ans").addEventListener("click", showAnswer);

// BUTTON FUNCTIONS

function showAnswer(){
    revealEnding();
    // revealExample();
    }

function back(){
    document.getElementById("app-menu").style.display="grid"
    document.getElementById("app").style.display="none"
}