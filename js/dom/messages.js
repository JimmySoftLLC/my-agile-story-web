function showPopupMessage(message) {
  document.getElementById('popupMessage').innerHTML = message;
  $('#messageDialogModal').modal('show');
  setTimeout(hidePopupMessage, 1500);
}

function showPopupMessageNoClear(message) {
  document.getElementById('popupMessage').innerHTML = message;
  $('#messageDialogModal').modal('show');
}

function hidePopupMessage() {
  $('#messageDialogModal').modal('hide');
}

function updateStatusMessage(message) {
  document.getElementById('statusMessage').innerHTML = message;
  setTimeout(clearStatusMessage, 1500);
}

function updateStatusMessageNoClear(message) {
  document.getElementById('statusMessage').innerHTML = message;
}

function clearStatusMessage() {
  document.getElementById('statusMessage').innerHTML = '';
}

function updateLoginMessage(message) {
  document.getElementById('loginMessage').innerHTML = '<p>' + message + '</p>';
}

function updateDeveloperMessage(message) {
  document.getElementById('developerMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateEditDeveloperMessage(message) {
  document.getElementById('editDeveloperMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateEditPasswordMessage(message) {
  document.getElementById('editPasswordMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateProjectMessage(message) {
  document.getElementById('projectMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateEditProjectMessage(message) {
  document.getElementById('editProjectMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateUserStoryMessage(message) {
  document.getElementById('userStoryMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateEditUserStoryMessage(message) {
  document.getElementById('editUserStoryMessage').innerHTML =
    '<p>' + message + '</p>';
}

function updateBugMessage(message) {
  document.getElementById('bugMessage').innerHTML = '<p>' + message + '</p>';
}

function updateEditBugMessage(message) {
  document.getElementById('editBugMessage').innerHTML =
    '<p>' + message + '</p>';
}

function showConfirmDeletePopup(functionName, functionValue, functionMessage) {
  let listHTML = '';
  listHTML = `<i class = "fas fa-exclamation-triangle" ></i> Delete warning`;
  document.getElementById('confirmDeleteModalTitle').innerHTML = listHTML;
  listHTML =
    `You about to delete ` +
    functionMessage +
    `.  This process is irreversable are you sure?`;
  document.getElementById('confirmDeleteModalMessage').innerHTML = listHTML;
  listHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>`;
  listHTML +=
    `<button type="button" class="btn btn-danger btn-ok" onclick="` +
    functionName +
    `(` +
    functionValue +
    `)">Delete</button>`;
  document.getElementById('confirmDeleteModalButtons').innerHTML = listHTML;
  $('#confirmDeleteModal').modal('show');
}

function showErrorMessage(errorTitle, errorMessage) {
  let listHTML = '';
  listHTML = `<i class="fas fa-exclamation-triangle"></i> ` + errorTitle;
  document.getElementById('errorDialogModalTitle').innerHTML = listHTML;
  if (errorMessage === 'Token is not valid') {
    listHTML = 'Your session has expired login required';
    document.getElementById('errorDialogModalMessage').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-primary" onClick = logoutAllSessionExpired()>OK</button>`;
    document.getElementById('errorDialogModalButtons').innerHTML = listHTML;
    clearStatusMessage();
    clearLocalStorage();
    displayUserStoriesAndBugs();
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
    document.getElementById('errorDialogModalMessage').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>`;
    document.getElementById('errorDialogModalButtons').innerHTML = listHTML;
  }
  $('#errorDialogModal').modal('show');
}

function hideAllDialogs() {
  $('#createNewDeveloperModal').modal('hide');
  $('#editDeveloperModal').modal('hide');
  $('#editPasswordModal').modal('hide');
  $('#voteUserStoryModal').modal('hide');
  $('#voteBugModal').modal('hide');
  $('#createNewProjectModal').modal('hide');
  $('#editProjectModal').modal('hide');
  $('#editDeveloperProjectPermissionsModal').modal('hide');
  $('#createNewUserStoryModal').modal('hide');
  $('#editUserStoryModal').modal('hide');
  $('#createNewBugModal').modal('hide');
  $('#editBugModal').modal('hide');
  $('#loginModal').modal('hide');
  $('#confirmDeleteModal').modal('hide');
  $('#errorDialogModal').modal('hide');
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
