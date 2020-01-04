var myUpdateTimer;

function updateProjectInContext() {
    var myTime = Date(Date.now());
    if (myLastSelectedProject != 1) {
        //getProjects(myDeveloper, myLastSelectedProject, true);
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
    $('#message-dialog').modal('hide');
}

function updateStatusMessage(message) {
    document.getElementById('status-message').innerHTML = message;
    setTimeout(clearStatusMessage, 1500);
}

function updateStatusMessageNoClear(message) {
    document.getElementById('status-message').innerHTML = message;
}

function clearStatusMessage() {
    document.getElementById('status-message').innerHTML = '';
}

function updateLoginMessage(message) {
    document.getElementById('login-message').innerHTML = '<p>' + message + '</p>';
}

function updateDeveloperMessage(message) {
    document.getElementById('developer-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateEditDeveloperMessage(message) {
    document.getElementById('edit-developer-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateEditPasswordMessage(message) {
    document.getElementById('edit-password-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateProjectMessage(message) {
    document.getElementById('project-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateEditProjectMessage(message) {
    document.getElementById('edit-project-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateUserStoryMessage(message) {
    document.getElementById('user-story-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateEditUserStoryMessage(message) {
    document.getElementById('edit-user-story-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateBugMessage(message) {
    document.getElementById('bug-message').innerHTML =
        '<p>' + message + '</p>';
}

function updateEditBugMessage(message) {
    document.getElementById('edit-bug-message').innerHTML =
        '<p>' + message + '</p>';
}

$('#createNewUserStoryModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-body input.user-story-title').val('');
    modal.find('.modal-body input.user-story-user-role').val('');
    modal.find('.modal-body input.user-story-user-want').val('');
    modal.find('.modal-body input.user-story-user-benefit').val('');
    modal.find('.modal-body textarea.user-story-acceptance-criteria').val('');
    modal.find('.modal-body textarea.user-story-conversation').val('');
    modal.find('.modal-body input.user-story-estimate').val('0');
    modal.find('.modal-body input.user-story-priority').val('1');
    modal.find('.modal-body input.user-story-sprint').val('0');
    document.getElementById(`user-story-phase-` + 0).checked = true;
    modal.find('.modal-body input.user-story-percent-done').val('0');
    updateUserStoryMessage('');
});

$('#editUserStoryModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var myIndex = button.data('hc-index'); // Extract info from data-* attributes
    var modal = $(this);
    modal
        .find('.modal-body input.edit-user-story-title')
        .val(myUserStorys[myIndex].userStoryTitle);
    modal
        .find('.modal-body input.edit-user-story-user-role')
        .val(myUserStorys[myIndex].userRole);
    modal
        .find('.modal-body input.edit-user-story-user-want')
        .val(myUserStorys[myIndex].userWant);
    modal
        .find('.modal-body input.edit-user-story-user-benefit')
        .val(myUserStorys[myIndex].userBenefit);
    modal
        .find('.modal-body textarea.edit-user-story-acceptance-criteria')
        .val(myUserStorys[myIndex].acceptanceCriteria);
    modal
        .find('.modal-body textarea.edit-user-story-conversation')
        .val(myUserStorys[myIndex].conversation);
    modal
        .find('.modal-body input.edit-user-story-estimate')
        .val(myUserStorys[myIndex].estimate);
    if (
        myUserStorys[myIndex].phase === '' ||
        myUserStorys[myIndex].phase === 'null' ||
        myUserStorys[myIndex].phase === 'undefined'
    ) {
        myUserStorys[myIndex].phase = '0';
    }
    document.getElementById(
        `edit-user-story-phase-` + myUserStorys[myIndex].phase
    ).checked = true;
    modal
        .find('.modal-body input.edit-user-story-percent-done')
        .val(myUserStorys[myIndex].percentDone);
    modal
        .find('.modal-body input.edit-user-story-priority')
        .val(myUserStorys[myIndex].priority);
    modal
        .find('.modal-body input.edit-user-story-sprint')
        .val(myUserStorys[myIndex].sprint);
    let listHTML = `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML +=
        `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editUserStory(` +
        myIndex +
        `)">Save Changes</button>`;
    //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="splitUserStory(` + myIndex + `)">Split</button>`;
    //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="mergeUserStory(` + myIndex + `)">Merge</button>`;
    listHTML += ` </div>`;
    document.getElementById('edit-user-story-buttons').innerHTML = listHTML;

    document.getElementById('edit-vote').innerHTML = `<button type="button" class="btn btn-secondary voting-button" data-toggle="modal" data-target="#voteUserStoryModal" data-hc-index="` +
        myIndex +
        `"><i
    class="fas fa-vote-yea"></i></button>`;
    updateEditUserStoryMessage('');
});

function updateVoteResults(myIndex, showResults) {
    let listHTML = '';
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
        if (showResults) {
            if (myUserStorys[myIndex].votes[i].vote < 2000) {
                listHTML += myUserStorys[myIndex].votes[i].firstName + '\t' + myUserStorys[myIndex].votes[i].vote / 10 + '\n'
                myAverage += myUserStorys[myIndex].votes[i].vote / 10
                myVoteCount++;
            } else if (myUserStorys[myIndex].votes[i].vote === 2000) {
                listHTML += myUserStorys[myIndex].votes[i].firstName + '\t' + '?' + '\n'
            } else {
                listHTML += myUserStorys[myIndex].votes[i].firstName + '\t' + 'Coffee' + '\n'
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

function updateVoteBugResults(myIndex, showResults) {
    let listHTML = '';
    let myAverage = 0;
    let myVoteCount = 0;
    for (let i = 0; i < myBugs[myIndex].votes.length; i++) {
        if (showResults) {
            if (myBugs[myIndex].votes[i].vote < 2000) {
                listHTML += myBugs[myIndex].votes[i].firstName + '\t' + myBugs[myIndex].votes[i].vote / 10 + '\n'
                myAverage += myBugs[myIndex].votes[i].vote / 10
                myVoteCount++;
            } else if (myBugs[myIndex].votes[i].vote === 2000) {
                listHTML += myBugs[myIndex].votes[i].firstName + '\t' + '?' + '\n'
            } else {
                listHTML += myBugs[myIndex].votes[i].firstName + '\t' + 'Coffee' + '\n'
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

$('#voteUserStoryModal').on('show.bs.modal', function (event) {
    $('#editUserStoryModal').modal('hide');
    var button = $(event.relatedTarget); // Button that triggered the modal
    var myIndex = button.data('hc-index'); // Extract info from data-* attributes
    document.getElementById(
        `vote-0`
    ).checked = true;
    for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
        if (myUserStorys[myIndex].votes[i].developerId === myDeveloper._id) {
            try {
                document.getElementById(
                    `vote-` + myUserStorys[myIndex].votes[i].vote
                ).checked = true;
            } catch (error) {
                document.getElementById(
                    `vote-0`
                ).checked = true;
            }
            break;
        }
    }
    let listHTML = ''
    listHTML +=
        `<h5 class="card-title"><i class="fas fa-newspaper"></i> S` +
        myUserStorys[myIndex].sprint +
        ` - ` +
        myUserStorys[myIndex].userStoryTitle +
        `</h5>`;
    document.getElementById('vote-title').innerHTML = listHTML
    listHTML =
        `<p style = "padding: 0px 0px 0px 0px;">As a ` +
        myUserStorys[myIndex].userRole +
        `, I want ` +
        myUserStorys[myIndex].userWant +
        ` so that ` +
        myUserStorys[myIndex].userBenefit +
        `</p>`;

    document.getElementById('vote-summary').innerHTML = listHTML

    updateVoteResults(myIndex, false);

    listHTML = '';
    listHTML += `<div class="form-group row">`
    listHTML += `<div class="col-sm-11">`
    listHTML += `<button type="button" class="btn btn-secondary dialogButton" data-dismiss="modal">Close</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="addVoteUserStory(` + myIndex + `,false)">Vote</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="updateVoteResults(` + myIndex + `,true)">Results</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="editUserStoryEstimate(` + myIndex + `)">Commit</button>`
    listHTML += `</div>`
    listHTML += `</div>`
    document.getElementById('vote-buttons').innerHTML = listHTML;
    // updateEditUserStoryMessage('');
});

$('#voteBugModal').on('show.bs.modal', function (event) {
    $('#editBugModal').modal('hide');
    var button = $(event.relatedTarget); // Button that triggered the modal
    var myIndex = button.data('hc-index'); // Extract info from data-* attributes
    document.getElementById(
        `vote-bug-0`
    ).checked = true;
    for (let i = 0; i < myBugs[myIndex].votes.length; i++) {
        if (myBugs[myIndex].votes[i].developerId === myDeveloper._id) {
            try {
                document.getElementById(
                    `vote-bug-` + myBugs[myIndex].votes[i].vote
                ).checked = true;
            } catch (error) {
                document.getElementById(
                    `vote-bug-0`
                ).checked = true;
            }
            break;
        }
    }
    let listHTML = ''
    listHTML +=
        `<h5 class="card-title"><i class="fas fa-bug"></i> S` +
        myBugs[myIndex].sprint +
        ` - ` +
        myBugs[myIndex].bugTitle +
        `</h5>`;
    document.getElementById('vote-bug-title').innerHTML = listHTML
    listHTML =
        `<p style = "padding: 0px 0px 0px 0px;">` +
        myBugs[myIndex].summary +
        `</p>`;

    document.getElementById('vote-bug-summary').innerHTML = listHTML

    updateVoteBugResults(myIndex, false);

    listHTML = '';
    listHTML += `<div class="form-group row">`
    listHTML += `<div class="col-sm-11">`
    listHTML += `<button type="button" class="btn btn-secondary dialogButton" data-dismiss="modal">Close</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="addVoteBug(` + myIndex + `,false)">Vote</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="updateVoteBugResults(` + myIndex + `,true)">Results</button>`
    listHTML += `<button type="button" class="btn btn-primary dialogButton" onclick="editBugEstimate(` + myIndex + `)">Commit</button>`
    listHTML += `</div>`
    listHTML += `</div>`
    document.getElementById('vote-bug-buttons').innerHTML = listHTML;
    // updateEditUserStoryMessage('');
});

$('#createNewBugModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-body input.bug-title').val('');
    modal.find('.modal-body textarea.bug-summary').val('');
    modal.find('.modal-body textarea.bug-steps-to-reproduce').val('');
    modal.find('.modal-body textarea.bug-expected-results').val('');
    modal.find('.modal-body textarea.bug-actual-results').val('');
    modal.find('.modal-body textarea.bug-resolution').val('');
    modal.find('.modal-body textarea.bug-acceptance-criteria').val('');
    modal.find('.modal-body input.bug-estimate').val('0');
    modal.find('.modal-body input.bug-priority').val('1');
    modal.find('.modal-body input.bug-sprint').val('0');
    document.getElementById(`bug-phase-` + 0).checked = true;
    modal.find('.modal-body input.bug-percent-done').val('0');
    updateBugMessage('');
});

$('#editBugModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var myIndex = button.data('hc-index'); // Extract info from data-* attributes
    var modal = $(this);
    modal
        .find('.modal-body input.edit-bug-title')
        .val(myBugs[myIndex].bugTitle);
    modal
        .find('.modal-body textarea.edit-bug-summary')
        .val(myBugs[myIndex].summary);
    modal
        .find('.modal-body textarea.edit-bug-steps-to-reproduce')
        .val(myBugs[myIndex].stepsToReproduce);
    modal
        .find('.modal-body textarea.edit-bug-expected-results')
        .val(myBugs[myIndex].expectedResults);
    modal
        .find('.modal-body textarea.edit-bug-actual-results')
        .val(myBugs[myIndex].actualResults);
    modal
        .find('.modal-body textarea.edit-bug-resolution')
        .val(myBugs[myIndex].resolution);
    modal
        .find('.modal-body textarea.edit-bug-acceptance-criteria')
        .val(myBugs[myIndex].acceptanceCriteria);
    modal
        .find('.modal-body input.edit-bug-estimate')
        .val(myBugs[myIndex].estimate);
    if (
        myBugs[myIndex].phase === '' ||
        myBugs[myIndex].phase === 'null' ||
        myBugs[myIndex].phase === 'undefined'
    ) {
        myBugs[myIndex].phase = '0';
    }
    document.getElementById(
        `edit-bug-phase-` + myBugs[myIndex].phase
    ).checked = true;
    modal
        .find('.modal-body input.edit-bug-percent-done')
        .val(myBugs[myIndex].percentDone);
    modal
        .find('.modal-body input.edit-bug-priority')
        .val(myBugs[myIndex].priority);
    modal
        .find('.modal-body input.edit-bug-sprint')
        .val(myBugs[myIndex].sprint);
    let listHTML = `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML +=
        `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editBug(` +
        myIndex +
        `)">Save Changes</button>`;
    listHTML += ` </div>`;
    document.getElementById('edit-bug-buttons').innerHTML = listHTML;
    document.getElementById('edit-bug-vote').innerHTML = `<button type="button" class="btn btn-secondary  voting-button" data-toggle="modal" data-target="#voteBugModal" data-hc-index="` +
        myIndex +
        `"><i
class="fas fa-vote-yea"></i></button>`;
    updateEditBugMessage('');
});

$('#createNewDeveloperModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-body input.developer-email').val('');
    modal.find('.modal-body input.developer-password').val('');
    modal.find('.modal-body input.developer-first-name').val('');
    modal.find('.modal-body input.developer-last-name').val('');
    modal.find('.modal-body textarea.developer-bio').val('');
    updateDeveloperMessage('');
});

$('#editDeveloperModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var modal = $(this);
    modal.find('.modal-body input.edit-developer-email').val(myDeveloper.email);
    modal
        .find('.modal-body input.edit-developer-password')
        .val(myDeveloper.password);
    modal
        .find('.modal-body input.edit-developer-first-name')
        .val(myDeveloper.firstName);
    modal
        .find('.modal-body input.edit-developer-last-name')
        .val(myDeveloper.lastName);
    modal.find('.modal-body textarea.edit-developer-bio').val(myDeveloper.bio);
    updateEditDeveloperMessage('');
});

$('#createNewProjectModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-body input.project-name').val('');
    modal.find('.modal-body textarea.project-description').val('');
    updateProjectMessage('');
});

$('#editProjectModal').on('show.bs.modal', function (event) {
    var myProjectIndex = document.getElementById('select-project').value;
    var button = $(event.relatedTarget); // Button that triggered the modal
    var modal = $(this);
    modal
        .find('.modal-body input.edit-project-name')
        .val(myProjects[myProjectIndex].name);
    modal
        .find('.modal-body textarea.edit-project-description')
        .val(myProjects[myProjectIndex].description);
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML +=
        `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editProject(` +
        myProjectIndex +
        `)">Save Changes</button>`;
    document.getElementById('edit-project-buttons').innerHTML = listHTML;
    myProjectDevelopers = myProjects[myProjectIndex].developers;
    // start of code to update old developers
    let foundDeveloper = false;
    for (let i = 0; i < myProjectDevelopers.length; i++) {
        if (myDeveloper.email === myProjectDevelopers[i].email) {
            foundDeveloper = true;
            break;
        }
    };
    if (!foundDeveloper) {
        myProjectDevelopers.push({
            developerId: myDeveloper._id,
            canRead: true,
            canWrite: true,
            canAdmin: true,
            firstName: myDeveloper.firstName,
            lastName: myDeveloper.lastName,
            email: myDeveloper.email,
        });
    }
    // end of code to update old developers
    updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
    updateEditProjectMessage('');
});

function updateDevelopersInProject(myProjectIndex, myDevelopers) {
    listHTML = `<label class="col-sm-11 col-form-label my-modal-title">Add developer</label>`;
    listHTML += `<input type="text" class="col-sm-4 form-control edit-project-developer-email my-modal-edit-field"
        id="edit-project-developer-email" placeholder="developer email"></input>`;
    listHTML +=
        `<input type="checkbox" class="project-edit-permissions" id = "project-edit-permissions-read"><span class="project-edit-permissions-text">Read</span>`;
    listHTML +=
        `<input type="checkbox" class="project-edit-permissions" id = "project-edit-permissions-write"><span class="project-edit-permissions-text">Write</span>`;
    listHTML +=
        `<input type="checkbox" class="project-edit-permissions" id = "project-edit-permissions-admin"><span class="project-edit-permissions-text">Admin</span>`;
    listHTML +=
        `<button type="button" class="btn btn-primary voting-button" onclick="addDeveloperToProject(` +
        myProjectIndex +
        `)"><i class="fas fa-user-plus"></i></button>`;
    listHTML += `<label class="col-sm-11 col-form-label my-modal-title">Developers</label>`;
    listHTML += `<ul class="list-group col-sm-11 my-modal-edit-field">`;
    for (let i = 0; i < myDevelopers.length; i++) {
        let myPermissions = myDevelopers[i].canRead ? 'R' : '';
        myPermissions += myDevelopers[i].canWrite ? 'W' : '';
        myPermissions += myDevelopers[i].canAdmin ? 'A' : '';
        listHTML += `    <li class="list-group-item">` + myDevelopers[i].email + ' - ' + myPermissions +
            `<button type="button" class="btn-sm btn-secondary" onclick="removeDeveloperFromProject(` + myProjectIndex + `,` +
            i +
            `)" style="margin-left: .25rem; float: right;"><i class="fas fa-trash"></i></button>` +
            `<button type="button" class="btn-sm btn-secondary" onclick="editDeveloperInProject(` +
            i +
            `)" style="margin-left: 0rem;float: right;"><i class="fas fa-edit"></i></button>` +
            `</li>`;
    }
    listHTML += `</ul>`;
    document.getElementById('edit-project-developers').innerHTML = listHTML;
}


$('#loginModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-body input.login-email').val('');
    modal.find('.modal-body input.login-password').val('');
    updateLoginMessage('');
});

function showConfirmDeletePopup(functionName, functionValue, functionMessage) {
    let listHTML = '';
    listHTML = ` <i class = "fas fa-exclamation-triangle" ></i> Delete warning`;
    document.getElementById('confirm-delete-title').innerHTML = listHTML;
    listHTML =
        `You about to delete ` +
        functionMessage +
        `.  This process is irreversable are you sure?`;
    document.getElementById('confirm-delete-message').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>`;
    listHTML +=
        `<button type="button" class="btn btn-danger btn-ok" onclick="` +
        functionName +
        `(` +
        functionValue +
        `)">Delete</button>`;
    document.getElementById('confirm-delete-buttons').innerHTML = listHTML;
    $('#confirm-delete').modal('show');
}

function showErrorMessage(errorTitle, errorMessage) {
    let listHTML = '';
    listHTML = `<i class="fas fa-exclamation-triangle"></i> ` + errorTitle;
    document.getElementById('error-dialog-title').innerHTML = listHTML;
    if (errorMessage === "Token is not valid") {
        listHTML = 'Your session has expired login required';
        document.getElementById('error-dialog-message').innerHTML = listHTML;
        listHTML = `<button type="button" class="btn btn-primary" onClick = logoutAllSessionExpired()>OK</button>`;
        document.getElementById('error-dialog-buttons').innerHTML = listHTML;
        clearStatusMessage();
        clearLocalStorage()
        displayUserStoriesAndBugs()
        loginMenu();
        $('#createNewUserStoryModal').modal('hide');
        $('#editUserStoryModal').modal('hide');
        $('#voteUserStoryModal').modal('hide');
        $('#voteBugModal').modal('hide');
        $('#createNewBugModal').modal('hide');
        $('#editBugModal').modal('hide');
        $('#createNewDeveloperModal').modal('hide');
        $('#editDeveloperModal').modal('hide');
        $('#createNewProjectModal').modal('hide');
        $('#editProjectModal').modal('hide');
        $('#loginModal').modal('hide');
        $('#editPasswordModal').modal('hide');
    } else {
        listHTML = errorMessage;
        document.getElementById('error-dialog-message').innerHTML = listHTML;
        listHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>`;
        document.getElementById('error-dialog-buttons').innerHTML = listHTML;
    }
    $('#error-dialog').modal('show');
}

function logoutAllSessionExpired() {
    $('#error-dialog').modal('hide');
    $('#loginModal').modal('show');
}

function showChangePasswordDialog() {
    $('#editDeveloperModal').modal('hide');
    $('#editPasswordModal').modal('show');
}

$('#editPasswordModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var modal = $(this);
    modal.find('.modal-body input.edit-password-email').val(myDeveloper.email);
    modal
        .find('.modal-body input.edit-password-old-password')
        .val('');
    modal
        .find('.modal-body input.edit-password-new-password')
        .val('');
    updateEditDeveloperMessage('');
});

function loginMenu(statusMessage) {
    clearInterval(myUpdateTimer);
    let listHTML = '';
    listHTML = aboutUsDrowdown();
    document.getElementById('nav-bar-items').innerHTML = listHTML;
    listHTML = '';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    showVideo();
    hideBurnDownChart();
    displayUserStoriesAndBugs();
}

function showVideo() {
    var myVideo = 'https://www.youtube.com/embed/Nw9RbTWs_O0';
    let listHTML = '';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video-slash"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    listHTML = '<h4 class = "content-margin-at-top">';
    listHTML += 'Overview';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML +=
        'My Agile Story is a virtual Agile board that organizes user stories and bugs into four sections: to do, doing, verify and done.';
    listHTML += '</p>';
    listHTML += '<p>';
    listHTML +=
        'Add user story / bug cards, create sprints and measure your progress with a burn down chart.';
    listHTML += '</p>';
    listHTML += '<p>';
    listHTML +=
        'All information is saved on the cloud and updated automatically for each logged in user.  Your team can collaborate virtually, no need for post it notes.  Create your own account and have fun!';
    listHTML += '</p>';
    listHTML += '<h4>';
    listHTML += 'Button definitions, when signed out';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML +=
        '<button type="button" class="btn btn-primary button-primary-override"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '  Links  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fas fa-video-slash"></i></button>';
    listHTML += '  Hide help screen  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fas fa-video"></i></button>';
    listHTML += '  Show help screen  ';
    listHTML += '</row>';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-user-plus"></i></button>';
    listHTML += '  Register new user  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-sign-in-alt"></i></button>';
    listHTML += '  Sign in  ';
    listHTML += '</row>';
    listHTML += '</p>';
    listHTML += '<h4>';
    listHTML += 'Button definitions, when signed in';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML +=
        '<button type="button" class="btn btn-primary  button-primary-override"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '  Links  ';
    listHTML +=
        '<button type="button" class="btn btn-primary dialogButton  button-primary-override"><i class="fas fa-list"></i></button>';
    listHTML += '  To do  ';
    listHTML +=
        '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-running"></i></button>';
    listHTML += '  Doing / Sprint  ';
    listHTML +=
        '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-check"></i></button>';
    listHTML += '  Verify  ';
    listHTML +=
        '<button type="button" class="btn btn-primary dialogButton button-primary-override"><i class="fas fa-hands-helping"></i></button>';
    listHTML += '  Done  ';
    listHTML +=
        '<button type="button" class="btn btn-primary button-primary-override"><i class="fas fa-chart-bar"></i></button>';
    listHTML += '  Burndown Chart  ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<p>';
    listHTML += '<row>';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-project-diagram"></i></button>';
    listHTML += '  Create project  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-trash"></i></button>';
    listHTML += '  Delete project  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-edit"></i></button>';
    listHTML += '  Edit project  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-newspaper"></i></button>';
    listHTML += '  Create user story  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-bug"></i></button>';
    listHTML += '  Create bug  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-user-edit"></i></button>';
    listHTML += '  Edit User  ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-sign-out-alt"></i></button>';
    listHTML += '  Sign out  ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<h4>';
    listHTML += 'Button definitions, on user story / bug cards';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML += '<row>';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-trash"></i></button>';
    listHTML += '  Delete user story / bug ';
    listHTML +=
        '<button type="button" class="btn btn-light"><i class="fas fa-edit"></i></button>';
    listHTML += '  Edit user story / bug ';
    listHTML += '</row>';
    listHTML += '</p>';

    listHTML += '<h4>';
    listHTML += 'Video Instuctions';
    listHTML += '</h4>';
    listHTML += '<p>';
    listHTML +=
        'Watch the video below to get an overview and instructions for use.';
    listHTML += '</p>';
    listHTML += `<div style="position:relative; padding-bottom:56.25%; padding-top:30px; height:0; overflow:hidden;">`;
    listHTML +=
        `<iframe width="560" height="315" src="` +
        myVideo +
        `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style = "position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>`;
    listHTML += `</div>`;

    document.getElementById('myVideoInstructions').innerHTML = listHTML;
}

function hideVideo() {
    let listHTML = '';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="showVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    document.getElementById('myVideoInstructions').innerHTML = '';
}

function loggedinMenu(myProjectIndex) {
    document.getElementById('user-story-bug-elements').innerHTML = '';
    let listHTML = '';
    listHTML +=
        '   <select class="form-control select-project" id="select-project" onchange="selectProjectDropDownChanged()">';
    listHTML += '<div class="btn-group">';
    if (Number(myProjectIndex) === -1) {
        clearInterval(myUpdateTimer);
        listHTML += '       <option selected value = "-1" >Select Project</option>';
        for (var j = 0; j < myProjects.length; j++) {
            listHTML +=
                `<option value = "` + j + `">` + myProjects[j].name + `</option>`;
        }
    } else {
        clearInterval(myUpdateTimer);
        myUpdateTimer = setInterval(updateProjectInContext, 5000);
        listHTML += '       <option value = "-1" >Select Project</option>';
        for (var j = 0; j < myProjects.length; j++) {
            if (j === Number(myProjectIndex)) {
                listHTML +=
                    `<option selected value = "` +
                    j +
                    `">` +
                    myProjects[j].name +
                    `</option>`;
            } else {
                listHTML +=
                    `<option value = "` + j + `">` + myProjects[j].name + `</option>`;
            }
        }
    }
    listHTML += '   </div>';
    listHTML += '   </select>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewProjectModal" data-hc-index=""><i class="fas fa-project-diagram"></i></button>';
    if (Number(myProjectIndex) != -1) {
        listHTML +=
            '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="deleteProjectSetup()" data-hc-index=""><i class="fas fa-trash"></i></button>';
        listHTML +=
            '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editProjectModal" data-hc-index=""><i class="fas fa-edit"></i></button>';
        listHTML +=
            '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewUserStoryModal" data-hc-index=""><i class="fas fa-newspaper"></i></button>';
        listHTML +=
            '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewBugModal" data-hc-index=""><i class="fas fa-bug"></i></button>';
    }
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editDeveloperModal" data-hc-index=""><i class="fas fa-user-edit"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
    document.getElementById('footer-items').innerHTML = listHTML;
    listHTML = aboutUsDrowdown();
    listHTML +=
        '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(0)" data-hc-index=""><i class="fas fa-list"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(1)" data-hc-index=""><i class="fas fa-running"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(2)" data-hc-index=""><i class="fas fa-check"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(3)" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
    listHTML +=
        '    <button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(4)" data-hc-index=""><i class="fas fa-chart-bar"></i></button>';
    displayUserStoriesAndBugs();
    document.getElementById('nav-bar-items').innerHTML = listHTML;
    document.getElementById('myVideoInstructions').innerHTML = '';
}

function displayUserStoriesAndBugs() {
    let listHTML = `<div class ="row user-story-div">`;
    if (myLastSelectedPhase === 4) {
        showBurnDownChart();
    } else {
        let userStoryIndex = 0;
        let bugIndex = 0
        for (let priorityNumb = 1; priorityNumb < 11; priorityNumb++) {
            if (myLastSelectedProject != -1) {
                for (let i = userStoryIndex; i < myUserStorys.length; i++) {
                    if (myUserStorys[i].priority === priorityNumb) {
                        listHTML += displayUserStory(i);
                        userStoryIndex = i;
                    }
                }
            }
            if (myLastSelectedProject != -1) {
                for (let i = bugIndex; i < myBugs.length; i++) {
                    if (myBugs[i].priority === priorityNumb) {
                        listHTML += displayBug(i);
                        bugIndex = i;
                    }
                }
            }
        }
        listHTML += `</div>`;
        document.getElementById('user-story-bug-elements').innerHTML = listHTML;
    }
}

function displayUserStory(i) {
    let listHTML = '';
    if (parseInt(myUserStorys[i].phase) === parseInt(myLastSelectedPhase)) {
        listHTML += `<div class ="col col-user-story-card">`;
        listHTML += `   <div class="card user-story-card">`;
        listHTML += `       <div class="card-body">`;
        listHTML +=
            `           <h5 class="card-title"><i class="fas fa-newspaper"></i> S` +
            myUserStorys[i].sprint +
            ` - ` +
            myUserStorys[i].userStoryTitle +
            `</h5>`;
        listHTML +=
            `           <p class="card-text" style = "padding: 0px 0px 0px 0px;">As a ` +
            myUserStorys[i].userRole +
            `, I want ` +
            myUserStorys[i].userWant +
            ` so that ` +
            myUserStorys[i].userBenefit +
            `</p>`;
        listHTML += `           <div class="row">`;
        listHTML += `               <div class="col-11">`;
        listHTML += `                   <div class="progress">`;
        listHTML +=
            `                       <div class="progress-bar" role="progressbar" style="width: ` +
            myUserStorys[i].percentDone +
            `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">` +
            myUserStorys[i].percentDone +
            `%</div>`;
        listHTML += `                   </div>`;
        listHTML += `               </div>`;
        listHTML +=
            `               <div class="col-1" style = "padding: 0px; margin-left: -10px; margin-top: -4px;">` +
            myUserStorys[i].estimate +
            `</div>`;
        listHTML += `           </div>`;
        listHTML += `       </div>`;
        listHTML += `       <div class="row" style="margin:auto;">`;
        listHTML +=
            `           <button type="button" class="btn btn-secondary dialogButton" data-toggle="modal" data-target="#editUserStoryModal" data-hc-index="` +
            i +
            `"><i class="fas fa-edit"></i></button>`;
        listHTML +=
            `           <button type="button" class="btn btn-secondary dialogButton" onclick ="deleteUserStorySetup(` +
            i +
            `)"><i class="fas fa-trash"></i></button>`;

        switch (myUserStorys[i].phase) {
            case '0':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
                    i +
                    `)"><i class="fas fa-running"></i></button>`;
                break;
            case '1':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
                    i +
                    `)"><i class="fas fa-check"></i></button>`;
                break;
            case '2':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
                    i +
                    `)"><i class="fas fa-hands-helping"></i></button>`;
                break;
            default:
                break;
        }
        listHTML +=
            `           <input select id="user-story-priority-slider-` +
            i +
            `" type="range" min="1" max="10" value="` +
            myUserStorys[i].priority +
            `" onchange="editUserStoryPriority(` +
            i +
            `)">`;
        listHTML += `       </div>`;
        listHTML += `   </div>`;
        listHTML += `</div>`;
    }
    return listHTML;
}

function displayBug(i) {
    let listHTML = '';
    if (parseInt(myBugs[i].phase) === parseInt(myLastSelectedPhase)) {
        listHTML += `<div class ="col col-user-story-card">`;
        listHTML += `   <div class="card user-story-card">`;
        listHTML += `       <div class="card-body">`;
        listHTML +=
            `           <h5 class="card-title"><i class="fas fa-bug"></i> S` +
            myBugs[i].sprint +
            ` - ` +
            myBugs[i].bugTitle +
            `</h5>`;
        listHTML +=
            `           <p class="card-text" style = "padding: 0px 0px 0px 0px;">` +
            myBugs[i].summary +
            `</p>`;
        listHTML += `           <div class="row">`;
        listHTML += `               <div class="col-11">`;
        listHTML += `                   <div class="progress">`;
        listHTML +=
            `                       <div class="progress-bar" role="progressbar" style="width: ` +
            myBugs[i].percentDone +
            `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">` +
            myBugs[i].percentDone +
            `%</div>`;
        listHTML += `                   </div>`;
        listHTML += `               </div>`;
        listHTML +=
            `               <div class="col-1" style = "padding: 0px; margin-left: -10px; margin-top: -4px;">` +
            myBugs[i].estimate +
            `</div>`;
        listHTML += `           </div>`;
        listHTML += `       </div>`;
        listHTML += `       <div class="row" style="margin:auto;">`;
        listHTML +=
            `           <button type="button" class="btn btn-secondary dialogButton" data-toggle="modal" data-target="#editBugModal" data-hc-index="` +
            i +
            `"><i class="fas fa-edit"></i></button>`;
        listHTML +=
            `           <button type="button" class="btn btn-secondary dialogButton" onclick ="deleteBugSetup(` +
            i +
            `)"><i class="fas fa-trash"></i></button>`;

        switch (myBugs[i].phase) {
            case '0':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
                    i +
                    `)"><i class="fas fa-running"></i></button>`;
                break;
            case '1':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
                    i +
                    `)"><i class="fas fa-check"></i></button>`;
                break;
            case '2':
                listHTML +=
                    `           <button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
                    i +
                    `)"><i class="fas fa-hands-helping"></i></button>`;
                break;
            default:
                break;
        }
        listHTML +=
            `           <input select id="bug-priority-slider-` +
            i +
            `" type="range" min="1" max="10" value="` +
            myBugs[i].priority +
            `" onchange="editBugPriority(` +
            i +
            `)">`;
        listHTML += `       </div>`;
        listHTML += `   </div>`;
        listHTML += `</div>`;
    }
    return listHTML;
}

function clearLocalStorage() {
    localStorage.removeItem('lastDeveloper');
    localStorage.removeItem('lastProjects');
    localStorage.removeItem('lastUserStorys');
    localStorage.removeItem('lastBugs');
    localStorage.removeItem('token');
    myDeveloper = {};
    myProjects = [];
    myUserStorys = [];
    myBugs = [];
    myToken = '';
}

function logoutAll() {
    clearLocalStorage()
    displayUserStoriesAndBugs()
    showPopupMessage(
        'Good bye ' + myDeveloper.firstName + ' thanks for visiting!'
    );
    loginMenu();
}

function aboutUsDrowdown() {
    let listHTML = '';
    listHTML += '<div class="btn-group">';
    listHTML +=
        '   <button type="button" class="btn btn-primary dialogButton dropdown-toggle button-primary-override-dropdown" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '   <div class="dropdown-menu">';
    listHTML +=
        '       <a class="dropdown-item" href="https://jimmysoftllc.com" target="_blank">JimmySoft LLC</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://embroiderywaresoftware.com" target="_blank">EmbroideryWare</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://www.heatercalc.com" target="_blank">Heater Calc</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://www.weathermany.com" target="_blank">Weather Many</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://www.mydynamodb.com" target="_blank">myDynamoDB</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://www.mysoftwarejourney.com" target="_blank">Blog</a>';
    listHTML +=
        '       <a class="dropdown-item" href="https://www.youtube.com/channel/UCBjCjqpPynS3grLinevnAPA?view_as=subscriber" target="_blank">Videos</a>';
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

//Local storage for lastBugs-----------------------
if (!localStorage.getItem('lastBugs')) {
    setMyAglileStoryBugStorage();
} else {
    getMyAglileStoryBugStorage();
}

function setMyAglileStoryBugStorage() {
    localStorage.setItem('lastBugs', JSON.stringify(myBugs));
}

function getMyAglileStoryBugStorage() {
    myBugs = JSON.parse(localStorage.getItem('lastBugs'));
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

//Local storage for token-----------------------
if (!localStorage.getItem('token')) {
    setMyAglileStoryTokenStorage();
} else {
    getMyAglileStoryTokenStorage();
}

function setMyAglileStoryTokenStorage() {
    localStorage.setItem('token', JSON.stringify(myToken));
}

function getMyAglileStoryTokenStorage() {
    myToken = JSON.parse(localStorage.getItem('token'));
}