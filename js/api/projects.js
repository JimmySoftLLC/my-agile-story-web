const getProjects = async (thisDeveloper, myProjectIndex, checkingIfUpdateIsNeeded) => {
    var myCurrentLocalTimeStamp = '';
    if (checkingIfUpdateIsNeeded && myProjectIndex != -1) {
        try {
            myCurrentLocalTimeStamp = myProjects[myProjectIndex].timeStampISO;
        } catch (err) {
            clearInterval(myProjectUpdateTimer);
        }
    }
    try {
        const res = await fetch(URL_Address + '/get/projects', {
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
        const obj = await res.json()
        myProjects = obj;
        setMyAglileStoryProjectStorage();
        clearInterval(myDeveloperUpdateTimer);
        myDeveloperUpdateTimer = setInterval(updateDeveloperInContext, 5000);
        if (checkingIfUpdateIsNeeded && myProjectIndex != -1) {
            try {
                if (
                    myCurrentLocalTimeStamp != myProjects[myProjectIndex].timeStampISO
                ) {
                    getUserStorys(myProjects[myProjectIndex], myProjectIndex);
                }
            } catch (err) {
                clearInterval(myProjectUpdateTimer);
            }
        } else {
            loggedInMenu(myProjectIndex);
        }
    } catch (error) {
        showErrorMessage('Error', error.message);
    }
}

const createNewProject = async () => {
    updateProjectMessage('Creating new project please wait');
    var developerId = myDeveloper._id;
    var name = document.getElementById('project-name').value;
    var description = document.getElementById('project-description').value;
    try {
        const res = await fetch(URL_Address + '/developer/project/returnProjectAndDeveloper', {
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
        const obj = await res.json();
        myProject = obj.project;
        myDeveloper = obj.developer;
        getProjects(myDeveloper, -1);
        $('#createNewProjectModal').modal('hide');
    } catch (error) {
        showErrorMessage('Error', error.message);
    }
}

const editProject = async (myProjectIndex) => {
    updateEditProjectMessage('Editing project please wait');
    var name = document.getElementById('edit-project-name').value;
    var description = document.getElementById('edit-project-description').value;
    var addedDeveloperEmails = arrayEmailDifference(myProjectDevelopers, myProjects[myProjectIndex].developers);
    var removedDeveloperEmails = arrayEmailDifference(myProjects[myProjectIndex].developers, myProjectDevelopers);
    var myCurrentPrivilege = developersHighestPrivilege(myProjectDevelopers);
    if (myCurrentPrivilege === 'R') {
        $('#editProjectModal').modal('hide');
        showErrorMessage('Error', 'The project cannot be edited.  It needs at least one team member with admin privileges.');
    } else {
        addDeveloperByEmail(addedDeveloperEmails, myProjectIndex);
        removeDeveloperByEmail(removedDeveloperEmails, myProjectIndex);
        try {
            const res = await fetch(URL_Address + '/put/project/returnProjectAndDeveloper', {
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
            const obj = await res.json()
            myProject = obj.project;
            myDeveloper = obj.developer;
            getProjects(myDeveloper, myProjectIndex);
            $('#editProjectModal').modal('hide');
        } catch (error) {
            showErrorMessage('Error', error.message);
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

const deleteProject = async (myProjectIndex) => {
    $('#confirm-delete').modal('hide');
    if (myProjectIndex != -1) {
        try {
            // first delete all the user stories associated with the project
            const res = await fetch(URL_Address + '/delete/project/userStorys', {
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
            // second delete all the bugs associated with the project
            const res2 = await fetch(URL_Address + '/delete/project/bugs', {
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
            // now delete project
            const res3 = await fetch(URL_Address + '/delete/developer/project', {
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
            const obj = await res3.json();
            let developers = obj;
            for (let i = 0; i < developers.length; i++) {
                if (developers[i]._id == myDeveloper._id) {
                    myDeveloper = JSON.parse(JSON.stringify(developers[i]))
                    break;
                }
            }
            getProjects(myDeveloper, -1);
        } catch (error) {
            showErrorMessage('Error', error.message);
        }
    }
}