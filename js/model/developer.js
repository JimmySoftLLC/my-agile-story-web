function addDeveloperToProject(myProjectIndex) {
    var developerEmail = document.getElementById('edit-project-developer-email').value
    getDeveloperByEmail(developerEmail, myProjectIndex);
}

function removeDeveloperFromProject(myProjectIndex, myDeveloperIndex) {
    myProjectDevelopers.splice(myDeveloperIndex, 1);
    updateDevelopersInProject(myProjectIndex, myProjectDevelopers)
}

function logMyDeveloper() {
    console.log(myDeveloper);
    console.log(myProjects);
    console.log(myUserStorys);
}