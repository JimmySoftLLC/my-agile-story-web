function addVoteBug(
    myBugIndex
) {
    var myProjectIndex = document.getElementById('select-project').value;
    var vote = {
        developerId: myDeveloper._id,
        vote: getRadioVal('vote-bug'),
        firstName: myDeveloper.firstName,
        lastName: myDeveloper.lastName,
    }
    if (myProjectIndex != -1) {
        if (myBugIndex != -1) {
            fetch(URL_Address + '/put/bug/voteReturnBugProject', {
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
                        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                    } else {
                        showErrorMessage('Error', obj.body.error);
                    }
                    $('#voteBugModal').modal('hide');
                });
        }
    }
}

function getBugs(thisProject, myProjectIndex) {
    updateStatusMessageNoClear('Getting bugs.');
    fetch(URL_Address + '/get/bugs', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
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
                loggedinMenu(myProjectIndex);
                clearStatusMessage();
            } else {
                showErrorMessage('Error', obj.body.error);
            }
            $('#loginModal').modal('hide');
        });
}

function createNewBug() {
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        updateUserStoryMessage('Creating new bug please wait');
        var projectId = myProjects[myProjectIndex]._id;
        var bugTitle = document.getElementById('bug-title').value;
        var summary = document.getElementById('bug-summary').value;
        var stepsToReproduce = document.getElementById('bug-steps-to-reproduce')
            .value;
        var expectedResults = document.getElementById('bug-expected-results').value;
        var actualResults = document.getElementById('bug-actual-results').value;
        var resolution = document.getElementById('bug-resolution').value;
        var acceptanceCriteria = document.getElementById('bug-acceptance-criteria')
            .value;
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
                    myProjects[myProjectIndex] = obj.body.project;
                    getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                } else {
                    showErrorMessage('Error', obj.body.error);
                }
                $('#createNewBugModal').modal('hide');
            });
    }
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
                        getBugs(myProjects[myProjectIndex], myProjectIndex);
                    } else {
                        showErrorMessage('Error', obj.body.error);
                    }
                    $('#editBugModal').modal('hide');
                });
        }
    }
}

function deleteBugSetup(myBugIndex) {
    showConfirmDeletePopup(
        'deleteBug',
        myBugIndex,
        ' bug <strong>' + myBugs[myBugIndex].bugTitle + '</strong>'
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
                        'x-auth-token': myToken,
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
                    if (obj.status === 401) {
                        showErrorMessageUnauthorized('Error', 'Session has timed out need to login again.');
                    }
                    if (obj.status === 200) {
                        myProjects[myProjectIndex] = obj.body;
                        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                    } else {
                        showErrorMessage('Error', obj.body.error);
                    }
                });
        }
    }
}

function deleteVotesBug(
    myBugIndex,
) {
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        if (myBugIndex != -1) {
            fetch(URL_Address + '/delete/bug/votes', {
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
                        getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                    } else {
                        showErrorMessage('Error', obj.body.error);
                    }
                    $('#voteBugModal').modal('hide');
                });
        }
    }
}