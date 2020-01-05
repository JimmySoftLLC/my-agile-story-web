var myUpdateTimer;

function updateProjectInContext() {
    var myTime = Date(Date.now());
    if (myLastSelectedProject != 1) {
        getProjects(myDeveloper, myLastSelectedProject, true);
    }
}