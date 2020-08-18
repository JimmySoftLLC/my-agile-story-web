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
    .find('.modal-body input.edit-developer-first-name')
    .val(myDeveloper.firstName);
  modal
    .find('.modal-body input.edit-developer-last-name')
    .val(myDeveloper.lastName);
  modal.find('.modal-body textarea.edit-developer-bio').val(myDeveloper.bio);
  let listHTML = '';
  if (myDeveloper.email === 'demouser@anywhere.com') {
    listHTML += `<div class="form-group row">`;
    listHTML += `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
  } else {
    listHTML += `<div class="form-group row">`;
    listHTML += `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editDeveloper()">Save Changes</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="showChangePasswordDialog()">Change Password</button>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
  }
  document.getElementById('editDeveloperButtons').innerHTML = listHTML;
  updateEditDeveloperMessage('');
});

function showChangePasswordDialog() {
  $('#editDeveloperModal').modal('hide');
  $('#editPasswordModal').modal('show');
}

$('#editPasswordModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  modal.find('.modal-body input.edit-password-email').val(myDeveloper.email);
  modal.find('.modal-body input.edit-password-old-password').val('');
  modal.find('.modal-body input.edit-password-new-password').val('');
  updateEditDeveloperMessage('');
});
