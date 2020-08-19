$('#voteBugModal').on('show.bs.modal', function (event) {
  $('#editBugModal').modal('hide');
  var button = $(event.relatedTarget); // Button that triggered the modal
  var myIndex = button.data('hc-index'); // Extract info from data-* attributes
  document.getElementById(`voteBug0`).checked = true;
  for (let i = 0; i < myBugs[myIndex].votes.length; i++) {
    if (myBugs[myIndex].votes[i].developerId === myDeveloper._id) {
      try {
        document.getElementById(
          `voteBug` + myBugs[myIndex].votes[i].vote
        ).checked = true;
      } catch (error) {
        document.getElementById(`voteBug0`).checked = true;
      }
      break;
    }
  }
  let listHTML = '';
  listHTML +=
    `<h5 class="card-title"><i class="fas fa-bug"></i> S` +
    myBugs[myIndex].sprint +
    ` - ` +
    myBugs[myIndex].bugTitle +
    `</h5>`;
  document.getElementById('voteBugTitle').innerHTML = listHTML;
  listHTML =
    `<p style = "padding: 0px 0px 0px 0px;">` +
    myBugs[myIndex].summary +
    `</p>`;

  document.getElementById('voteBugSummary').innerHTML = listHTML;

  updateVoteBugResults(myIndex, false);

  listHTML = '';
  listHTML += `<div class="form-group row">`;
  listHTML += `<div class="col-sm-11">`;
  listHTML += `<button type="button" class="btn btn-secondary dialogButton" data-dismiss="modal">Close</button>`;
  listHTML +=
    `<button type="button" class="btn btn-primary dialogButton" onclick="addVoteBug(` +
    myIndex +
    `,false)">Vote</button>`;
  var myProjectIndex = document.getElementById('selectProject').value;
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  if (privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="updateVoteBugResults(` +
      myIndex +
      `,true)">Results</button>`;
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="editBugEstimate(` +
      myIndex +
      `)">Commit</button>`;
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="deleteVotesBug(` +
      myIndex +
      `)">Clear</button>`;
  }
  listHTML += `</div>`;
  listHTML += `</div>`;
  document.getElementById('voteBugButtons').innerHTML = listHTML;
  // updateEditBugMessage('');
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
  document.getElementById(`bugPhase` + 0).checked = true;
  modal.find('.modal-body input.bug-percent-done').val('0');
  updateBugMessage('');
});

$('#editBugModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var myIndex = button.data('hc-index'); // Extract info from data-* attributes
  var modal = $(this);
  var myProjectIndex = document.getElementById('selectProject').value;
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  modal.find('.modal-body input.edit-bug-title').val(myBugs[myIndex].bugTitle);
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
    .find('.modal-body textarea.editBugActualResults')
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
    `editBugPhase` + myBugs[myIndex].phase
  ).checked = true;
  modal
    .find('.modal-body input.edit-bug-percent-done')
    .val(myBugs[myIndex].percentDone);
  modal
    .find('.modal-body input.edit-bug-priority')
    .val(myBugs[myIndex].priority);
  modal.find('.modal-body input.edit-bug-sprint').val(myBugs[myIndex].sprint);
  let listHTML = `<div class="col-sm-11">`;
  listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  if (privilegeLevel === 'W' || privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editBug(` +
      myIndex +
      `)">Save Changes</button>`;
  }
  listHTML += ` </div>`;
  document.getElementById('editBugButtons').innerHTML = listHTML;
  listHTML = '';
  if (privilegeLevel === 'W' || privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-secondary  voting-button" data-toggle="modal" data-target="#voteBugModal" data-hc-index="` +
      myIndex +
      `"><i class="fas fa-vote-yea"></i></button>`;
  }
  document.getElementById('editBugVote').innerHTML = listHTML;
  updateDevelopersInBug(myIndex, myProjectIndex);
  updateEditBugMessage('');
});

function displayBug(i, myProjectIndex) {
  let listHTML = '';
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  let myTeam = '';
  if (parseInt(myBugs[i].phase) === parseInt(myLastSelectedPhase)) {
    let foundFirstOne = false;
    for (let j = 0; j < myBugs[i].developers.length; j++) {
      let showIt = false;
      switch (myLastSelectedPhase) {
        case 0:
          break;
        case 1:
          if (myBugs[i].developers[j].canDevelop) {
            showIt = true;
          }
          break;
        case 2:
          if (myBugs[i].developers[j].canVerify) {
            showIt = true;
          }
          break;
        case 3:
          if (myBugs[i].developers[j].canRelease) {
            showIt = true;
          }
          break;
        default:
          break;
      }
      if (showIt) {
        if (foundFirstOne) {
          myTeam += ', ';
        }
        foundFirstOne = true;
        myTeam +=
          myBugs[i].developers[j].firstName +
          ` ` +
          myBugs[i].developers[j].lastName;
      }
    }
    listHTML += `<div class ="col col-user-story-card">`;
    listHTML += `<div class="card user-story-card">`;
    listHTML += `<div class="card-body">`;
    listHTML +=
      `<h5 class="card-title"><i class="fas fa-bug"></i> S` +
      myBugs[i].sprint +
      ` - ` +
      myBugs[i].bugTitle +
      `</h5>`;
    listHTML +=
      `<p class="card-text" style = "padding: 0px 0px 0px 0px;">` +
      myBugs[i].summary +
      `</p>`;

    listHTML +=
      `<p class="card-text" style = "padding: 0px 0px 0px 0px;">` +
      myTeam +
      `</p>`;

    listHTML += `<div class="row">`;
    listHTML += `<div class="col-11">`;
    listHTML += `<div class="progress">`;
    listHTML +=
      `<div class="progress-bar" role="progressbar" style="width: ` +
      myBugs[i].percentDone +
      `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">` +
      myBugs[i].percentDone +
      `%</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML +=
      `<div class="col-1" style = "padding: 0px; margin-left: -10px; margin-top: -4px;">` +
      myBugs[i].estimate +
      `</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML += `<div class="row" style="margin:auto;">`;
    listHTML +=
      `<button type="button" class="btn btn-secondary dialogButton" data-toggle="modal" data-target="#editBugModal" data-hc-index="` +
      i +
      `"><i class="fas fa-edit"></i></button>`;
    if (privilegeLevel === 'A') {
      listHTML +=
        `<button type="button" class="btn btn-secondary dialogButton" onclick ="deleteBugSetup(` +
        i +
        `)"><i class="fas fa-trash"></i></button>`;
    }
    if (privilegeLevel === 'W' || privilegeLevel === 'A') {
      switch (myBugs[i].phase) {
        case '0':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
            i +
            `)"><i class="fas fa-running"></i></button>`;
          break;
        case '1':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
            i +
            `)"><i class="fas fa-check"></i></button>`;
          break;
        case '2':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveBugToNextPhase(` +
            i +
            `)"><i class="fas fa-hands-helping"></i></button>`;
          break;
        default:
          break;
      }
      listHTML +=
        `<input select id="bugPrioritySlider` +
        i +
        `" type="range" min="1" max="10" value="` +
        myBugs[i].priority +
        `" onchange="editBugPriority(` +
        i +
        `)">`;
    }

    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
  }
  return listHTML;
}

function updateDevelopersInBug(myBugIndex, myProjectIndex) {
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  let listHTML = '';
  if (privilegeLevel === 'A') {
    listHTML = `<label class="col-sm-11 col-form-label my-modal-title">Add developer</label>`;

    //console.log(myProjects)

    listHTML +=
      '<select class="col-sm-4 form-control edit-project-developer-email my-modal-edit-field" id="selectedBugDeveloper" onchange="">';
    listHTML += '<div class="btn-group">';

    listHTML += '<option selected value = "-1" >Select Developer</option>';
    for (var j = 0; j < myProjects[myProjectIndex].developers.length; j++) {
      listHTML +=
        `<option value = "` +
        j +
        `">` +
        myProjects[myProjectIndex].developers[j].firstName +
        ` ` +
        myProjects[myProjectIndex].developers[j].lastName +
        `</option>`;
    }

    listHTML += '</div>';
    listHTML += '</select>';

    listHTML += `<input type="checkbox" class="edit-permissions" id = "BugPermissionsDevelop"><span class="edit-permissions-text">Dev</span>`;
    listHTML += `<input type="checkbox" class="edit-permissions" id = "BugPermissionsVerify"><span class="edit-permissions-text">Verify</span>`;
    listHTML += `<input type="checkbox" class="edit-permissions" id = "BugPermissionsRelease"><span class="edit-permissions-text">Release</span>`;
    listHTML +=
      `<button type="button" class="btn btn-primary voting-button" onclick="addDeveloperToBug(` +
      myBugIndex +
      `,` +
      myProjectIndex +
      `)"><i class="fas fa-user-plus"></i></button>`;
  }
  listHTML += `<label class="col-sm-11 col-form-label my-modal-title">Developers</label>`;
  listHTML += `<ul class="list-group col-sm-11 my-modal-edit-field">`;
  console.log(myBugs);
  for (let i = 0; i < myBugs[myBugIndex].developers.length; i++) {
    let myPermissions = myBugs[myBugIndex].developers[i].canDevelop ? 'D' : '';
    myPermissions += myBugs[myBugIndex].developers[i].canVerify ? 'V' : '';
    myPermissions += myBugs[myBugIndex].developers[i].canRelease ? 'R' : '';
    listHTML +=
      `    <li class="list-group-item">` +
      myBugs[myBugIndex].developers[i].firstName +
      ' ' +
      myBugs[myBugIndex].developers[i].lastName +
      ' - ' +
      myPermissions;
    if (privilegeLevel === 'A') {
      listHTML +=
        `<button type="button" class="btn-sm btn-secondary" onclick="removeDeveloperFromBug(` +
        myBugIndex +
        `,` +
        myProjectIndex +
        `,` +
        i +
        `)" style="margin-left: .25rem; float: right;"><i class="fas fa-trash"></i></button>` +
        `<button type="button" class="btn-sm btn-secondary" onclick="editDeveloperBugPermissions(` +
        myBugIndex +
        ',' +
        i +
        `)" style="margin-left: 0rem;float: right;"><i class="fas fa-edit"></i></button>` +
        `</li>`;
    }
  }
  listHTML += `</ul>`;
  document.getElementById('editBugDevelopers').innerHTML = listHTML;
}

function editDeveloperBugPermissions(myBugIndex, myDeveloperIndex) {
  let listHTML = '';
  listHTML =
    myBugs[myBugIndex].developers[myDeveloperIndex].firstName +
    ' ' +
    myBugs[myBugIndex].developers[myDeveloperIndex].lastName +
    '    ';
  listHTML += `<input type="checkbox" class="edit-permissions" id = "editBugPermissionsDevelop"><span class="edit-permissions-text">Develop</span>`;
  listHTML += `<input type="checkbox" class="edit-permissions" id = "editBugPermissionsVerify"><span class="edit-permissions-text">Verify</span>`;
  listHTML += `<input type="checkbox" class="edit-permissions" id = "editBugPermissionsRelease"><span class="edit-permissions-text">Release</span>`;
  document.getElementById('editDeveloperBugPermissions').innerHTML = listHTML;
  document.getElementById(`editBugPermissionsDevelop`).checked =
    myBugs[myBugIndex].developers[myDeveloperIndex].canDevelop;
  document.getElementById(`editBugPermissionsVerify`).checked =
    myBugs[myBugIndex].developers[myDeveloperIndex].canVerify;
  document.getElementById(`editBugPermissionsRelease`).checked =
    myBugs[myBugIndex].developers[myDeveloperIndex].canRelease;
  listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  listHTML +=
    `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="updateDeveloperBugPermission(` +
    myBugIndex +
    `,` +
    myDeveloperIndex +
    `)">Save Changes</button>`;
  document.getElementById(
    'editDeveloperBugPermissionsButtons'
  ).innerHTML = listHTML;

  $('#editDeveloperBugPermissionsModal').modal('show');
}
