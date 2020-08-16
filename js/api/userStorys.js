const addVoteUserStory = async (myUserStoryIndex) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  var vote = {
    developerId: myDeveloper._id,
    vote: getRadioVal('voteUserStory'),
    firstName: myDeveloper.firstName,
    lastName: myDeveloper.lastName,
  };
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      try {
        const res = await fetch(
          URL_Address + '/put/userStory/voteReturnUserStoryProject',
          {
            method: 'post',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'x-auth-token': myToken,
            },
            body: JSON.stringify({
              projectId: myProjects[myProjectIndex]._id,
              userStoryId: myUserStorys[myUserStoryIndex]._id,
              vote: vote,
            }),
          }
        );
        const obj = await res.json();
        if (res.status === 200) {
          myUserStory = obj.userStory;
          myProjects[myProjectIndex] = obj.project;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
          $('#voteUserStoryModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};

const getUserStorys = async (thisProject, myProjectIndex) => {
  updateStatusMessageNoClear('Getting user stories.');
  try {
    const res = await fetch(URL_Address + '/get/userStorys', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-auth-token': myToken,
      },
      body: JSON.stringify({
        userStoryIds: thisProject.userStoryIds,
      }),
    });
    const obj = await res.json();
    if (res.status === 200) {
      setMyAglileStoryUserStoryStorage();
      getBugs(thisProject, myProjectIndex);
      $('#loginModal').modal('hide');
    } else {
      showErrorMessage('Error', obj.error);
    }
    myUserStorys = obj;
    myUserStorys.sort(function (obj1, obj2) {
      return obj1.priority - obj2.priority;
    });
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const createNewUserStory = async () => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    updateUserStoryMessage('Creating new user story please wait');
    var projectId = myProjects[myProjectIndex]._id;
    var userStoryTitle = document.getElementById('userStoryTitle').value;
    var userRole = document.getElementById('userStoryUserRole').value;
    var userWant = document.getElementById('userStoryUserWant').value;
    var userBenefit = document.getElementById('userStoryUserBenefit').value;
    var acceptanceCriteria = document.getElementById(
      'userStoryAcceptanceCriteria'
    ).value;
    var conversation = document.getElementById('userStoryConversation').value;
    var estimate = document.getElementById('userStoryEstimate').value;
    var phase = getRadioVal('userStoryPhase');
    var percentDone = document.getElementById('userStoryPercentDone').value;
    percentDone = rangeLimit(percentDone, 0, 100);
    var priority = document.getElementById('userStoryPriority').value;
    priority = rangeLimit(priority, 1, 10);
    var sprint = document.getElementById('userStorySprint').value;
    try {
      const res = await fetch(
        URL_Address + '/project/userStory/returnUserStoryAndProject',
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
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
        }
      );
      const obj = await res.json();
      if (res.status === 200) {
        myUserStory = obj.userStory;
        myProjects[myProjectIndex] = obj.project;
        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
        $('#createNewUserStoryModal').modal('hide');
      } else {
        showErrorMessage('Error', obj.error);
      }
    } catch (error) {
      showErrorMessage('Error', error.message);
    }
  }
};

const updateUserStory = async (
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
) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      percentDone = rangeLimit(percentDone, 0, 100);
      priority = rangeLimit(priority, 1, 10);
      estimate = rangeLimit(estimate, 0, 100000000000);
      try {
        const res = await fetch(
          URL_Address + '/put/userStory/returnUserStoryAndProject',
          {
            method: 'post',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'x-auth-token': myToken,
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
          }
        );
        const obj = await res.json();
        if (res.status === 200) {
          myUserStory = obj.userStory;
          myProjects[myProjectIndex] = obj.project;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
          $('#editUserStoryModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};

function deleteUserStorySetup(myUserStoryIndex) {
  showConfirmDeletePopup(
    'deleteUserStory',
    myUserStoryIndex,
    ' user story <strong>' +
      myUserStorys[myUserStoryIndex].userStoryTitle +
      '</strong>'
  );
}

const deleteUserStory = async (myUserStoryIndex) => {
  $('#confirmDeleteModal').modal('hide');
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      var userStoryId = myUserStorys[myUserStoryIndex]._id;
      var projectId = myUserStorys[myUserStoryIndex].projectId;
      try {
        const res = await fetch(URL_Address + '/delete/project/userStory', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
          },
          body: JSON.stringify({
            userStoryId: userStoryId,
            projectId: projectId,
          }),
        });
        const obj = await res.json();
        if (res.status === 200) {
          myProjects[myProjectIndex] = obj;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};

const deleteVotesUserStory = async (myUserStoryIndex) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myUserStoryIndex != -1) {
      try {
        const res = await fetch(URL_Address + '/delete/userStory/votes', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
          },
          body: JSON.stringify({
            projectId: myProjects[myProjectIndex]._id,
            userStoryId: myUserStorys[myUserStoryIndex]._id,
          }),
        });
        const obj = await res.json();
        if (res.status === 200) {
          myUserStory = obj.userStory;
          myProjects[myProjectIndex] = obj.project;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
          $('#voteUserStoryModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};
