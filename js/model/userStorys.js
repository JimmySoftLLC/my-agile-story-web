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

function updateVoteResults(myIndex, showResults) {
    let listHTML = '';
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
        if (showResults) {
            let myUser = myUserStorys[myIndex].votes[i].firstName + ' ' + myUserStorys[myIndex].votes[i].lastName.substr(0, 1) + '                                      ';
            myUser = myUser.substr(0, 15);
            if (myUserStorys[myIndex].votes[i].vote < 2000) {
                listHTML += myUser + '\t' + myUserStorys[myIndex].votes[i].vote / 10 + '\n'
                myAverage += myUserStorys[myIndex].votes[i].vote / 10
                myVoteCount++;
            } else if (myUserStorys[myIndex].votes[i].vote === 2000) {
                listHTML += myUser + '\t' + '?' + '\n'
            } else {
                listHTML += myUser + '\t' + 'Coffee' + '\n'
            }
        } else {
            listHTML += 'Voter ' + i + '\t' + 'voted' + '\n'
        }
    }
    if (showResults) {
        listHTML += '--------------------------------' + '\n'
        if (myVoteCount > 0) {
            listHTML += 'Average ' + '\t' + parseInt(myAverage / myVoteCount)
        } else {
            listHTML += 'Average ' + '\t' + 'not enough votes to calculate'
        }
    }
    document.getElementById('vote-results').value = listHTML;
}

function getEstimateFromVotes(myIndex) {
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
        if (myUserStorys[myIndex].votes[i].vote < 2000) {
            myAverage += myUserStorys[myIndex].votes[i].vote / 10
            myVoteCount++;
        }
    }
    if (myVoteCount > 0) {
        return parseInt(myAverage / myVoteCount);
    } else {
        return 0;
    }
}