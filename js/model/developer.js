// developers in project

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

function updateDeveloperProjectPermission(myProjectIndex, myDeveloperIndex) {
  var canWrite = document.getElementById('editProjectPermissionsWrite').checked;
  var canAdmin = document.getElementById('editProjectPermissionsAdmin').checked;
  myProjectDevelopers[myDeveloperIndex].canWrite = canWrite;
  myProjectDevelopers[myDeveloperIndex].canAdmin = canAdmin;
  updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
  $('#editDeveloperProjectPermissionsModal').modal('hide');
}

// developers in bug

function addDeveloperToBug(myBugIndex, myProjectIndex) {
  var developerIndex = document.getElementById('selectedBugDeveloper').value;
  try {
    var myNewDeveloper = {
      developerId:
        myProjects[myProjectIndex].developers[developerIndex].developerId,
      email: myProjects[myProjectIndex].developers[developerIndex].email,
      firstName:
        myProjects[myProjectIndex].developers[developerIndex].firstName,
      lastName: myProjects[myProjectIndex].developers[developerIndex].lastName,
      canDevelop: document.getElementById('BugPermissionsDevelop').checked,
      canVerify: document.getElementById('BugPermissionsVerify').checked,
      canRelease: document.getElementById('BugPermissionsRelease').checked,
    };
    let developerInList = false;
    for (let i = 0; i < myBugs[myBugIndex].developers.length; i++) {
      if (
        myBugs[myBugIndex].developers[i].developerId ===
        myNewDeveloper.developerId
      ) {
        developerInList = true;
        break;
      }
    }
    if (developerInList) {
      showErrorMessage('Error', 'Delevelop already in list.');
    } else {
      myBugs[myBugIndex].developers.push(myNewDeveloper);
    }
    updateDevelopersInBug(myBugIndex, myProjectIndex);
  } catch (error) {
    showErrorMessage(
      'Error',
      'No developer selected, select one and try again.'
    );
  }
}

function removeDeveloperFromBug(myBugIndex, myProjectIndex, myDeveloperIndex) {
  myBugs[myBugIndex].developers.splice(myDeveloperIndex, 1);
  updateDevelopersInBug(myBugIndex, myProjectIndex);
}

function updateDeveloperBugPermission(myBugIndex, myDeveloperIndex) {
  var canDevelop = document.getElementById('editBugPermissionsDevelop').checked;
  var canVerify = document.getElementById('editBugPermissionsVerify').checked;
  var canRelease = document.getElementById('editBugPermissionsRelease').checked;
  myBugs[myBugIndex].developers[myDeveloperIndex].canDevelop = canDevelop;
  myBugs[myBugIndex].developers[myDeveloperIndex].canVerify = canVerify;
  myBugs[myBugIndex].developers[myDeveloperIndex].canRelease = canRelease;
  console.log('got here');
  updateDevelopersInBug(myBugIndex, myDeveloperIndex);
  $('#editDeveloperBugPermissionsModal').modal('hide');
}

// developers in user story

function addDeveloperToUserStory(myUserStoryIndex, myProjectIndex) {
  var developerIndex = document.getElementById('selectedUserStoryDeveloper')
    .value;
  try {
    var myNewDeveloper = {
      developerId:
        myProjects[myProjectIndex].developers[developerIndex].developerId,
      email: myProjects[myProjectIndex].developers[developerIndex].email,
      firstName:
        myProjects[myProjectIndex].developers[developerIndex].firstName,
      lastName: myProjects[myProjectIndex].developers[developerIndex].lastName,
      canDevelop: document.getElementById('userStoryPermissionsDevelop')
        .checked,
      canVerify: document.getElementById('userStoryPermissionsVerify').checked,
      canRelease: document.getElementById('userStoryPermissionsRelease')
        .checked,
    };
    let developerInList = false;
    for (let i = 0; i < myUserStorys[myUserStoryIndex].developers.length; i++) {
      if (
        myUserStorys[myUserStoryIndex].developers[i].developerId ===
        myNewDeveloper.developerId
      ) {
        developerInList = true;
        break;
      }
    }
    if (developerInList) {
      showErrorMessage('Error', 'Delevelop already in list.');
    } else {
      myUserStorys[myUserStoryIndex].developers.push(myNewDeveloper);
    }
    updateDevelopersInUserStory(myUserStoryIndex, myProjectIndex);
  } catch (error) {
    showErrorMessage(
      'Error',
      'No developer selected, select one and try again.'
    );
  }
}

function removeDeveloperFromUserStory(
  myUserStoryIndex,
  myProjectIndex,
  myDeveloperIndex
) {
  myUserStorys[myUserStoryIndex].developers.splice(myDeveloperIndex, 1);
  updateDevelopersInUserStory(myUserStoryIndex, myProjectIndex);
}

function updateDeveloperUserStoryPermission(
  myUserStoryIndex,
  myDeveloperIndex
) {
  var canDevelop = document.getElementById('editUserStoryPermissionsDevelop')
    .checked;
  var canVerify = document.getElementById('editUserStoryPermissionsVerify')
    .checked;
  var canRelease = document.getElementById('editUserStoryPermissionsRelease')
    .checked;
  myUserStorys[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canDevelop = canDevelop;
  myUserStorys[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canVerify = canVerify;
  myUserStorys[myUserStoryIndex].developers[
    myDeveloperIndex
  ].canRelease = canRelease;
  console.log('got here');
  updateDevelopersInUserStory(myUserStoryIndex, myDeveloperIndex);
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
