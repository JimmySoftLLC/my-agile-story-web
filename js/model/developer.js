function addDeveloperToProject(myProjectIndex) {
    var developerEmail = document.getElementById('edit-project-developer-email').value
    getDeveloperByEmail(developerEmail, myProjectIndex);
}

function removeDeveloperFromProject(myProjectIndex, myDeveloperIndex) {
    myProjectDevelopers.splice(myDeveloperIndex, 1);
    updateDevelopersInProject(myProjectIndex, myProjectDevelopers)
}

function editDeveloperInProject(myProjectIndex, myDeveloperIndex) {
    editDeveloperProjectPermissions(myProjectIndex, myDeveloperIndex);
}

function updateDeveloperPermission(myProjectIndex, myDeveloperIndex) {
    var canWrite = document.getElementById('edit-project-permissions-write').checked;
    var canAdmin = document.getElementById('edit-project-permissions-admin').checked;
    myProjectDevelopers[myDeveloperIndex].canWrite = canWrite;
    myProjectDevelopers[myDeveloperIndex].canAdmin = canAdmin;
    updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
    $('#editDeveloperProjectPermissionsModal').modal('hide');
}

function developerHighestPrivilege(myProjectIndex) {
    //return 'A';
    for (let i = 0; i < myProjects[myProjectIndex].developers.length; i++) {
        if (myProjects[myProjectIndex].developers[i].email === myDeveloper.email) {
            if (myProjects[myProjectIndex].developers[i].canAdmin) return 'A';
            if (myProjects[myProjectIndex].developers[i].canWrite) return 'W';
            return 'R';
        }
    }
}

function developersHighestPrivilege(myProjectDevelopers) {
    //return 'A';
    for (let i = 0; i < myProjectDevelopers.length; i++) {
        if (myProjectDevelopers[i].canAdmin) return 'A';
    }
    return 'R';
}