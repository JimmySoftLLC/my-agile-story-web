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
