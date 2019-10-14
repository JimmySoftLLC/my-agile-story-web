var myUpdateTimer;

function updateProjectInContext() {
    if (myLastSelectedProject != 1) {
        getProjects(myDeveloper, myLastSelectedProject, true)
    }
}

function showPopupMessage(message) {
    document.getElementById('popup-message').innerHTML = message;
    $('#message-dialog').modal('show');
    setTimeout(hidePopupMessage, 1500);
}

function showPopupMessageNoClear(message) {
    document.getElementById('popup-message').innerHTML = message;
    $('#message-dialog').modal('show');
}

function hidePopupMessage() {
    $("#message-dialog").modal("hide");
}

function updateStatusMessage(message) {
    document.getElementById('status-message').innerHTML = message;
    setTimeout(clearStatusMessage, 1500);
}

function updateStatusMessageNoClear(message) {
    document.getElementById('status-message').innerHTML = message;
}

function clearStatusMessage() {
    document.getElementById('status-message').innerHTML = "";
}

function updateLoginMessage(message) {
    document.getElementById('login-message').innerHTML = '<p>' + message + '</p>';
}

function updateDeveloperMessage(message) {
    document.getElementById('developer-message').innerHTML = '<p>' + message + '</p>';
}

function updateEditDeveloperMessage(message) {
    document.getElementById('edit-developer-message').innerHTML = '<p>' + message + '</p>';
}

function updateProjectMessage(message) {
    document.getElementById('project-message').innerHTML = '<p>' + message + '</p>';
}

function updateEditProjectMessage(message) {
    document.getElementById('edit-project-message').innerHTML = '<p>' + message + '</p>';
}

function updateUserStoryMessage(message) {
    document.getElementById('user-story-message').innerHTML = '<p>' + message + '</p>';
}

function updateEditUserStoryMessage(message) {
    document.getElementById('edit-user-story-message').innerHTML = '<p>' + message + '</p>';
}

$('#editUserStoryModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-body input.edit-user-story-title').val(myUserStorys[myIndex].userStoryTitle);
    modal.find('.modal-body input.edit-user-story-user-role').val(myUserStorys[myIndex].userRole);
    modal.find('.modal-body input.edit-user-story-user-want').val(myUserStorys[myIndex].userWant);
    modal.find('.modal-body input.edit-user-story-user-benefit').val(myUserStorys[myIndex].userBenefit);
    modal.find('.modal-body textarea.edit-user-story-acceptance-criteria').val(myUserStorys[myIndex].acceptanceCriteria);
    modal.find('.modal-body textarea.edit-user-story-conversation').val(myUserStorys[myIndex].conversation);
    modal.find('.modal-body input.edit-user-story-estimate').val(myUserStorys[myIndex].estimate);
    if (myUserStorys[myIndex].phase === "" || myUserStorys[myIndex].phase === "null" || myUserStorys[myIndex].phase === "undefined") {
        myUserStorys[myIndex].phase = "0";
    }
    document.getElementById(`edit-user-story-phase-` + myUserStorys[myIndex].phase).checked = true;
    modal.find('.modal-body input.edit-user-story-percent-done').val(myUserStorys[myIndex].percentDone);
    modal.find('.modal-body input.edit-user-story-priority').val(myUserStorys[myIndex].priority);
    modal.find('.modal-body input.edit-user-story-sprint').val(myUserStorys[myIndex].sprint);
    let listHTML = `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editUserStory(` + myIndex + `)">Save Changes</button>`;
    //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="splitUserStory(` + myIndex + `)">Split</button>`;
    //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="mergeUserStory(` + myIndex + `)">Merge</button>`;
    listHTML += ` </div>`
    document.getElementById('edit-user-story-buttons').innerHTML = listHTML;
    updateEditUserStoryMessage("");
})

$('#createNewUserStoryModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.user-story-title').val("");
    modal.find('.modal-body input.user-story-user-role').val("");
    modal.find('.modal-body input.user-story-user-want').val("");
    modal.find('.modal-body input.user-story-user-benefit').val("");
    modal.find('.modal-body textarea.user-story-acceptance-criteria').val("");
    modal.find('.modal-body textarea.user-story-conversation').val("");
    modal.find('.modal-body input.user-story-estimate').val("0");
    modal.find('.modal-body input.user-story-priority').val("1");
    modal.find('.modal-body input.user-story-sprint').val("0");
    document.getElementById(`user-story-phase-` + 0).checked = true;
    modal.find('.modal-body input.user-story-percent-done').val("0");
    updateUserStoryMessage("");
})

$('#createNewDeveloperModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.developer-email').val("");
    modal.find('.modal-body input.developer-password').val("");
    modal.find('.modal-body input.developer-first-name').val("");
    modal.find('.modal-body input.developer-last-name').val("");
    modal.find('.modal-body textarea.developer-bio').val("");
    updateDeveloperMessage("");
})

$('#editDeveloperModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    modal.find('.modal-body input.edit-developer-email').val(myDeveloper.email);
    modal.find('.modal-body input.edit-developer-password').val(myDeveloper.password);
    modal.find('.modal-body input.edit-developer-first-name').val(myDeveloper.firstName);
    modal.find('.modal-body input.edit-developer-last-name').val(myDeveloper.lastName);
    modal.find('.modal-body textarea.edit-developer-bio').val(myDeveloper.bio);
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML = `<button type="button" class="btn btn-primary" onclick="editDeveloper()">Save Changes</button>`;
    document.getElementById('edit-developer-buttons').innerHTML = listHTML;
    updateEditDeveloperMessage("");
})

$('#loginModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.login-email').val("");
    modal.find('.modal-body input.login-password').val("");
    updateLoginMessage("");
})

$('#createNewProjectModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.project-name').val("");
    modal.find('.modal-body textarea.project-description').val("");
    updateProjectMessage("");
})

$('#editProjectModal').on('show.bs.modal', function (event) {
    var myProjectIndex = (document.getElementById('select-project').value);
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    modal.find('.modal-body input.edit-project-name').val(myProjects[myProjectIndex].name);
    modal.find('.modal-body textarea.edit-project-description').val(myProjects[myProjectIndex].description);
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML = `<button type="button" class="btn btn-primary" onclick="editProject(` + myProjectIndex + `)">Save Changes</button>`;
    document.getElementById('edit-project-buttons').innerHTML = listHTML;
    updateEditProjectMessage("");
})

function showConfirmDeletePopup(functionName, functionValue, functionMessage) {
    let listHTML = '';
    listHTML = `<i class="fas fa-exclamation-triangle"></i> Delete warning`;
    document.getElementById('confirm-delete-title').innerHTML = listHTML;
    listHTML = `You about to delete ` + functionMessage + `.  This process is irreversable are you sure?`;
    document.getElementById('confirm-delete-message').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>`;
    listHTML += `<button type="button" class="btn btn-danger btn-ok" onclick="` + functionName + `(` + functionValue + `)">Delete</button>`;
    document.getElementById('confirm-delete-buttons').innerHTML = listHTML;
    $('#confirm-delete').modal('show');
}

function showErrorMessage(errorTitle, errorMessage) {
    let listHTML = '';
    listHTML = `<i class="fas fa-exclamation-triangle"></i> ` + errorTitle;
    document.getElementById('error-dialog-title').innerHTML = listHTML;
    listHTML = errorMessage;
    document.getElementById('error-dialog-message').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>`;
    document.getElementById('error-dialog-buttons').innerHTML = listHTML;
    $('#error-dialog').modal('show');
}

function loginMenu(statusMessage) {
    clearInterval(myUpdateTimer);
    let listHTML = '';
    listHTML = aboutUsDrowdown();
    document.getElementById('nav-bar-items').innerHTML = listHTML;
    listHTML = '';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    showVideo();
    hideBurnDownChart();
    displayUserStories();
}

function showVideo() {
    var myVideo = "https://www.youtube.com/embed/PHabA6CTFXA";
    let listHTML = '';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video-slash"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    listHTML = '<h4 class = "my-margin-at-top">';
    listHTML += 'Overview';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += 'My Agile Story is a virtual Agile board that organizes user stories into four sections: to do, doing, verify and done.';
    listHTML += '</p>';
    listHTML += '<p>';
    listHTML += 'Add story cards, create sprints and measure your progress with a burndown chart.';
    listHTML += '</p>';
    listHTML += '<p>';
    listHTML += 'All information is saved on the cloud and updated automatically for each logged in user.  You team can collaborate virtually, no need for post it notes.  Create your own account and have fun!';
    listHTML += '</p>';
    listHTML += '<h4>';
    listHTML += 'Button definitions, when signed out';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML += '<button type="button" class="btn btn-primary button-primary-override"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '  Links  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fas fa-video-slash"></i></button>';
    listHTML += '  Hide help screen  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fas fa-video"></i></button>';
    listHTML += '  Show help screen  ';
    listHTML += '</row>';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-user-plus"></i></button>';
    listHTML += '  Register new user  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-sign-in-alt"></i></button>';
    listHTML += '  Sign in  ';
    listHTML += '</row>';
    listHTML += '</p>';
    listHTML += '<h4>';
    listHTML += 'Button definitions, when signed in';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML += '<button type="button" class="btn btn-primary  button-primary-override"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '  Links  ';
    listHTML += '<button type="button" class="btn btn-primary dialogButton  button-primary-override"><i class="fas fa-list"></i></button>';
    listHTML += '  To do  ';
    listHTML += '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-running"></i></button>';
    listHTML += '  Doing / Sprint  ';
    listHTML += '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-check"></i></button>';
    listHTML += '  Verify  ';
    listHTML += '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-hands-helping"></i></button>';
    listHTML += '  Done  ';
    listHTML += '<button type="button" class="btn btn-primary button-primary-override"><i class="fas fa-chart-bar"></i></button>';
    listHTML += '  Burndown Chart  ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<p>';
    listHTML += '<row>';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-project-diagram"></i></button>';
    listHTML += '  Create project  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-trash"></i></button>';
    listHTML += '  Delete project  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-edit"></i></button>';
    listHTML += '  Edit project  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-newspaper"></i></button>';
    listHTML += '  Create user story  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-user-edit"></i></button>';
    listHTML += '  Edit User  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-sign-out-alt"></i></button>';
    listHTML += '  Sign out  ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<h4>';
    listHTML += 'Button definitions, on user story cards';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-trash"></i></button>';
    listHTML += '  Delete user story  ';
    listHTML += '<button type="button" class="btn btn-light"><i class="fas fa-edit"></i></button>';
    listHTML += '  Edit user story  ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<h4>';
    listHTML += 'Video Instuctions';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += 'Watch the video below to get an overview and instructions for use.';
    listHTML += '</p>';
    listHTML += `<div style="position:relative; padding-bottom:56.25%; padding-top:30px; height:0; overflow:hidden;">`
    listHTML += `<iframe width="560" height="315" src="` + myVideo + `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style = "position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>`;
    listHTML += `</div>`;

    document.getElementById('myVideoInstructions').innerHTML = listHTML;
}

function hideVideo() {
    let listHTML = '';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="showVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    document.getElementById('myVideoInstructions').innerHTML = "";
}

function loggedinMenu(myProjectIndex) {
    document.getElementById('user-story-elements').innerHTML = "";
    let listHTML = '';
    listHTML += '   <select class="form-control select-project" id="select-project" onchange="selectProjectDropDownChanged()">';
    listHTML += '<div class="btn-group">'
    if (Number(myProjectIndex) === -1) {
        clearInterval(myUpdateTimer);
        listHTML += '       <option selected value = "-1" >Select Project</option>';
        for (var j = 0; j < myProjects.length; j++) {
            listHTML += `<option value = "` + j + `">` + myProjects[j].name + `</option>`;
        }
    } else {
        myUpdateTimer = setInterval(updateProjectInContext, 5000)
        listHTML += '       <option value = "-1" >Select Project</option>';
        for (var j = 0; j < myProjects.length; j++) {
            if (j === Number(myProjectIndex)) {
                listHTML += `<option selected value = "` + j + `">` + myProjects[j].name + `</option>`;
            } else {
                listHTML += `<option value = "` + j + `">` + myProjects[j].name + `</option>`;
            }
        }
    }
    listHTML += '   </div>';
    listHTML += '   </select>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewProjectModal" data-hc-index=""><i class="fas fa-project-diagram"></i></button>';
    if (Number(myProjectIndex) != -1) {
        listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="deleteProjectSetup()" data-hc-index=""><i class="fas fa-trash"></i></button>';
        listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editProjectModal" data-hc-index=""><i class="fas fa-edit"></i></button>';
        listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewUserStoryModal" data-hc-index=""><i class="fas fa-newspaper"></i></button>';
    }
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editDeveloperModal" data-hc-index=""><i class="fas fa-user-edit"></i></button>';
    listHTML += '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    listHTML = aboutUsDrowdown();
    listHTML += '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(0)" data-hc-index=""><i class="fas fa-list"></i></button>';
    listHTML += '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(1)" data-hc-index=""><i class="fas fa-running"></i></button>';
    listHTML += '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(2)" data-hc-index=""><i class="fas fa-check"></i></button>';
    listHTML += '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(3)" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
    listHTML += '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(4)" data-hc-index=""><i class="fas fa-chart-bar"></i></button>';
    displayUserStories();
    document.getElementById('nav-bar-items').innerHTML = listHTML;
    document.getElementById('myVideoInstructions').innerHTML = "";
}

function displayUserStories() {
    let listHTML = `<div class ="row user-story-div">`;
    if (myLastSelectedPhase === 4) {
        showBurnDownChart();
    } else {
        if (myLastSelectedProject != -1) {
            for (let i = 0; i < myUserStorys.length; i++) {
                if (parseInt(myUserStorys[i].phase) === parseInt(myLastSelectedPhase)) {
                    listHTML += `<div class ="col col-user-story-card">`;
                    listHTML += `   <div class="card user-story-card">`;
                    listHTML += `       <div class="card-body">`;
                    listHTML += `           <h5 class="card-title">S` + myUserStorys[i].sprint + ` - ` + myUserStorys[i].userStoryTitle + `</h5>`;
                    listHTML += `           <p class="card-text" style = "padding: 0px 0px 0px 0px;">As a ` + myUserStorys[i].userRole + `, I want ` + myUserStorys[i].userWant + ` so that ` + myUserStorys[i].userBenefit + `</p>`;
                    listHTML += `           <div class="row">`;
                    listHTML += `               <div class="col-11">`;
                    listHTML += `                   <div class="progress">`;
                    listHTML += `                       <div class="progress-bar" role="progressbar" style="width: ` + myUserStorys[i].percentDone + `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">` + myUserStorys[i].percentDone + `%</div>`;
                    listHTML += `                   </div>`;
                    listHTML += `               </div>`;
                    listHTML += `               <div class="col-1" style = "padding: 0px; margin-left: -10px; margin-top: -4px;">` + myUserStorys[i].estimate + `</div>`;
                    listHTML += `           </div>`;
                    listHTML += `       </div>`;
                    listHTML += `       <div class="row" style="margin:auto;">`;
                    listHTML += `           <button type="button" class="btn btn-secondary dialogButton" data-toggle="modal" data-target="#editUserStoryModal" data-hc-index="` + i + `"><i class="fas fa-edit"></i></button>`;
                    listHTML += `           <button type="button" class="btn btn-secondary dialogButton" onclick ="deleteUserStorySetup(` + i + `)"><i class="fas fa-trash"></i></button>`;

                    switch (myUserStorys[i].phase) {
                        case "0":
                            listHTML += `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-running"></i></button>`;
                            break;
                        case "1":
                            listHTML += `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-check"></i></button>`;
                            break;
                        case "2":
                            listHTML += `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-hands-helping"></i></button>`;
                            break;
                        default:
                            break;
                    }
                    listHTML += `           <input select id="user-story-priority-slider-` + i + `" type="range" min="1" max="10" value="` + myUserStorys[i].priority + `" onchange="editUserStoryPriority(` + i + `)">`;
                    listHTML += `       </div>`;
                    listHTML += `   </div>`;
                    listHTML += `</div>`;
                }
            }
        }

        listHTML += `</div>`;
        document.getElementById('user-story-elements').innerHTML = listHTML;
    }
}

function logoutAll() {
    showPopupMessage("Good bye " + myDeveloper.firstName + " thanks for visiting!")
    localStorage.removeItem('lastDeveloper');
    localStorage.removeItem('lastProjects');
    localStorage.removeItem('lastUserStorys');
    myDeveloper = {};
    myProjects = [];
    myUserStorys = [];
    loginMenu();
}

function aboutUsDrowdown() {
    let listHTML = '';
    listHTML += '<div class="btn-group">'
    listHTML += '   <button type="button" class="btn btn-primary dialogButton dropdown-toggle button-primary-override-dropdown" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '   <div class="dropdown-menu">';
    listHTML += '       <a class="dropdown-item" href="https://jimmysoftllc.com" target="_blank">JimmySoft LLC</a>';
    listHTML += '       <a class="dropdown-item" href="https://embroiderywaresoftware.com" target="_blank">EmbroideryWare</a>';
    listHTML += '       <a class="dropdown-item" href="https://www.heatercalc.com" target="_blank">Heater Calc</a>';
    listHTML += '       <a class="dropdown-item" href="https://www.buttonbudget.com" target="_blank">Button Budget</a>';
    listHTML += '       <a class="dropdown-item" href="https://www.weathermany.com" target="_blank">Weather Many</a>';
    listHTML += '   </div>';
    listHTML += '</div>';
    return listHTML;
}

//Local storage for lastUserStories-----------------------
if (!localStorage.getItem('lastUserStorys')) {
    setMyAglileStoryUserStoryStorage();
} else {
    getMyAglileStoryUserStoryStorage();
}

function setMyAglileStoryUserStoryStorage() {
    localStorage.setItem('lastUserStorys', JSON.stringify(myUserStorys));
}

function getMyAglileStoryUserStoryStorage() {
    myUserStorys = JSON.parse(localStorage.getItem('lastUserStorys'));
}

//Local storage for lastProjects-----------------------
if (!localStorage.getItem('lastProjects')) {
    setMyAglileStoryProjectStorage();
} else {
    getMyAglileStoryProjectStorage();
}

function setMyAglileStoryProjectStorage() {
    localStorage.setItem('lastProjects', JSON.stringify(myProjects));
}

function getMyAglileStoryProjectStorage() {
    myProjects = JSON.parse(localStorage.getItem('lastProjects'));
}

//Local storage for lastSelectedProject-----------------------
if (!localStorage.getItem('lastSelectedProject')) {
    setMyAglileStorylastSelectedProjectStorage();
} else {
    getMyAglileStorylastSelectedProjectStorage();
}

function setMyAglileStorylastSelectedProjectStorage() {
    localStorage.setItem('lastSelectedProject', myLastSelectedProject);
}

function getMyAglileStorylastSelectedProjectStorage() {
    myLastSelectedProject = localStorage.getItem('lastSelectedProject');
}

//Local storage for lastSelectedPhase-----------------------
if (!localStorage.getItem('lastSelectedPhase')) {
    setMyAglileStorylastSelectedPhaseStorage();
} else {
    getMyAglileStorylastSelectedPhaseStorage();
}

function setMyAglileStorylastSelectedPhaseStorage() {
    localStorage.setItem('lastSelectedPhase', myLastSelectedPhase);
}

function getMyAglileStorylastSelectedPhaseStorage() {
    myLastSelectedPhase = localStorage.getItem('lastSelectedPhase');
}

//Local storage for lastDeveloper-----------------------
if (!localStorage.getItem('lastDeveloper')) {
    setMyAglileStoryDeveloperStorage();
    loginMenu();
} else {
    getMyAglileStoryDeveloperStorage();
    if (Object.keys(myDeveloper).length === 0) {
        loginMenu();
    } else {
        loggedinMenu(myLastSelectedProject);
    }
}

function setMyAglileStoryDeveloperStorage() {
    localStorage.setItem('lastDeveloper', JSON.stringify(myDeveloper));
}

function getMyAglileStoryDeveloperStorage() {
    myDeveloper = JSON.parse(localStorage.getItem('lastDeveloper'));
}
