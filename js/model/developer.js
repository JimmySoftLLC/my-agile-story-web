function addDeveloperToProject(myProjectIndex) {
  var developerEmail = document.getElementById('editProjectDeveloperEmail')
    .value;
  developerEmail = developerEmail.toLowerCase();
  getDeveloperByEmail(developerEmail, myProjectIndex);
}

function removeDeveloperFromProject(myProjectIndex, myDeveloperIndex) {
  myProjectDevelopers.splice(myDeveloperIndex, 1);
  updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
}

function editDeveloperInProject(myProjectIndex, myDeveloperIndex) {
  editDeveloperProjectPermissions(myProjectIndex, myDeveloperIndex);
}

function updateDeveloperProjectPermission(myProjectIndex, myDeveloperIndex) {
  var canWrite = document.getElementById('editProjectPermissionsWrite').checked;
  var canAdmin = document.getElementById('editProjectPermissionsAdmin').checked;
  myProjectDevelopers[myDeveloperIndex].canWrite = canWrite;
  myProjectDevelopers[myDeveloperIndex].canAdmin = canAdmin;
  updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
  $('#editDeveloperProjectPermissionsModal').modal('hide');
}

function editDeveloperInUserStory(myUserStoryIndex, myDeveloperIndex) {
  editDeveloperUserStoryPermissions(myUserStoryIndex, myDeveloperIndex);
}

function updateDeveloperUserStoryPermission(
  myUserStoryIndex,
  myDeveloperIndex
) {
  var canDevelop = document.getElementById('editUserStoryPermissionsDevel')
    .checked;
  var canVerify = document.getElementById('editUserStoryPermissionsVerify')
    .checked;
  var canRelease = document.getElementById('editUserStoryPermissionsRelease')
    .checked;
  myUserStory[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canDevelop = canDevelop;
  myUserStory[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canVerify = canVerify;
  myUserStory[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canRelease = canRelease;
  updateDevelopersInUserStory(myUserStoryIndex, myProjectIndex);
  $('#editDeveloperUserStoryPermissionsModal').modal('hide');
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
