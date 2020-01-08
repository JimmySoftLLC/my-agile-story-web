const addVoteUserStory = async (myUserStoryIndex) => {
    var myProjectIndex = document.getElementById('select-project').value;
    var vote = {
        developerId: myDeveloper._id,
        vote: getRadioVal('vote'),
        firstName: myDeveloper.firstName,
        lastName: myDeveloper.lastName,
    }
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            try {
                const res = await fetch(URL_Address + '/put/userStory/voteReturnUserStoryProject', {
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
                const obj = await res.json()
                myUserStory = obj.userStory;
                myProjects[myProjectIndex] = obj.project;
                getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                $('#voteUserStoryModal').modal('hide');
            } catch (error) {
                showErrorMessage('Error', error.message);
            }
        }
    }
}

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
        })
        obj = await res.json()
        myUserStorys = obj;
        myUserStorys.sort(function (obj1, obj2) {
            return obj1.priority - obj2.priority;
        });
        setMyAglileStoryUserStoryStorage();
        getBugs(thisProject, myProjectIndex);
        $('#loginModal').modal('hide');
    } catch (error) {
        showErrorMessage('Error', error.message);
    }
}

const createNewUserStory = async () => {
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        updateUserStoryMessage('Creating new user story please wait');
        var projectId = myProjects[myProjectIndex]._id;
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
        try {
            const res = await fetch(URL_Address + '/project/userStory/returnUserStoryAndProject', {
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
            const obj = await res.json();
            myUserStory = obj.userStory;
            myProjects[myProjectIndex] = obj.project;
            getUserStorys(myProjects[myProjectIndex], myProjectIndex);
            $('#createNewUserStoryModal').modal('hide');
        } catch (error) {
            showErrorMessage('Error', error.message);
        }
    }
}

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
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            percentDone = rangeLimit(percentDone, 0, 100);
            priority = rangeLimit(priority, 1, 10);
            estimate = rangeLimit(estimate, 0, 100000000000);
            try {
                const res = await fetch(URL_Address + '/put/userStory/returnUserStoryAndProject', {
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
                const obj = await res.json()
                myUserStory = obj.userStory;
                myProjects[myProjectIndex] = obj.project;
                getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                $('#editUserStoryModal').modal('hide');
            } catch (error) {
                showErrorMessage('Error', error.message);
            }
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

const deleteUserStory = async (myUserStoryIndex) => {
    $('#confirm-delete').modal('hide');
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            var userStoryId = myUserStorys[myUserStoryIndex]._id;
            var projectId = myUserStorys[myUserStoryIndex].projectId;
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
            })
            const obj = await res.json()
            myProjects[myProjectIndex] = obj;
            getUserStorys(myProjects[myProjectIndex], myProjectIndex);
        }
    }
}

const deleteVotesUserStory = async (myUserStoryIndex) => {
    var myProjectIndex = document.getElementById('select-project').value;
    if (myProjectIndex != -1) {
        if (myUserStoryIndex != -1) {
            try {
                const res = fetch(URL_Address + '/delete/userStory/votes', {
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
                const obj = res.json()
                myUserStory = obj.userStory;
                myProjects[myProjectIndex] = obj.project;
                getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                $('#voteUserStoryModal').modal('hide');
            } catch (error) {
                showErrorMessage('Error', obj.error);
            }
        }
    }
}