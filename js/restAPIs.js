//const URL_Address = 'http://127.0.0.1:3004';
const URL_Address = 'https://shrouded-basin-24147.herokuapp.com';

function loginDeveloper() {
    updateLoginMessage("Logging on to the server please wait");
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    fetch(URL_Address + '/get/developer', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body;
                setMyAglileStoryDeveloperStorage();
                getProjects(myDeveloper,-1);
                updateStatus("Welcome " + myDeveloper.firstName);
            } else {
                showErrorMessage("Error",obj.body.error)
            }
            $('#loginModal').modal('hide');
        });
}

function getProjects(thisDeveloper,myProjectIndex) {
    updateStatusNoClear("Getting projects please wait");
    fetch(URL_Address + '/get/projects', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectIds: thisDeveloper.projectIds
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myProjects = obj.body;
                setMyAglileStoryProjectStorage();
                loggedinMenu(myProjectIndex)
            } else {
                showErrorMessage("Error",obj.body.error)
            }
            $('#loginModal').modal('hide');
        });
}

function getUserStorys(thisProject, myIndex) {
    updateStatusNoClear("Getting user stories please wait");
    fetch(URL_Address + '/get/userStorys', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userStoryIds: thisProject.userStoryIds
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myUserStorys = obj.body;
                myUserStorys.sort(function(obj1, obj2) {return obj1.priority - obj2.priority;});
                setMyAglileStoryUserStoryStorage();
                displayUserStories();
                updateStatus("");
            } else {
                showErrorMessage("Error",obj.body.error)
            }
            $('#loginModal').modal('hide');
        });
}

function selectProjectDropDownChanged(){
    var myIndex = (document.getElementById('select-project').value);
    myLastSelectedProject = myIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myIndex != -1 ) {
        getUserStorys(myProjects[myIndex],myIndex);
        loggedinMenu(myIndex);
    }else {
        loggedinMenu(myIndex);
    } 
}

function setPhase(phase){
    myLastSelectedPhase=phase;
    var myIndex = (document.getElementById('select-project').value);
    myLastSelectedProject = myIndex;
    setMyAglileStorylastSelectedProjectStorage();
    hideBurnDownChart();
    if (myIndex != -1 ) {
        getUserStorys(myProjects[myIndex],myIndex);
    }
}

function createNewDeveloper() {
    updateDeveloperMessage("Creating new developer please wait");
    var email = document.getElementById('developer-email').value;
    var password = document.getElementById('developer-password').value;
    var firstName = document.getElementById('developer-first-name').value;
    var lastName = document.getElementById('developer-last-name').value;
    var bio = document.getElementById('developer-bio').value;
    var role = 'admin'; // TODO document.getElementById('developer-role').value;

    fetch(URL_Address + '/developer', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                role: role
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body;
                setMyAglileStoryDeveloperStorage();
                updateStatus("Developer created");
            } else {
                showErrorMessage("Error",obj.body.error)
            }
            $('#createNewDeveloperModal').modal('hide');
        });
}

function createNewProject() {
    updateProjectMessage("Creating new project please wait");
    var developerId = myDeveloper._id
    var name = document.getElementById('project-name').value;
    var description = document.getElementById('project-description').value;

    fetch(URL_Address + '/developer/project', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                developerId: developerId,
                name: name,
                description: description
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myProject = obj.body;
                myDeveloper.projectIds.push(myProject._id);
                getProjects(myDeveloper,-1);
                updateStatus('Project ' +  myProject.name + ', created successfully');
            } else {
                showErrorMessage("Error",obj.body.error)
            }
            $('#createNewProjectModal').modal('hide');
        });
}

function getRadioVal(radioName) {
    var selectedVal = 0;
    var selected = $(`input[type='radio'][name='` + radioName + `']:checked`);
    if (selected.length > 0) {
        selectedVal = selected.val();
    }
    console.log("Radio selected is " + selectedVal);
    var myReturnVal = parseInt(selectedVal)
    return Number(myReturnVal);
}

function createNewUserStory() {
    var myIndex = (document.getElementById('select-project').value);
    if (myIndex != -1 ) {
        updateUserStoryMessage("Creating new user story please wait");
        var projectId = myProjects[myIndex]._id;
        var userStoryTitle = document.getElementById('user-story-title').value;
        var userRole = document.getElementById('user-story-user-role').value;
        var userWant = document.getElementById('user-story-user-want').value;
        var userBenefit = document.getElementById('user-story-user-benefit').value;
        var acceptanceCriteria = document.getElementById('user-story-acceptance-criteria').value;
        var conversation = document.getElementById('user-story-conversation').value;
        var estimate = document.getElementById('user-story-estimate').value;
        var phase = getRadioVal('user-story-phase');
        var percentDone = document.getElementById('user-story-percent-done').value;
        percentDone = rangeLimit(percentDone,0,100);
        var priority = document.getElementById('user-story-priority').value;
        priority = rangeLimit(priority,1,10);
        var sprint = document.getElementById('user-story-sprint').value;
        fetch(URL_Address + '/project/userStory', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
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
                    sprint: sprint
                })
            }).then(res => res.json().then(data => ({
                status: res.status,
                body: data
            })))
            .then(obj => {
                if (obj.status === 200) {
                    myUserStory = obj.body
                    myProjects[myIndex].userStoryIds.push(myUserStory._id);
                    getUserStorys(myProjects[myIndex]);
                } else {
                    showErrorMessage("Error",obj.body.error)
                }
                $('#createNewUserStoryModal').modal('hide');
            });
    }
}   

function rangeLimit (myString, lowerValue, upperValue){
    if (myString == ""){
        myString = 0;
    }
    if (myString < lowerValue){
        myString = lowerValue;
    }
    if (myString > upperValue){
        myString = upperValue;
    }
    return myString;
}

function moveUserToNextPhase(myUserStoryIndex){
    updateStatusNoClear("Editing user story priority please wait");
    var userStoryTitle = myUserStorys[myUserStoryIndex].userStoryTitle;
    var userRole = myUserStorys[myUserStoryIndex].userRole;
    var userWant = myUserStorys[myUserStoryIndex].userWant;
    var userBenefit = myUserStorys[myUserStoryIndex].userBenefit;
    var acceptanceCriteria = myUserStorys[myUserStoryIndex].acceptanceCriteria;
    var conversation = myUserStorys[myUserStoryIndex].conversation;
    var estimate = myUserStorys[myUserStoryIndex].estimate;
    var temp = Number(myUserStorys[myUserStoryIndex].phase);
    temp +=1;
    temp=rangeLimit(temp,0,3);
    console.log(temp);
    var phase = parseInt(temp);
    console.log(phase);
    var percentDone = myUserStorys[myUserStoryIndex].percentDone;
    var priority = myUserStorys[myUserStoryIndex].priority;
    var sprint = myUserStorys[myUserStoryIndex].sprint;
    updateUserStory(myUserStoryIndex,userStoryTitle,userRole,userWant,userBenefit,acceptanceCriteria,conversation,estimate,phase,percentDone,priority,sprint);
}

function editUserStoryPriority(myUserStoryIndex){
    updateStatusNoClear("Editing user story priority please wait");
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
    var priority = document.getElementById(`user-story-priority-slider-`+myUserStoryIndex).value;
    updateUserStory(myUserStoryIndex,userStoryTitle,userRole,userWant,userBenefit,acceptanceCriteria,conversation,estimate,phase,percentDone,priority,sprint);
}

function editUserStory(myUserStoryIndex){
    updateEditUserStoryMessage("Editing user story please wait");
    var userStoryTitle = document.getElementById('edit-user-story-title').value;
    var userRole = document.getElementById('edit-user-story-user-role').value;
    var userWant = document.getElementById('edit-user-story-user-want').value;
    var userBenefit = document.getElementById('edit-user-story-user-benefit').value;
    var acceptanceCriteria = document.getElementById('edit-user-story-acceptance-criteria').value;
    var conversation = document.getElementById('edit-user-story-conversation').value;
    var estimate = document.getElementById('edit-user-story-estimate').value;
    var phase = getRadioVal('edit-user-story-phase');
    var percentDone = document.getElementById('edit-user-story-percent-done').value;
    var priority = parseInt(document.getElementById('edit-user-story-priority').value);
    var sprint = parseInt(document.getElementById('edit-user-story-sprint').value);
    updateUserStory(myUserStoryIndex,userStoryTitle,userRole,userWant,userBenefit,acceptanceCriteria,conversation,estimate,phase,percentDone,priority,sprint);
}

function updateUserStory(myUserStoryIndex,userStoryTitle,userRole,userWant,userBenefit,acceptanceCriteria,conversation,estimate,phase,percentDone,priority,sprint) {
    var myProjectIndex = (document.getElementById('select-project').value);
    if (myProjectIndex != -1) { 
        updateStatusNoClear("Updating user story please wait");
        if (myUserStoryIndex != -1 ) {
            percentDone = rangeLimit(percentDone,0,100);
            priority = rangeLimit(priority,1,10);
            fetch(URL_Address + '/put/userStory', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
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
                        sprint: sprint
                    })
                }).then(res => res.json().then(data => ({
                    status: res.status,
                    body: data
                })))
                .then(obj => {
                    if (obj.status === 200) {
                        myUserStory = obj.body
                        getUserStorys(myProjects[myProjectIndex]);
                    } else {
                        showErrorMessage("Error",obj.body.error)
                    }
                    $('#editUserStoryModal').modal('hide');
                });
        }
    }
}

function editProject(myProjectIndex) {
    updateEditProjectMessage("Editing project please wait");
    if (myProjectIndex != -1 ) {
        var name = document.getElementById('edit-project-name').value;
        var description = document.getElementById('edit-project-description').value;
        fetch(URL_Address + '/put/project', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId: myProjects[myProjectIndex]._id,
                    name: name,
                    description: description
                })
            }).then(res => res.json().then(data => ({
                status: res.status,
                body: data
            })))
            .then(obj => {
                if (obj.status === 200) {
                    myProject = obj.body            
                    getProjects(myDeveloper,myProjectIndex)
                    updateStatus('Project ' +  myProject.name + ', edited successfully'); 
                    $('#editProjectModal').modal('hide');
                } else {
                    showErrorMessage("Error",obj.body.error)
                }

            });
    }
}

function editDeveloper() {
    updateEditDeveloperMessage("Editing developer please wait");
    var firstName = document.getElementById('edit-developer-first-name').value;
    var lastName = document.getElementById('edit-developer-last-name').value;
    var email = document.getElementById('edit-developer-email').value;
    var password = document.getElementById('edit-developer-password').value;
    var bio = document.getElementById('edit-developer-bio').value; 
    var role = "admin"; //TODO change the dialog to have roles
    fetch(URL_Address + '/put/developer', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                developerId: myDeveloper._id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                bio: bio,
                role: role
            })
        }).then(res => res.json().then(data => ({
            status: res.status,
            body: data
        })))
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body
                setMyAglileStoryDeveloperStorage();           
                updateStatus('Developer ' +  myDeveloper.firstName + ', edited successfully'); 
                $('#editDeveloperModal').modal('hide');
            } else {
                showErrorMessage("Error",obj.body.error)
            }
        });
}

function DeleteUserStorySetup(myUserStoryIndex) {
    showConfirmDeletePopup('DeleteUserStory',myUserStoryIndex,' user story <strong>' + myUserStorys[myUserStoryIndex].userStoryTitle + "</strong>");
}

function DeleteUserStory(myUserStoryIndex) {
    $('#confirm-delete').modal('hide');
    if (myUserStoryIndex != -1) {
        updateStatus("Deleting user story please wait");
        var userStoryId = myUserStorys[myUserStoryIndex]._id;
        var projectId = myUserStorys[myUserStoryIndex].projectId;
        var myProjectIndex = -1;
        for (i = 0; i < myProjects.length; i++) {
          if (myProjects[i]._id == projectId) {
              myProjectIndex = i;
              break;
          }
        }
        if (myUserStoryIndex != -1) {    
            fetch(URL_Address + '/delete/project/userStory', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userStoryId: userStoryId,
                        projectId: projectId
                    })
                }).then(res => res.json().then(data => ({
                    status: res.status,
                    body: data    
                })))
                .then(obj => {
                    if (obj.status === 200) {
                        updateStatus("User story deleted");
                        getUserStorys(myProjects[myProjectIndex]);
                    } else {
                        showErrorMessage("Error",obj.body.error)
                    }
                });
        }
    }
}

function deleteProjectSetup(){
    var myProjectIndex = (document.getElementById('select-project').value);
    if (myProjectIndex != -1 ) {
        showConfirmDeletePopup('DeleteProject',myProjectIndex,' project <strong>' + myProjects[myProjectIndex].name + "</strong>");
    }
}

function DeleteProject(myProjectIndex) {  
    $('#confirm-delete').modal('hide');    
    console.log(myProjects[myProjectIndex]._id)
    if (myProjectIndex != -1) { 
        updateStatus("Deleting user story please wait");
        // first delete all the user stories associated with the project
        fetch(URL_Address + '/delete/project/userStorys', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userStoryIds: myProjects[myProjectIndex].userStoryIds
                })
            }).then(res => res.json().then(data => ({
                status: res.status,
                body: data    
            })))
            .then(obj => {
                if (obj.status === 200) {
                    console.log(obj.status);
                    console.log(obj.body);
                    updateStatus("Project deleted");
                    getUserStorys(myProjects[myProjectIndex])
                    // user stories are now deleted now delete the project
                    fetch(URL_Address + '/delete/developer/project', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            projectId: myProjects[myProjectIndex]._id
                        })
                    }).then(res => res.json().then(data => ({
                        status: res.status,
                        body: data    
                    })))
                    .then(obj => {
                        if (obj.status === 200) {
                            getProjects(myDeveloper, -1);
                        } else {
                            showErrorMessage("Error",obj.body.error);
                        }
                    });
                } else {
                    showErrorMessage("Error",obj.body.error) 
                }
            });
    }
}

function logMyDeveloper() {
    console.log(myDeveloper);
    console.log(myProjects);
    console.log(myUserStorys);
}