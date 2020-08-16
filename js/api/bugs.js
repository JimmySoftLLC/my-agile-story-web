const addVoteBug = async (myBugIndex) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  var vote = {
    developerId: myDeveloper._id,
    vote: getRadioVal('voteBug'),
    firstName: myDeveloper.firstName,
    lastName: myDeveloper.lastName,
  };
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      try {
        const res = await fetch(URL_Address + '/put/bug/voteReturnBugProject', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
          },
          body: JSON.stringify({
            projectId: myProjects[myProjectIndex]._id,
            bugId: myBugs[myBugIndex]._id,
            vote: vote,
          }),
        });
        const obj = await res.json();
        if (res.status === 200) {
          myBug = obj.bug;
          myProjects[myProjectIndex] = obj.project;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
          $('#voteBugModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};

const getBugs = async (thisProject, myProjectIndex) => {
  updateStatusMessageNoClear('Getting bugs.');
  try {
    const res = await fetch(URL_Address + '/get/bugs', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-auth-token': myToken,
      },
      body: JSON.stringify({
        bugIds: thisProject.bugIds,
      }),
    });
    const obj = await res.json();
    if (res.status === 200) {
      myBugs = obj;
      myBugs.sort((obj1, obj2) => {
        return obj1.priority - obj2.priority;
      });
      setMyAglileStoryBugStorage();
      loggedInMenu(myProjectIndex);
      clearStatusMessage();
      $('#loginModal').modal('hide');
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const createNewBug = async () => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    updateUserStoryMessage('Creating new bug please wait');
    var projectId = myProjects[myProjectIndex]._id;
    var bugTitle = document.getElementById('bugTitle').value;
    var summary = document.getElementById('bugSummary').value;
    var stepsToReproduce = document.getElementById('bugStepsToReproduce').value;
    var expectedResults = document.getElementById('bugExpectedResults').value;
    var actualResults = document.getElementById('bugActualResults').value;
    var resolution = document.getElementById('bugResolution').value;
    var acceptanceCriteria = document.getElementById('bugAcceptanceCriteria')
      .value;
    var estimate = document.getElementById('bugEstimate').value;
    var phase = getRadioVal('bugPhase');
    var percentDone = document.getElementById('bugPercentDone').value;
    percentDone = rangeLimit(percentDone, 0, 100);
    var priority = document.getElementById('bugPriority').value;
    priority = rangeLimit(priority, 1, 10);
    var sprint = document.getElementById('bugSprint').value;
    try {
      const res = await fetch(
        URL_Address + '/project/bug/returnBugAndProject',
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
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
            developers: [],
          }),
        }
      );
      const obj = await res.json();
      if (res.status === 200) {
        myBug = obj.userStory;
        myProjects[myProjectIndex] = obj.project;
        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
        $('#createNewBugModal').modal('hide');
      } else {
        showErrorMessage('Error', obj.error);
      }
    } catch (error) {
      showErrorMessage('Error', error.message);
    }
  }
};

const updateBug = async (
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
  sprint,
  developers
) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      percentDone = rangeLimit(percentDone, 0, 100);
      priority = rangeLimit(priority, 1, 10);
      estimate = rangeLimit(estimate, 0, 100000000000);
      try {
        const res = await fetch(URL_Address + '/put/bug/returnBugAndProject', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
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
            developers: developers,
          }),
        });
        const obj = await res.json();
        if (res.status === 200) {
          myBug = obj.bug;
          myProjects[myProjectIndex] = obj.project;
          getBugs(myProjects[myProjectIndex], myProjectIndex);
          $('#editBugModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {}
    }
  }
};

function deleteBugSetup(myBugIndex) {
  showConfirmDeletePopup(
    'deleteBug',
    myBugIndex,
    ' bug <strong>' + myBugs[myBugIndex].bugTitle + '</strong>'
  );
}

const deleteBug = async (myBugIndex) => {
  $('#confirmDeleteModal').modal('hide');
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      var bugId = myBugs[myBugIndex]._id;
      var projectId = myBugs[myBugIndex].projectId;
      try {
        const res = await fetch(URL_Address + '/delete/project/bug', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
          },
          body: JSON.stringify({
            bugId: bugId,
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

const deleteVotesBug = async (myBugIndex) => {
  var myProjectIndex = document.getElementById('selectProject').value;
  if (myProjectIndex != -1) {
    if (myBugIndex != -1) {
      try {
        const res = await fetch(URL_Address + '/delete/bug/votes', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'x-auth-token': myToken,
          },
          body: JSON.stringify({
            projectId: myProjects[myProjectIndex]._id,
            bugId: myBugs[myBugIndex]._id,
          }),
        });
        const obj = await res.json();
        if (res.status === 200) {
          myBug = obj.bug;
          myProjects[myProjectIndex] = obj.project;
          getUserStorys(myProjects[myProjectIndex], myProjectIndex);
          $('#voteBugModal').modal('hide');
        } else {
          showErrorMessage('Error', obj.error);
        }
      } catch (error) {
        showErrorMessage('Error', error.message);
      }
    }
  }
};
