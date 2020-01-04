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

// module.exports = {
//     showPopupMessage: showPopupMessage,
//     showPopupMessageNoClear: showPopupMessageNoClear,
//     hidePopupMessage: hidePopupMessage,
//     updateStatusMessage: updateStatusMessage,
//     updateStatusMessageNoClear: updateStatusMessageNoClear,
//     clearStatusMessage: clearStatusMessage,
//     updateLoginMessage: updateLoginMessage,
//     updateDeveloperMessage: updateDeveloperMessage,
//     updateEditDeveloperMessage: updateEditDeveloperMessage,
//     updateEditPasswordMessage: updateEditPasswordMessage,
//     updateProjectMessage: updateProjectMessage,
//     updateEditProjectMessage: updateEditProjectMessage,
//     updateUserStoryMessage: updateUserStoryMessage,
//     updateEditUserStoryMessage: updateEditUserStoryMessage,
//     updateBugMessage: updateBugMessage,
//     updateEditBugMessage: updateEditBugMessage,
// };