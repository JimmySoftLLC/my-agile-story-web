function selectProjectDropDownChanged() {
    var myProjectIndex = document.getElementById('select-project').value;
    myLastSelectedProject = myProjectIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myProjectIndex != -1) {
        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
        loggedInMenu(myProjectIndex);
    } else {
        loggedInMenu(myProjectIndex);
    }
}

function setPhase(phase) {
    myLastSelectedPhase = phase;
    var myProjectIndex = document.getElementById('select-project').value;
    myLastSelectedProject = myProjectIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myProjectIndex != -1) {
        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
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

function arrayEmailDifference(a1, a2) {
    let difference = [];
    for (let i = 0; i < a1.length; i++) {
        let foundOne = false;
        for (j = 0; j < a2.length; j++) {
            if (a1[i].email == a2[j].email) {
                foundOne = true;
            }
            if (foundOne) break;
        }
        if (!foundOne) {
            difference.push(a1[i].email)
        }
    }
    return difference
}