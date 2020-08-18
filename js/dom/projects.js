$('#createNewProjectModal').on('show.bs.modal', function (event) {
  var modal = $(this);
  modal.find('.modal-body input.project-name').val('');
  modal.find('.modal-body textarea.project-description').val('');
  updateProjectMessage('');
});

$('#editProjectModal').on('show.bs.modal', function (event) {
  var myProjectIndex = document.getElementById('selectProject').value;
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
  document.getElementById('editProjectButtons').innerHTML = listHTML;

  myProjectDevelopers = JSON.parse(
    JSON.stringify(myProjects[myProjectIndex].developers)
  );

  // start of code to update old developers
  let foundDeveloper = false;
  for (let i = 0; i < myProjectDevelopers.length; i++) {
    if (myDeveloper.email === myProjectDevelopers[i].email) {
      foundDeveloper = true;
      break;
    }
  }
  if (!foundDeveloper) {
    myProjectDevelopers.push({
      developerId: myDeveloper._id,
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
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  for (let i = 0; i < myDevelopers.length; i++) {
    if (myDevelopers[i].email === myDeveloper.email) {
      canAdmin = myDevelopers[i].canAdmin;
      break;
    }
  }
  let listHTML = '';
  if (privilegeLevel === 'A') {
    listHTML = `<label class="col-sm-11 col-form-label my-modal-title">Add developer</label>`;
    listHTML += `<input type="text" class="col-sm-4 form-control edit-project-developer-email my-modal-edit-field"
        id="editProjectDeveloperEmail" placeholder="developer email"></input>`;
    listHTML += `<input type="checkbox" class="edit-permissions" id = "projectEditPermissionsWrite"><span class="edit-permissions-text">Write</span>`;
    listHTML += `<input type="checkbox" class="edit-permissions" id = "projectEditPermissionsAdmin"><span class="edit-permissions-text">Admin</span>`;
    listHTML +=
      `<button type="button" class="btn btn-primary voting-button" onclick="addDeveloperToProject(` +
      myProjectIndex +
      `)"><i class="fas fa-user-plus"></i></button>`;
  }
  listHTML += `<label class="col-sm-11 col-form-label my-modal-title">Developers</label>`;
  listHTML += `<ul class="list-group col-sm-11 my-modal-edit-field">`;
  for (let i = 0; i < myDevelopers.length; i++) {
    let myPermissions = myDevelopers[i].canWrite ? 'W' : '';
    myPermissions += myDevelopers[i].canAdmin ? 'A' : '';
    listHTML +=
      `    <li class="list-group-item">` +
      myDevelopers[i].firstName +
      ' ' +
      myDevelopers[i].lastName +
      ' - ' +
      myPermissions;
    if (privilegeLevel === 'A') {
      listHTML +=
        `<button type="button" class="btn-sm btn-secondary" onclick="removeDeveloperFromProject(` +
        myProjectIndex +
        `,` +
        i +
        `)" style="margin-left: .25rem; float: right;"><i class="fas fa-trash"></i></button>` +
        `<button type="button" class="btn-sm btn-secondary" onclick="editDeveloperProjectPermissions(` +
        myProjectIndex +
        ',' +
        i +
        `)" style="margin-left: 0rem;float: right;"><i class="fas fa-edit"></i></button>` +
        `</li>`;
    }
  }
  listHTML += `</ul>`;
  document.getElementById('editProjectDevelopers').innerHTML = listHTML;
}

function editDeveloperProjectPermissions(myProjectIndex, myDeveloperIndex) {
  let listHTML = '';
  listHTML =
    myProjectDevelopers[myDeveloperIndex].firstName +
    ' ' +
    myProjectDevelopers[myDeveloperIndex].lastName +
    '    ';
  listHTML += `<input type="checkbox" class="edit-permissions" id = "editProjectPermissionsWrite"><span class="edit-permissions-text">Write</span>`;
  listHTML += `<input type="checkbox" class="edit-permissions" id = "editProjectPermissionsAdmin"><span class="edit-permissions-text">Admin</span>`;
  document.getElementById(
    'editDeveloperProjectPermissions'
  ).innerHTML = listHTML;
  document.getElementById(`editProjectPermissionsWrite`).checked =
    myProjectDevelopers[myDeveloperIndex].canWrite;
  document.getElementById(`editProjectPermissionsAdmin`).checked =
    myProjectDevelopers[myDeveloperIndex].canAdmin;
  listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  listHTML +=
    `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="updateDeveloperProjectPermission(` +
    myProjectIndex +
    `,` +
    myDeveloperIndex +
    `)">Save Changes</button>`;
  document.getElementById(
    'editDeveloperProjectPermissionsButtons'
  ).innerHTML = listHTML;

  $('#editDeveloperProjectPermissionsModal').modal('show');
}
