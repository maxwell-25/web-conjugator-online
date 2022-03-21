// APP-MENU

// Get id of any clicked button in app-menu div to use as currentTense and generate array of dicts (-ar, -er, -ir) for that tense
function selectTense(clickedButton){
    clickedButton = clickedButton || window.event; // this needs updating - event is deprecated
    clickedButton = clickedButton.target || clickedButton.srcElement;
    if (clickedButton.nodeName === 'BUTTON'){
        // console.log("clicked button: ", clickedButton)
        currentTense = clickedButton.id;
        console.log("current tense: ", currentTense);
        console.log("current tense: ", typeof(currentTense));
        newTenseDicts();
        newTenseDict();
        newPerson();
        appView();
    }
}

// Generate currentTenseDicts as variables based on currentTense; possibility to recode this to occur automatically on the menu-button click (but requires dict to be converted to variable using window[] each time thereafter)
function newTenseDicts(){
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

// load new dict (-ar, -er, or -ir) from active list of CurrentTenseDicts ***AND REMOVE FROM LIST***
// *** update table view and call function for first person to test ***
function newTenseDict(){
    currentTenseDict = currentTenseDicts[Math.floor(Math.random() * currentTenseDicts.length)];
    console.log("current dict: ", currentTenseDict);

    updateTableTitle();
    updateEndingTitle()
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
        console.log("current dict after delete: ", currentTenseDict);
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

function newPerson(){
    currentPerson = Object.keys(currentTenseDict)[Math.floor(Math.random() * Object.keys(currentTenseDict).length)];
    console.log("current person: ", [currentPerson + "-per"]);

    updateEndingTitle();
    updateEndingBlanks();
    updateExampleText();

    document.getElementById([currentPerson + "-per"]).style.color="red";
    document.getElementById([currentPerson + "-end"]).style.color="red";
}

// document.getElementById("yo-per").style.color="red";
// document.getElementById("yo-end").innerHTML="?"
// document.getElementById("yo-end").style.color="red";
// document.getElementById("yo-ex").innerHTML="habl-";
// document.getElementById("yo-ex").style.color="red";

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