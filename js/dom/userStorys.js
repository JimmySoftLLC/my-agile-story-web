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
  document.getElementById(`userStoryPhase` + 0).checked = true;
  modal.find('.modal-body input.user-story-percent-done').val('0');
  updateUserStoryMessage('');
});

$('#editUserStoryModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var myIndex = button.data('hc-index'); // Extract info from data-* attributes
  var modal = $(this);
  var myProjectIndex = document.getElementById('selectProject').value;
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
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
    `editUserStoryPhase` + myUserStorys[myIndex].phase
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
  if (privilegeLevel === 'W' || privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editUserStory(` +
      myIndex +
      `)">Save Changes</button>`;
  }
  //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="splitUserStory(` + myIndex + `)">Split</button>`;
  //    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="mergeUserStory(` + myIndex + `)">Merge</button>`;
  listHTML += ` </div>`;
  document.getElementById('editUserStoryButtons').innerHTML = listHTML;
  listHTML = '';
  if (privilegeLevel === 'W' || privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-secondary voting-button" data-toggle="modal" data-target="#voteUserStoryModal" data-hc-index="` +
      myIndex +
      `"><i class="fas fa-vote-yea"></i></button>`;
  }
  document.getElementById('editVote').innerHTML = listHTML;
  updateEditUserStoryMessage('');
});

$('#voteUserStoryModal').on('show.bs.modal', function (event) {
  $('#editUserStoryModal').modal('hide');
  var button = $(event.relatedTarget); // Button that triggered the modal
  var myIndex = button.data('hc-index'); // Extract info from data-* attributes
  document.getElementById(`voteUserStory0`).checked = true;
  for (let i = 0; i < myUserStorys[myIndex].votes.length; i++) {
    if (myUserStorys[myIndex].votes[i].developerId === myDeveloper._id) {
      try {
        document.getElementById(
          `voteUserStory` + myUserStorys[myIndex].votes[i].vote
        ).checked = true;
      } catch (error) {
        document.getElementById(`vote0`).checked = true;
      }
      break;
    }
  }
  let listHTML = '';
  listHTML +=
    `<h5 class="card-title"><i class="fas fa-newspaper"></i> S` +
    myUserStorys[myIndex].sprint +
    ` - ` +
    myUserStorys[myIndex].userStoryTitle +
    `</h5>`;
  document.getElementById('voteTitle').innerHTML = listHTML;
  listHTML =
    `<p style = "padding: 0px 0px 0px 0px;">As a ` +
    myUserStorys[myIndex].userRole +
    `, I want ` +
    myUserStorys[myIndex].userWant +
    ` so that ` +
    myUserStorys[myIndex].userBenefit +
    `</p>`;

  document.getElementById('voteSummary').innerHTML = listHTML;

  updateVoteResults(myIndex, false);

  listHTML = '';
  listHTML += `<div class="form-group row">`;
  listHTML += `<div class="col-sm-11">`;
  listHTML += `<button type="button" class="btn btn-secondary dialogButton" data-dismiss="modal">Close</button>`;
  listHTML +=
    `<button type="button" class="btn btn-primary dialogButton" onclick="addVoteUserStory(` +
    myIndex +
    `,false)">Vote</button>`;
  var myProjectIndex = document.getElementById('selectProject').value;
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  if (privilegeLevel === 'A') {
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="updateVoteResults(` +
      myIndex +
      `,true)">Results</button>`;
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="editUserStoryEstimate(` +
      myIndex +
      `)">Commit</button>`;
    listHTML +=
      `<button type="button" class="btn btn-primary dialogButton" onclick="deleteVotesUserStory(` +
      myIndex +
      `)">Clear</button>`;
  }
  listHTML += `</div>`;
  listHTML += `</div>`;
  document.getElementById('voteButtons').innerHTML = listHTML;
  // updateEditUserStoryMessage('');
});

function displayUserStory(i, myProjectIndex) {
  let listHTML = '';
  var myProjectIndex = document.getElementById('selectProject').value;
  let privilegeLevel = developerHighestPrivilege(myProjectIndex);
  if (parseInt(myUserStorys[i].phase) === parseInt(myLastSelectedPhase)) {
    listHTML += `<div class ="col col-user-story-card">`;
    listHTML += `<div class="card user-story-card">`;
    listHTML += `<div class="card-body">`;
    listHTML +=
      `<h5 class="card-title"><i class="fas fa-newspaper"></i> S` +
      myUserStorys[i].sprint +
      ` - ` +
      myUserStorys[i].userStoryTitle +
      `</h5>`;
    listHTML +=
      `<p class="card-text" style = "padding: 0px 0px 0px 0px;">As a ` +
      myUserStorys[i].userRole +
      `, I want ` +
      myUserStorys[i].userWant +
      ` so that ` +
      myUserStorys[i].userBenefit +
      `</p>`;
    listHTML += `<div class="row">`;
    listHTML += `<div class="col-11">`;
    listHTML += `<div class="progress">`;
    listHTML +=
      `<div class="progress-bar" role="progressbar" style="width: ` +
      myUserStorys[i].percentDone +
      `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">` +
      myUserStorys[i].percentDone +
      `%</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML +=
      `<div class="col-1" style = "padding: 0px; margin-left: -10px; margin-top: -4px;">` +
      myUserStorys[i].estimate +
      `</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML += `<div class="row" style="margin:auto;">`;
    listHTML +=
      `<button type="button" class="btn btn-secondary dialogButton" data-toggle="modal" data-target="#editUserStoryModal" data-hc-index="` +
      i +
      `"><i class="fas fa-edit"></i></button>`;
    if (privilegeLevel === 'A') {
      listHTML +=
        `<button type="button" class="btn btn-secondary dialogButton" onclick ="deleteUserStorySetup(` +
        i +
        `)"><i class="fas fa-trash"></i></button>`;
    }
    if (privilegeLevel === 'W' || privilegeLevel === 'A') {
      switch (myUserStorys[i].phase) {
        case '0':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
            i +
            `)"><i class="fas fa-running"></i></button>`;
          break;
        case '1':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
            i +
            `)"><i class="fas fa-check"></i></button>`;
          break;
        case '2':
          listHTML +=
            `<button type="button" class="btn btn-secondary dialogButton" onclick ="moveUserStoryToNextPhase(` +
            i +
            `)"><i class="fas fa-hands-helping"></i></button>`;
          break;
        default:
          break;
      }
      listHTML +=
        `<input select id="userStoryPrioritySlider` +
        i +
        `" type="range" min="1" max="10" value="` +
        myUserStorys[i].priority +
        `" onchange="editUserStoryPriority(` +
        i +
        `)">`;
    }
    listHTML += `</div>`;
    listHTML += `</div>`;
    listHTML += `</div>`;
  }
  return listHTML;
}
