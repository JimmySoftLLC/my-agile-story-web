function getProjects(thisDeveloper, myProjectIndex, checkingIfUpdateIsNeeded) {
    var myCurrentLocalTimeStamp = '';
    if (checkingIfUpdateIsNeeded && myProjectIndex != -1) {
        try {
            myCurrentLocalTimeStamp = myProjects[myProjectIndex].timeStampISO;
        } catch (err) {
            clearInterval(myUpdateTimer);
        }
    }
    fetch(URL_Address + '/get/projects', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
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
                'x-auth-token': myToken,
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

function editProject(myProjectIndex) {
    updateEditProjectMessage('Editing project please wait');
    var name = document.getElementById('edit-project-name').value;
    var description = document.getElementById('edit-project-description').value;
    var addedDeveloperEmails = arrayEmailDifference(myProjectDevelopers, myProjects[myProjectIndex].developers);
    var removedDeveloperEmails = arrayEmailDifference(myProjects[myProjectIndex].developers, myProjectDevelopers);
    var developersHighestPrivilege2 = developersHighestPrivilege(myProjectDevelopers);
    if (developersHighestPrivilege2 === 'R') {
        $('#editProjectModal').modal('hide');
        showErrorMessage('Error', 'The project cannot be edited.  It needs at least one team member with admin privileges.');
    } else {
        addDeveloperByEmail(addedDeveloperEmails, myProjectIndex);
        removeDeveloperByEmail(removedDeveloperEmails, myProjectIndex);
        fetch(URL_Address + '/put/project/returnProjectAndDeveloper', {
                method: 'post',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'x-auth-token': myToken,
                },
                body: JSON.stringify({
                    developerId: myDeveloper._id,
                    projectId: myProjects[myProjectIndex]._id,
                    name: name,
                    description: description,
                    developers: myProjectDevelopers,
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
                    'x-auth-token': myToken,
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
                if (obj.status === 401) {
                    showErrorMessageUnauthorized('Error', 'Session has timed out need to login again.');
                }
                if (obj.status === 200) {
                    // second delete all the bugs associated with the project
                    fetch(URL_Address + '/delete/project/bugs', {
                            method: 'post',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'x-auth-token': myToken,
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
                                fetch(URL_Address + '/delete/developer/project', {
                                        method: 'post',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                            'x-auth-token': myToken,
                                        },
                                        body: JSON.stringify({
                                            project: myProjects[myProjectIndex],
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