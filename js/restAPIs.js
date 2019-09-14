//const URL_Address = 'http://127.0.0.1:3004';
const URL_Address = 'https://shrouded-basin-24147.herokuapp.com';

function loginDeveloper() {
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
                //console.log(obj.status);
                //console.log(myDeveloper);
                getProjects(myDeveloper,-1);
                updateStatus("Welcome " + myDeveloper.firstName);
            } else {
                //console.log(obj.status);
                //console.log(obj.body);
                updateStatus(obj.body.error);
            }
            $('#loginModal').modal('hide');
        });
}

function getProjects(thisDeveloper,myProjectIndex) {
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
                //console.log(obj.status);
                //console.log(myProjects);
            } else {
                console.log(obj.status);
                console.log(obj.body);
                updateStatus(obj.body);
            }
            $('#loginModal').modal('hide');
        });
}

function getUserStorys(thisProject, myIndex) {
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
                setMyAglileStoryUserStoryStorage();
                displayUserStories();
                console.log(obj.status);
                console.log(myUserStorys);
            } else {
                console.log(obj.status);
                console.log(obj.body);
                updateStatus(obj.body);
            }
            $('#loginModal').modal('hide');
        });
}

function selectProjectDropDownChanged(){
    var myIndex = (document.getElementById('select-project').value);
    myLastSelectedProject = myIndex;
    setMyAglileStorylastSelectedProjectStorage();
    console.log ("User changed project option to " + myIndex);
    if (myIndex != -1 ) {
        getUserStorys(myProjects[myIndex],myIndex);
    }
}


function createNewDeveloper() {
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
                console.log(obj.status);
                console.log(myDeveloper);
            } else {
                console.log(obj.status);
                console.log(obj.body);
                updateStatus(obj.body);
            }
            $('#createNewDeveloperModal').modal('hide');
        });
}

function createNewProject() {
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
                getProjects(myDeveloper)
                console.log(obj.status);
                console.log(myProject);
                updateStatus('Project ' +  myProject.name + ', created successfully');
            } else {
                console.log(obj.status);
                console.log(obj.body);
                updateStatus(obj.body);
            }
            $('#createNewProjectModal').modal('hide');
        });
}

function createNewUserStory() {
    var myIndex = (document.getElementById('select-project').value);
    if (myIndex != -1 ) {
        var projectId = myProjects[myIndex]._id;
        var userStoryTitle = document.getElementById('user-story-title').value;
        var userRole = document.getElementById('user-story-user-role').value;
        var userWant = document.getElementById('user-story-user-want').value;
        var userBenefit = document.getElementById('user-story-user-benefit').value;
        var acceptanceCriteria = document.getElementById('user-story-acceptance-criteria').value;
        var conversation = document.getElementById('user-story-conversation').value;
        var estimate = document.getElementById('user-story-estimate').value;
        var phase = document.getElementById('user-story-phase').value;
        var percentDone = document.getElementById('user-story-percent-done').value;
        percentDone = rangeLimit(percentDone,0,100);

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
                    percentDone: percentDone
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
                    console.log(obj.status);
                    console.log(myUserStory);
                } else {
                    console.log(obj.status);
                    console.log(obj.body);
                    updateStatus(obj.body);
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

function editUserStory(myUserStoryIndex) {
    var myProjectIndex = (document.getElementById('select-project').value);
    if (myUserStoryIndex != -1 ) {
        var userStoryTitle = document.getElementById('edit-user-story-title').value;
        var userRole = document.getElementById('edit-user-story-user-role').value;
        var userWant = document.getElementById('edit-user-story-user-want').value;
        var userBenefit = document.getElementById('edit-user-story-user-benefit').value;
        var acceptanceCriteria = document.getElementById('edit-user-story-acceptance-criteria').value;
        var conversation = document.getElementById('edit-user-story-conversation').value;
        var estimate = document.getElementById('edit-user-story-estimate').value;
        var phase = document.getElementById('edit-user-story-phase').value;
        var percentDone = document.getElementById('edit-user-story-percent-done').value;
        percentDone = rangeLimit(percentDone,0,100);

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
                    percentDone: percentDone
                })
            }).then(res => res.json().then(data => ({
                status: res.status,
                body: data
            })))
            .then(obj => {
                if (obj.status === 200) {
                    myUserStory = obj.body
                    console.log(obj.status);
                    console.log(myUserStory);
                    getUserStorys(myProjects[myProjectIndex]);
                } else {
                    console.log(obj.status);
                    console.log(obj.body);
                    updateStatus(obj.body);
                }
                $('#editUserStoryModal').modal('hide');
            });
    }
}

function editProject(myProjectIndex) {
    console.log("edit project routine")
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
                    console.log(obj.status);
                    console.log(myProject);            
                    getProjects(myDeveloper,myProjectIndex)
                    updateStatus('Project ' +  myProject.name + ', edited successfully'); 
                    $('#editProjectModal').modal('hide');
                } else {
                    console.log(obj.status);
                    console.log(obj.body);
                    updateStatus(obj.body);
                }

            });
    }
}

function editDeveloper() {
    console.log("edit developer routine")
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
                console.log(obj.status);
                console.log(myDeveloper);            
                updateStatus('Developer ' +  myDeveloper.firstName + ', edited successfully'); 
                $('#editDeveloperModal').modal('hide');
            } else {
                console.log(obj.status);
                console.log(obj.body);
                updateStatus(obj.body);
            }
        });
}

function DeleteUserStorySetup(myUserStoryIndex) {
    showConfirmDeletePopup('DeleteUserStory',myUserStoryIndex,' user story <strong>' + myUserStorys[myUserStoryIndex].userStoryTitle + "</strong>");
}

function DeleteUserStory(myUserStoryIndex) {  
    $('#confirm-delete').modal('hide');
    if (myUserStoryIndex != -1) {
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
                        console.log(obj.status);
                        console.log(obj.body);
                        getUserStorys(myProjects[myProjectIndex]);
                    } else {
                        console.log(obj.status);
                        console.log(obj.body);  
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
                            console.log(obj.status);
                            console.log(obj.body);
                            getProjects(myDeveloper)
                        } else {
                            console.log(obj.status);
                            console.log(obj.body);  
                        }
                    });
                } else {
                    console.log(obj.status);
                    console.log(obj.body);  
                }
            });
    }
}

function logMyDeveloper() {
    console.log(myDeveloper);
    console.log(myProjects);
    console.log(myUserStorys);
}