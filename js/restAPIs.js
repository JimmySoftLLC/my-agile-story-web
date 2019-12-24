//const URL_Address = 'http://127.0.0.1:3004';
//const URL_Address = "https://shrouded-basin-24147.herokuapp.com";
const URL_Address = "https://embroideryware.net";

function loginDeveloper() {
  updateLoginMessage('Logging on to the server please wait');
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  fetch(URL_Address + '/get/developer', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myDeveloper = obj.body;
        setMyAglileStoryDeveloperStorage();
        getProjects(myDeveloper, -1, false);
        showPopupMessage('Welcome ' + myDeveloper.firstName);
      } else {
        showErrorMessage('Error', obj.body.error);
      }
      $('#loginModal').modal('hide');
    });
}

function getProjects(thisDeveloper, myProjectIndex, checkingIfUpdateIsNeeded) {
  var myCurrentLocalTimeStamp = '';
  if (checkingIfUpdateIsNeeded && myProjectIndex != -1) {
    try {
      myCurrentLocalTimeStamp = myProjects[myProjectIndex].timeStampISO;
    } catch (err) {
      clearInterval(myUpdateTimer);
      console.log(err.message);
    }
  }
  fetch(URL_Address + '/get/projects', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectIds: thisDeveloper.projectIds,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myProjects = obj.body;
        setMyAglileStoryProjectStorage();
        if (checkingIfUpdateIsNeeded && myProjectIndex != -1) {
          try {
            if (
              myCurrentLocalTimeStamp != myProjects[myProjectIndex].timeStampISO
            ) {
              getUserStorys(myProjects[myProjectIndex]);
            }
          } catch (err) {
            clearInterval(myUpdateTimer);
            console.log(err.message);
          }
        } else {
          loggedinMenu(myProjectIndex);
        }
      } else {
        showErrorMessage('Error', obj.body.error);
        $('#loginModal').modal('hide');
      }
    });
}

function getUserStorys(thisProject) {
  updateStatusMessageNoClear('Getting user stories.');
  fetch(URL_Address + '/get/userStorys', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userStoryIds: thisProject.userStoryIds,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myUserStorys = obj.body;
        myUserStorys.sort(function (obj1, obj2) {
          return obj1.priority - obj2.priority;
        });
        setMyAglileStoryUserStoryStorage();
        getBugs(thisProject);
      } else {
        showErrorMessage('Error', obj.body.error);
      }
      $('#loginModal').modal('hide');
    });
}

function getBugs(thisProject) {
  updateStatusMessageNoClear('Getting bugs.');
  fetch(URL_Address + '/get/bugs', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bugIds: thisProject.bugIds,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myBugs = obj.body;
        myBugs.sort(function (obj1, obj2) {
          return obj1.priority - obj2.priority;
        });
        setMyAglileStoryBugStorage();
        displayUserStoriesAndBugs();
        clearStatusMessage();
      } else {
        showErrorMessage('Error', obj.body.error);
      }
      $('#loginModal').modal('hide');
    });
}

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

function createNewDeveloper() {
  updateDeveloperMessage('Creating new developer please wait');
  var email = document.getElementById('developer-email').value;
  var password = document.getElementById('developer-password').value;
  var firstName = document.getElementById('developer-first-name').value;
  var lastName = document.getElementById('developer-last-name').value;
  var bio = document.getElementById('developer-bio').value;
  var role = 'admin'; // TODO document.getElementById('developer-role').value;

  fetch(URL_Address + '/developer', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        role: role,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myDeveloper = obj.body;
        setMyAglileStoryDeveloperStorage();
      } else {
        showErrorMessage('Error', obj.body.error);
      }
      $('#createNewDeveloperModal').modal('hide');
    });
}

function createNewProject() {
  updateProjectMessage('Creating new project please wait');
  var developerId = myDeveloper._id;
  var name = document.getElementById('project-name').value;
  var description = document.getElementById('project-description').value;

  fetch(URL_Address + '/developer/project/returnProjectAndDeveloper', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        developerId: developerId,
        name: name,
        description: description,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myProject = obj.body.project;
        myDeveloper = obj.body.developer;
        getProjects(myDeveloper, -1);
      } else {
        showErrorMessage('Error', obj.body.error);
      }
      $('#createNewProjectModal').modal('hide');
    });
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

function createNewUserStory() {
  var myIndex = document.getElementById('select-project').value;
  if (myIndex != -1) {
    updateUserStoryMessage('Creating new user story please wait');
    var projectId = myProjects[myIndex]._id;
    var userStoryTitle = document.getElementById('user-story-title').value;
    var userRole = document.getElementById('user-story-user-role').value;
    var userWant = document.getElementById('user-story-user-want').value;
    var userBenefit = document.getElementById('user-story-user-benefit').value;
    var acceptanceCriteria = document.getElementById(
      'user-story-acceptance-criteria'
    ).value;
    var conversation = document.getElementById('user-story-conversation').value;
    var estimate = document.getElementById('user-story-estimate').value;
    var phase = getRadioVal('user-story-phase');
    var percentDone = document.getElementById('user-story-percent-done').value;
    percentDone = rangeLimit(percentDone, 0, 100);
    var priority = document.getElementById('user-story-priority').value;
    priority = rangeLimit(priority, 1, 10);
    var sprint = document.getElementById('user-story-sprint').value;
    fetch(URL_Address + '/project/userStory/returnUserStoryAndProject', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          userStoryTitle: userStoryTitle,
          userRole: userRole,
          userWant: userWant,
          userBenefit: userBenefit,
          acceptanceCriteria: acceptanceCriteria,
          conversation: conversation,
          estimate: estimate,
          phase: phase,
          percentDone: percentDone,
          priority: priority,
          sprint: sprint,
        }),
      })
      .then(res =>
        res.json().then(data => ({
          status: res.status,
          body: data,
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          myUserStory = obj.body.userStory;
          myProjects[myIndex] = obj.body.project;
          getUserStorys(myProjects[myIndex]);
        } else {
          showErrorMessage('Error', obj.body.error);
        }
        $('#createNewUserStoryModal').modal('hide');
      });
  }
}

function createNewBug() {
  var myIndex = document.getElementById('select-project').value;
  if (myIndex != -1) {
    updateUserStoryMessage('Creating new bug please wait');
    var projectId = myProjects[myIndex]._id;
    var bugTitle = document.getElementById('bug-title').value;
    var summary = document.getElementById('bug-summary').value;
    var stepsToReproduce = document.getElementById('bug-steps-to-reproduce').value;
    var expectedResults = document.getElementById('bug-expected-results').value;
    var actualResults = document.getElementById('bug-actual-results').value;
    var resolution = document.getElementById('bug-resolution').value;
    var acceptanceCriteria = document.getElementById('bug-acceptance-criteria').value;
    var estimate = document.getElementById('bug-estimate').value;
    var phase = getRadioVal('bug-phase');
    var percentDone = document.getElementById('bug-percent-done').value;
    percentDone = rangeLimit(percentDone, 0, 100);
    var priority = document.getElementById('bug-priority').value;
    priority = rangeLimit(priority, 1, 10);
    var sprint = document.getElementById('bug-sprint').value;
    fetch(URL_Address + '/project/bug/returnBugAndProject', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          bugTitle: bugTitle,
          summary: summary,
          stepsToReproduce: stepsToReproduce,
          expectedResults: expectedResults,
          actualResults: actualResults,
          resolution: resolution,
          acceptanceCriteria: acceptanceCriteria,
          estimate: estimate,
          phase: phase,
          percentDone: percentDone,
          priority: priority,
          sprint: sprint,
        }),
      })
      .then(res =>
        res.json().then(data => ({
          status: res.status,
          body: data,
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          myBug = obj.body.userStory;
          myProjects[myIndex] = obj.body.project;
          getUserStorys(myProjects[myIndex]);
        } else {
          showErrorMessage('Error', obj.body.error);
        }
        $('#createNewBugModal').modal('hide');
      });
  }
}

function rangeLimit(myString, lowerValue, upperValue) {
  if (myString == '') {
    myString = 0;
  }
  if (myString < lowerValue) {
    myString = lowerValue;
  }
  if (myString > upperValue) {
    myString = upperValue;
  }
  return myString;
}

function moveUserStoryToNextPhase(myUserStoryIndex) {
  var userStoryTitle = myUserStorys[myUserStoryIndex].userStoryTitle;
  var userRole = myUserStorys[myUserStoryIndex].userRole;
  var userWant = myUserStorys[myUserStoryIndex].userWant;
  var userBenefit = myUserStorys[myUserStoryIndex].userBenefit;
  var acceptanceCriteria = myUserStorys[myUserStoryIndex].acceptanceCriteria;
  var conversation = myUserStorys[myUserStoryIndex].conversation;
  var estimate = myUserStorys[myUserStoryIndex].estimate;
  var temp = Number(myUserStorys[myUserStoryIndex].phase);
  temp += 1;
  temp = rangeLimit(temp, 0, 3);
  var phase = parseInt(temp);
  var percentDone = myUserStorys[myUserStoryIndex].percentDone;
  var priority = myUserStorys[myUserStoryIndex].priority;
  var sprint = myUserStorys[myUserStoryIndex].sprint;
  updateUserStory(
    myUserStoryIndex,
    userStoryTitle,
    userRole,
    userWant,
    userBenefit,
    acceptanceCriteria,
    conversation,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function editUserStoryPriority(myUserStoryIndex) {
  var userStoryTitle = myUserStorys[myUserStoryIndex].userStoryTitle;
  var userRole = myUserStorys[myUserStoryIndex].userRole;
  var userWant = myUserStorys[myUserStoryIndex].userWant;
  var userBenefit = myUserStorys[myUserStoryIndex].userBenefit;
  var acceptanceCriteria = myUserStorys[myUserStoryIndex].acceptanceCriteria;
  var conversation = myUserStorys[myUserStoryIndex].conversation;
  var estimate = myUserStorys[myUserStoryIndex].estimate;
  var phase = myUserStorys[myUserStoryIndex].phase;
  var percentDone = myUserStorys[myUserStoryIndex].percentDone;
  var sprint = myUserStorys[myUserStoryIndex].sprint;
  var priority = document.getElementById(
    `user-story-priority-slider-` + myUserStoryIndex
  ).value;
  updateUserStory(
    myUserStoryIndex,
    userStoryTitle,
    userRole,
    userWant,
    userBenefit,
    acceptanceCriteria,
    conversation,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function editUserStory(myUserStoryIndex) {
  updateEditUserStoryMessage('Editing user story please wait');
  var userStoryTitle = document.getElementById('edit-user-story-title').value;
  var userRole = document.getElementById('edit-user-story-user-role').value;
  var userWant = document.getElementById('edit-user-story-user-want').value;
  var userBenefit = document.getElementById('edit-user-story-user-benefit')
    .value;
  var acceptanceCriteria = document.getElementById(
    'edit-user-story-acceptance-criteria'
  ).value;
  var conversation = document.getElementById('edit-user-story-conversation')
    .value;
  var estimate = document.getElementById('edit-user-story-estimate').value;
  var phase = getRadioVal('edit-user-story-phase');
  var percentDone = document.getElementById('edit-user-story-percent-done')
    .value;
  var priority = parseInt(
    document.getElementById('edit-user-story-priority').value
  );
  var sprint = parseInt(
    document.getElementById('edit-user-story-sprint').value
  );
  updateUserStory(
    myUserStoryIndex,
    userStoryTitle,
    userRole,
    userWant,
    userBenefit,
    acceptanceCriteria,
    conversation,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function updateUserStory(
  myUserStoryIndex,
  userStoryTitle,
  userRole,
  userWant,
  userBenefit,
  acceptanceCriteria,
  conversation,
  estimate,
  phase,
  percentDone,
  priority,
  sprint
) {
  var myProjectIndex = document.getElementById('select-project').value;
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      percentDone = rangeLimit(percentDone, 0, 100);
      priority = rangeLimit(priority, 1, 10);
      estimate = rangeLimit(estimate, 0, 100000000000);
      fetch(URL_Address + '/put/userStory/returnUserStoryAndProject', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: myProjects[myProjectIndex]._id,
            userStoryId: myUserStorys[myUserStoryIndex]._id,
            userStoryTitle: userStoryTitle,
            userRole: userRole,
            userWant: userWant,
            userBenefit: userBenefit,
            acceptanceCriteria: acceptanceCriteria,
            conversation: conversation,
            estimate: estimate,
            phase: phase,
            percentDone: percentDone,
            priority: priority,
            sprint: sprint,
          }),
        })
        .then(res =>
          res.json().then(data => ({
            status: res.status,
            body: data,
          }))
        )
        .then(obj => {
          if (obj.status === 200) {
            myUserStory = obj.body.userStory;
            myProjects[myProjectIndex] = obj.body.project;
            getUserStorys(myProjects[myProjectIndex]);
          } else {
            showErrorMessage('Error', obj.body.error);
          }
          $('#editUserStoryModal').modal('hide');
        });
    }
  }
}

function moveBugToNextPhase(myBugIndex) {
  var bugTitle = myBugs[myBugIndex].bugTitle;
  var summary = myBugs[myBugIndex].summary;
  var stepsToReproduce = myBugs[myBugIndex].stepsToReproduce;
  var expectedResults = myBugs[myBugIndex].expectedResults;
  var actualResults = myBugs[myBugIndex].actualResults;
  var resolution = myBugs[myBugIndex].resolution;
  var acceptanceCriteria = myBugs[myBugIndex].acceptanceCriteria;
  var estimate = myBugs[myBugIndex].estimate;
  var temp = Number(myBugs[myBugIndex].phase);
  temp += 1;
  temp = rangeLimit(temp, 0, 3);
  var phase = parseInt(temp);
  var percentDone = myBugs[myBugIndex].percentDone;
  var priority = myBugs[myBugIndex].priority;
  var sprint = myBugs[myBugIndex].sprint;
  updateBug(
    myBugIndex,
    bugTitle,
    summary,
    stepsToReproduce,
    expectedResults,
    actualResults,
    resolution,
    acceptanceCriteria,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function editBugPriority(myBugIndex) {
  var bugTitle = myBugs[myBugIndex].bugTitle;
  var summary = myBugs[myBugIndex].summary;
  var stepsToReproduce = myBugs[myBugIndex].stepsToReproduce;
  var expectedResults = myBugs[myBugIndex].expectedResults;
  var actualResults = myBugs[myBugIndex].actualResults;
  var resolution = myBugs[myBugIndex].resolution;
  var acceptanceCriteria = myBugs[myBugIndex].acceptanceCriteria;
  var estimate = myBugs[myBugIndex].estimate;
  var phase = myBugs[myBugIndex].phase;
  var percentDone = myBugs[myBugIndex].percentDone;
  var sprint = myBugs[myBugIndex].sprint;
  var priority = document.getElementById(
    `bug-priority-slider-` + myBugIndex
  ).value;
  updateBug(
    myBugIndex,
    bugTitle,
    summary,
    stepsToReproduce,
    expectedResults,
    actualResults,
    resolution,
    acceptanceCriteria,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function editBug(myBugIndex) {
  updateEditBugMessage('Editing bug please wait');
  var bugTitle = document.getElementById('edit-bug-title').value;
  var summary = document.getElementById('edit-bug-summary').value;
  var stepsToReproduce = document.getElementById('edit-bug-steps-to-reproduce').value;
  var expectedResults = document.getElementById('edit-bug-expected-results').value;
  var actualResults = document.getElementById('edit-bug-actual-results').value;
  var resolution = document.getElementById('edit-bug-resolution').value;
  var acceptanceCriteria = document.getElementById('edit-bug-acceptance-criteria').value;
  var estimate = document.getElementById('edit-bug-estimate').value;
  var phase = getRadioVal('edit-bug-phase');
  var percentDone = document.getElementById('edit-bug-percent-done').value;
  var priority = parseInt(document.getElementById('edit-bug-priority').value);
  var sprint = parseInt(document.getElementById('edit-bug-sprint').value);
  updateBug(
    myBugIndex,
    bugTitle,
    summary,
    stepsToReproduce,
    expectedResults,
    actualResults,
    resolution,
    acceptanceCriteria,
    estimate,
    phase,
    percentDone,
    priority,
    sprint
  );
}

function updateBug(
  myBugIndex,
  bugTitle,
  summary,
  stepsToReproduce,
  expectedResults,
  actualResults,
  resolution,
  acceptanceCriteria,
  estimate,
  phase,
  percentDone,
  priority,
  sprint
) {
  var myProjectIndex = document.getElementById('select-project').value;
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      percentDone = rangeLimit(percentDone, 0, 100);
      priority = rangeLimit(priority, 1, 10);
      estimate = rangeLimit(estimate, 0, 100000000000);
      fetch(URL_Address + '/put/bug/returnBugAndProject', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: myProjects[myProjectIndex]._id,
            bugId: myBugs[myBugIndex]._id,
            bugTitle: bugTitle,
            summary: summary,
            stepsToReproduce: stepsToReproduce,
            expectedResults: expectedResults,
            actualResults: actualResults,
            resolution: resolution,
            acceptanceCriteria: acceptanceCriteria,
            estimate: estimate,
            phase: phase,
            percentDone: percentDone,
            priority: priority,
            sprint: sprint,
          }),
        })
        .then(res =>
          res.json().then(data => ({
            status: res.status,
            body: data,
          }))
        )
        .then(obj => {
          if (obj.status === 200) {
            myBug = obj.body.bug;
            myProjects[myProjectIndex] = obj.body.project;
            getBugs(myProjects[myProjectIndex]);
          } else {
            showErrorMessage('Error', obj.body.error);
          }
          $('#editBugModal').modal('hide');
        });
    }
  }
}

function editProject(myProjectIndex) {
  updateEditProjectMessage('Editing project please wait');
  var name = document.getElementById('edit-project-name').value;
  var description = document.getElementById('edit-project-description').value;
  fetch(URL_Address + '/put/project/returnProjectAndDeveloper', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        developerId: myDeveloper._id,
        projectId: myProjects[myProjectIndex]._id,
        name: name,
        description: description,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myProject = obj.body.project;
        myDeveloper = obj.body.developer;
        getProjects(myDeveloper, myProjectIndex);
        $('#editProjectModal').modal('hide');
      } else {
        showErrorMessage('Error', obj.body.error);
      }
    });
}

function editDeveloper() {
  updateEditDeveloperMessage('Editing developer please wait');
  var firstName = document.getElementById('edit-developer-first-name').value;
  var lastName = document.getElementById('edit-developer-last-name').value;
  var email = document.getElementById('edit-developer-email').value;
  var password = document.getElementById('edit-developer-password').value;
  var bio = document.getElementById('edit-developer-bio').value;
  var role = 'admin'; //TODO change the dialog to have roles
  fetch(URL_Address + '/put/developer', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        developerId: myDeveloper._id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        bio: bio,
        role: role,
      }),
    })
    .then(res =>
      res.json().then(data => ({
        status: res.status,
        body: data,
      }))
    )
    .then(obj => {
      if (obj.status === 200) {
        myDeveloper = obj.body;
        setMyAglileStoryDeveloperStorage();
        $('#editDeveloperModal').modal('hide');
      } else {
        showErrorMessage('Error', obj.body.error);
      }
    });
}

function deleteUserStorySetup(myUserStoryIndex) {
  showConfirmDeletePopup(
    'deleteUserStory',
    myUserStoryIndex,
    ' user story <strong>' +
    myUserStorys[myUserStoryIndex].userStoryTitle +
    '</strong>'
  );
}

function deleteUserStory(myUserStoryIndex) {
  $('#confirm-delete').modal('hide');
  var myProjectIndex = document.getElementById('select-project').value;
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      var userStoryId = myUserStorys[myUserStoryIndex]._id;
      var projectId = myUserStorys[myUserStoryIndex].projectId;
      fetch(URL_Address + '/delete/project/userStory', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userStoryId: userStoryId,
            projectId: projectId,
          }),
        })
        .then(res =>
          res.json().then(data => ({
            status: res.status,
            body: data,
          }))
        )
        .then(obj => {
          if (obj.status === 200) {
            myProjects[myProjectIndex] = obj.body;
            getUserStorys(myProjects[myProjectIndex]);
          } else {
            showErrorMessage('Error', obj.body.error);
          }
        });
    }
  }
}

function deleteBugSetup(myBugIndex) {
  showConfirmDeletePopup(
    'deleteBug',
    myBugIndex,
    ' bug <strong>' +
    myBugs[myBugIndex].bugTitle +
    '</strong>'
  );
}

function deleteBug(myBugIndex) {
  $('#confirm-delete').modal('hide');
  var myProjectIndex = document.getElementById('select-project').value;
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      var bugId = myBugs[myBugIndex]._id;
      var projectId = myBugs[myBugIndex].projectId;
      fetch(URL_Address + '/delete/project/bug', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bugId: bugId,
            projectId: projectId,
          }),
        })
        .then(res =>
          res.json().then(data => ({
            status: res.status,
            body: data,
          }))
        )
        .then(obj => {
          if (obj.status === 200) {
            myProjects[myProjectIndex] = obj.body;
            getUserStorys(myProjects[myProjectIndex]);
          } else {
            showErrorMessage('Error', obj.body.error);
          }
        });
    }
  }
}

function deleteProjectSetup() {
  var myProjectIndex = document.getElementById('select-project').value;
  if (myProjectIndex != -1) {
    showConfirmDeletePopup(
      'deleteProject',
      myProjectIndex,
      ' project <strong>' + myProjects[myProjectIndex].name + '</strong>'
    );
  }
}

function deleteProject(myProjectIndex) {
  $('#confirm-delete').modal('hide');
  if (myProjectIndex != -1) {
    // first delete all the user stories associated with the project
    fetch(URL_Address + '/delete/project/userStorys', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userStoryIds: myProjects[myProjectIndex].userStoryIds,
        }),
      })
      .then(res =>
        res.json().then(data => ({
          status: res.status,
          body: data,
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          // second delete all the bugs associated with the project
          fetch(URL_Address + '/delete/project/bugs', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bugIds: myProjects[myProjectIndex].bugIds,
              }),
            })
            .then(res =>
              res.json().then(data => ({
                status: res.status,
                body: data,
              }))
            )
            .then(obj => {
              if (obj.status === 200) {
                getUserStorys(myProjects[myProjectIndex]);
                // user stories are now deleted now delete the project
                fetch(URL_Address + '/delete/developer/project', {
                    method: 'post',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      projectId: myProjects[myProjectIndex]._id,
                      developerId: myDeveloper._id,
                    }),
                  })
                  .then(res =>
                    res.json().then(data => ({
                      status: res.status,
                      body: data,
                    }))
                  )
                  .then(obj => {
                    if (obj.status === 200) {
                      getProjects(myDeveloper, -1);
                    } else {
                      showErrorMessage('Error', obj.body.error);
                    }
                  });
              } else {
                showErrorMessage('Error', obj.body.error);
              }
            });
        } else {
          showErrorMessage('Error', obj.body.error);
        }
      });
  }
}

function logMyDeveloper() {
  console.log(myDeveloper);
  console.log(myProjects);
  console.log(myUserStorys);
}