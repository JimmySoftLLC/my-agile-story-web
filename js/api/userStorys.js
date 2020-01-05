function addVoteUserStory(
    myUserStoryIndex
) {
    var myProjectIndex = document.getElementById('select-project').value;
    var vote = {
        developerId: myDeveloper._id,
        vote: getRadioVal('vote'),
        firstName: myDeveloper.firstName,
        lastName: myDeveloper.lastName,
    }
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            fetch(URL_Address + '/put/userStory/voteReturnUserStoryProject', {
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
                    $('#voteUserStoryModal').modal('hide');
                });
        }
    }
}

function getUserStorys(thisProject) {
    updateStatusMessageNoClear('Getting user stories.');
    fetch(URL_Address + '/get/userStorys', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
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
                        'x-auth-token': myToken,
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
                    if (obj.status === 401) {
                        showErrorMessageUnauthorized('Error', 'Session has timed out need to login again.');
                    }
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

function deleteVotesUserStory(
    myUserStoryIndex,
) {
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            fetch(URL_Address + '/delete/userStory/votes', {
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
                    $('#voteUserStoryModal').modal('hide');
                });
        }
    }
}