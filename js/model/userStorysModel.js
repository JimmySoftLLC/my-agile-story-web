function editUserStoryEstimate(myUserStoryIndex) {
  var userStoryTitle = myUserStorys[myUserStoryIndex].userStoryTitle;
  var userRole = myUserStorys[myUserStoryIndex].userRole;
  var userWant = myUserStorys[myUserStoryIndex].userWant;
  var userBenefit = myUserStorys[myUserStoryIndex].userBenefit;
  var acceptanceCriteria = myUserStorys[myUserStoryIndex].acceptanceCriteria;
  var conversation = myUserStorys[myUserStoryIndex].conversation;
  var estimate = getEstimateFromVotes(myUserStoryIndex);
  var phase = myUserStorys[myUserStoryIndex].phase;
  var percentDone = myUserStorys[myUserStoryIndex].percentDone;
  var sprint = myUserStorys[myUserStoryIndex].sprint;
  var priority = myUserStorys[myUserStoryIndex].priority;
  var developers = myUserStorys[myUserStoryIndex].developers;
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
    sprint,
    developers
  );
  $('#voteUserStoryModal').modal('hide');
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
  var developers = myUserStorys[myUserStoryIndex].developers;
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
    sprint,
    developers
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
  var developers = myUserStorys[myUserStoryIndex].developers;
  var priority = document.getElementById(
    `userStoryPrioritySlider` + myUserStoryIndex
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
    sprint,
    developers
  );
}

function editUserStory(myUserStoryIndex) {
  updateEditUserStoryMessage('Editing user story please wait');
  var userStoryTitle = document.getElementById('editUserStoryTitle').value;
  var userRole = document.getElementById('editUserStoryUserRole').value;
  var userWant = document.getElementById('editUserStoryUserWant').value;
  var userBenefit = document.getElementById('editUserStoryUserBenefit').value;
  var acceptanceCriteria = document.getElementById(
    'editUserStoryAcceptanceCriteria'
  ).value;
  var conversation = document.getElementById('editUserStoryConversation').value;
  var estimate = document.getElementById('editUserStoryEstimate').value;
  var phase = getRadioVal('editUserStoryPhase');
  var percentDone = document.getElementById('editUserStoryPercentDone').value;
  var priority = parseInt(
    document.getElementById('editUserStoryPriority').value
  );
  var sprint = parseInt(document.getElementById('editUserStorySprint').value);
  var developers = myUserStorys[myUserStoryIndex].developers;
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
    sprint,
    developers
  );
}

function updateVoteResults(myIndex, showResults) {
  let listHTML = '';
  let myAverage = 0;
  let myVoteCount = 0;
  for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
    if (showResults) {
      let myUser =
        myUserStorys[myIndex].votes[i].firstName +
        ' ' +
        myUserStorys[myIndex].votes[i].lastName +
        '                                      ';
      myUser = myUser.substr(0, 15);
      if (myUserStorys[myIndex].votes[i].vote < 2000) {
        listHTML +=
          myUser + '\t' + myUserStorys[myIndex].votes[i].vote / 10 + '\n';
        myAverage += myUserStorys[myIndex].votes[i].vote / 10;
        myVoteCount++;
      } else if (myUserStorys[myIndex].votes[i].vote === 2000) {
        listHTML += myUser + '\t' + '?' + '\n';
      } else {
        listHTML += myUser + '\t' + 'Coffee' + '\n';
      }
    } else {
      listHTML += 'Voter ' + i + '\t' + 'voted' + '\n';
    }
  }
  if (showResults) {
    listHTML += '--------------------------------' + '\n';
    let average = 'Average                                      ';
    average = average.substr(0, 15);
    if (myVoteCount > 0) {
      listHTML += average + '\t' + parseInt(myAverage / myVoteCount);
    } else {
      listHTML += average + '\t' + 'not enough votes to calculate';
    }
  }
  document.getElementById('voteResults').value = listHTML;
}

function getEstimateFromVotes(myIndex) {
  let myAverage = 0;
  let myVoteCount = 0;
  for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
    if (myUserStorys[myIndex].votes[i].vote < 2000) {
      myAverage += myUserStorys[myIndex].votes[i].vote / 10;
      myVoteCount++;
    }
  }
  if (myVoteCount > 0) {
    return parseInt(myAverage / myVoteCount);
  } else {
    return 0;
  }
}
