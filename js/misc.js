function selectProjectDropDownChanged() {
    var myIndex = document.getElementById('select-project').value;
    myLastSelectedProject = myIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myIndex != -1) {
        getUserStorys(myProjects[myIndex]);
        loggedinMenu(myIndex);
    } else {
        loggedinMenu(myIndex);
    }
}

function setPhase(phase) {
    myLastSelectedPhase = phase;
    var myIndex = document.getElementById('select-project').value;
    myLastSelectedProject = myIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myIndex != -1) {
        getUserStorys(myProjects[myIndex]);
    }
}

function getRadioVal(radioName) {
    var selectedVal = 0;
    var selected = $(`input[type='radio'][name='` + radioName + `']:checked`);
    if (selected.length > 0) {
        selectedVal = selected.val();
    }
    var myReturnVal = parseInt(selectedVal);
    return Number(myReturnVal);
}