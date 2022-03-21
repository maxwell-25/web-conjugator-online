// APP-MENU

// Get id of any clicked button in app-menu div to use as currentTense
function selectTense(buttonId){
    buttonId = buttonId || window.event;
    buttonId = buttonId.target || buttonId.srcElement;
    if (buttonId.nodeName === 'BUTTON'){
        currentTense = buttonId.id;
        console.log("current tense: " + currentTense);
        currentTenseDicts = [buttonId.id + "Ar", buttonId.id + "Er", buttonId.id + "Ir"]
        console.log(currentTenseDicts)
        newTenseDict();
        appView();
    }
}

// load new dict (-ar, -er, or -ir) from active list of CurrentTenseDicts ***AND REMOVE FROM LIST***
// *** update table view and call function for first person to test ***
function newTenseDict(){
    currentTenseDict = currentTenseDicts[Math.floor(Math.random() * currentTenseDicts.length)];
    console.log("current dict: " + window[currentTenseDict]);
    updateTableTitle();
}

function updateTableTitle(){
    // console.log("current dict title: " + currentTenseDict.title)
    document.getElementById("app-title").innerHTML=window[currentTenseDict].title;
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