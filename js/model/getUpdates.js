var myProjectUpdateTimer;
var myDeveloperUpdateTimer;

function updateDeveloperInContext() {
    checkDeveloperTimeStamp()
}

function updateProjectInContext() {
    checkDeveloperTimeStamp()
    if (myLastSelectedProject != -1) {
        getProjects(myDeveloper, myLastSelectedProject, true);
    }
}