// APP-MENU

// Get id of any clicked button in app-menu div to use as currentTense
function selectTense(buttonId){
    buttonId = buttonId || window.event;
    buttonId = buttonId.target || buttonId.srcElement;
    if (buttonId.nodeName === 'BUTTON'){
        currentTense = buttonId.id;
        console.log("current tense: " + currentTense);
        newTenseDicts();
        newTenseDict();
        appView();
    }
}

function newTenseDicts(){
    if (currentTense == "pres"){
        currentTenseDicts = [presSimpAr, presSimpEr, presSimpIr];
        console.log("current dicts: " + currentTenseDicts);
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

// load new dict (-ar, -er, or -ir) from active list of CurrentTenseDicts ***AND REMOVE FROM LIST***
// *** update table view and call function for first person to test ***
function newTenseDict(){
    currentTenseDict = currentTenseDicts[Math.floor(Math.random() * currentTenseDicts.length)];
    console.log("current dict: " + currentTenseDict.title);
    updateTableTitle();
}

function updateTableTitle(){
    // console.log("current dict title: " + currentTenseDict.title)
    document.getElementById("app-title").innerHTML=currentTenseDict.title;
}

function appView(){
    document.getElementById("app-menu").style.display="none"
    document.getElementById("app").style.display="block"
}

// APP-PRACTICE
document.getElementById("yo-per").style.color="red";
document.getElementById("yo-end").innerHTML="?"
document.getElementById("yo-end").style.color="red";
document.getElementById("yo-ex").innerHTML="habl-";
document.getElementById("yo-ex").style.color="red";

function showAnswer(){
    document.getElementById("yo-per").style.color="green";
    document.getElementById("yo-end").innerHTML="-o"
    document.getElementById("yo-end").style.color="green";
    document.getElementById("yo-ex").innerHTML="hablo";
    document.getElementById("yo-ex").style.color="green";
}

function back(){
    document.getElementById("app-menu").style.display="grid"
    document.getElementById("app").style.display="none"
}