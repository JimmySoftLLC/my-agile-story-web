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

function updateDevelopersInProject(myProjectIndex, myDevelopers) {
    let canAdmin = false;
    let privilegeLevel = developerHighestPrivilege(myProjectIndex)
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
        id="edit-project-developer-email" placeholder="developer email"></input>`;
        listHTML +=
            `<input type="checkbox" class="project-edit-permissions" id = "project-edit-permissions-write"><span class="project-edit-permissions-text">Write</span>`;
        listHTML +=
            `<input type="checkbox" class="project-edit-permissions" id = "project-edit-permissions-admin"><span class="project-edit-permissions-text">Admin</span>`;
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
        listHTML += `    <li class="list-group-item">` + myDevelopers[i].email + ' - ' + myPermissions;
        if (privilegeLevel === 'A') {
            listHTML += `<button type="button" class="btn-sm btn-secondary" onclick="removeDeveloperFromProject(` +
                myProjectIndex + `,` + i +
                `)" style="margin-left: .25rem; float: right;"><i class="fas fa-trash"></i></button>` +
                `<button type="button" class="btn-sm btn-secondary" onclick="editDeveloperInProject(` +
                myProjectIndex + ',' + i +
                `)" style="margin-left: 0rem;float: right;"><i class="fas fa-edit"></i></button>` +
                `</li>`;
        }
    }
    listHTML += `</ul>`;
    document.getElementById('edit-project-developers').innerHTML = listHTML;
}

function showChangePasswordDialog() {
    $('#editDeveloperModal').modal('hide');
    $('#editPasswordModal').modal('show');
}

function editDeveloperProjectPermissions(myProjectIndex, myDeveloperIndex) {
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML +=
        `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="updateDeveloperPermission(` +
        myProjectIndex + `,` + myDeveloperIndex +
        `)">Save Changes</button>`;
    document.getElementById('edit-developer-project-permissions-buttons').innerHTML = listHTML;
    listHTML =
        `<input type="checkbox" class="project-edit-permissions" id = "edit-project-permissions-write"><span class="project-edit-permissions-text">Write</span>`;
    listHTML +=
        `<input type="checkbox" class="project-edit-permissions" id = "edit-project-permissions-admin"><span class="project-edit-permissions-text">Admin</span>`;
    document.getElementById('edit-developer-project-permissions').innerHTML = listHTML;
    document.getElementById(`edit-project-permissions-write`).checked = myProjectDevelopers[myDeveloperIndex].canWrite;
    document.getElementById(`edit-project-permissions-admin`).checked = myProjectDevelopers[myDeveloperIndex].canAdmin;
    $('#editDeveloperProjectPermissionsModal').modal('show');
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