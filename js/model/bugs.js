function editBugEstimate(myBugIndex) {
    var bugTitle = myBugs[myBugIndex].bugTitle;
    var summary = myBugs[myBugIndex].summary;
    var stepsToReproduce = myBugs[myBugIndex].stepsToReproduce;
    var expectedResults = myBugs[myBugIndex].expectedResults;
    var actualResults = myBugs[myBugIndex].actualResults;
    var resolution = myBugs[myBugIndex].resolution;
    var acceptanceCriteria = myBugs[myBugIndex].acceptanceCriteria;
    var estimate = getEstimateFromVotesBugs(myBugIndex);
    var phase = myBugs[myBugIndex].phase;
    var percentDone = myBugs[myBugIndex].percentDone;
    var sprint = myBugs[myBugIndex].sprint;
    var priority = myBugs[myBugIndex].priority;
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
        sprint,
    );
    $('#voteBugModal').modal('hide');
}

function editBug(myBugIndex) {
    updateEditBugMessage('Editing bug please wait');
    var bugTitle = document.getElementById('edit-bug-title').value;
    var summary = document.getElementById('edit-bug-summary').value;
    var stepsToReproduce = document.getElementById('edit-bug-steps-to-reproduce')
        .value;
    var expectedResults = document.getElementById('edit-bug-expected-results')
        .value;
    var actualResults = document.getElementById('edit-bug-actual-results').value;
    var resolution = document.getElementById('edit-bug-resolution').value;
    var acceptanceCriteria = document.getElementById(
        'edit-bug-acceptance-criteria'
    ).value;
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
    var priority = document.getElementById(`bug-priority-slider-` + myBugIndex)
        .value;
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

function updateVoteBugResults(myIndex, showResults) {
    let listHTML = '';
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myBugs[myIndex].votes.length; i++) {
        if (showResults) {
            let myUser = myBugs[myIndex].votes[i].firstName + ' ' + myBugs[myIndex].votes[i].lastName.substr(0, 1) + '                                      ';
            myUser = myUser.substr(0, 15);
            if (myBugs[myIndex].votes[i].vote < 2000) {
                listHTML += myUser + '\t' + myBugs[myIndex].votes[i].vote / 10 + '\n'
                myAverage += myBugs[myIndex].votes[i].vote / 10
                myVoteCount++;
            } else if (myBugs[myIndex].votes[i].vote === 2000) {
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
        let average = 'Average                                      ';
        average = average.substr(0, 15);
        if (myVoteCount > 0) {
            listHTML += average + '\t' + parseInt(myAverage / myVoteCount)
        } else {
            listHTML += average + '\t' + 'not enough votes to calculate'
        }
    }
    document.getElementById('vote-bug-results').value = listHTML;
}

function getEstimateFromVotesBugs(myIndex) {
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myBugs[myIndex].votes.length; i++) {
        if (myBugs[myIndex].votes[i].vote < 2000) {
            myAverage += myBugs[myIndex].votes[i].vote / 10
            myVoteCount++;
        }
    }
    if (myVoteCount > 0) {
        return parseInt(myAverage / myVoteCount);
    } else {
        return 0;
    }
}