$('#loginModal').on('show.bs.modal', function (event) {
  var modal = $(this);
  modal.find('.modal-body input.loginEmail').val('');
  modal.find('.modal-body input.login-password').val('');
  updateLoginMessage('');
});

function logoutAllSessionExpired() {
  $('#errorDialogModal').modal('hide');
  $('#loginModal').modal('show');
}

function loginMenu() {
  clearInterval(myDeveloperUpdateTimer);
  clearInterval(myProjectUpdateTimer);
  let listHTML = '';
  listHTML = aboutUsDrowdown();
  document.getElementById('navBarItems').innerHTML = listHTML;
  listHTML = '';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
  document.getElementById('footerItems').innerHTML = listHTML;
  showVideo();
  hideBurnDownChart();
  displayUserStoriesAndBugs();
}

function showVideo() {
  var myVideo = 'https://www.youtube.com/embed/Nw9RbTWs_O0';
  let listHTML = '';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="hideVideo()" data-hc-index=""><i class="fas fa-video-slash"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
  document.getElementById('footerItems').innerHTML = listHTML;
  listHTML = '<h4 class = "">';
  listHTML += 'Overview';
  listHTML += '</h4>';
  listHTML += '<p>';
  listHTML += '</p>';
  listHTML += '<p>';
  listHTML +=
    'My Agile Story is a virtual Agile board that organizes user stories and bugs into four sections: to do, doing, verify and done.';
  listHTML += '</p>';
  listHTML += '<p>';
  listHTML +=
    'Add user story / bug cards, create sprints and measure your progress with a burn down chart.  Estimate User Storys and Bugs with Scrum Poker voting.';
  listHTML += '</p>';
  listHTML += '<p>';
  listHTML +=
    'All information is saved on the cloud and updated automatically for each logged in user.  Your team can collaborate virtually, no need for post it notes.  Use the Demo User or create your own account and have fun!';
  listHTML += '</p>';
  listHTML += '<p>';
  listHTML +=
    '<button type="button" class="btn btn-primary button-primary-override" onClick = "loginDemoUser()">Try out the Demo User press here !</button>';
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
  listHTML +=
    '<button type="button" class="btn btn-light"><i class="fas fa-vote-yea"></i></button>';
  listHTML += '  Scrum poker voting ';
  listHTML += '</row>';
  listHTML += '</p>';

  listHTML += '<h4>';
  listHTML += 'Video Instructions';
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

  document.getElementById('videoInstructions').innerHTML = listHTML;
}

function hideVideo() {
  let listHTML = '';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="showVideo()" data-hc-index=""><i class="fas fa-video"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
  document.getElementById('footerItems').innerHTML = listHTML;
  document.getElementById('videoInstructions').innerHTML = '';
}

function loggedInMenu(myProjectIndex) {
  myLastSelectedProject = myProjectIndex;
  document.getElementById('userStoryBugCards').innerHTML = '';
  let listHTML = '';
  listHTML +=
    '<select class="form-control selectProject" id="selectProject" onchange="selectProjectDropDownChanged()">';
  listHTML += '<div class="btn-group">';
  if (Number(myProjectIndex) === -1) {
    clearInterval(myProjectUpdateTimer);
    listHTML += '<option selected value = "-1" >Select Project</option>';
    for (var j = 0; j < myProjects.length; j++) {
      listHTML +=
        `<option value = "` + j + `">` + myProjects[j].name + `</option>`;
    }
  } else {
    clearInterval(myProjectUpdateTimer);
    myProjectUpdateTimer = setInterval(updateProjectInContext, 5000);
    listHTML += '<option value = "-1" >Select Project</option>';
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
  listHTML += '</div>';
  listHTML += '</select>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewProjectModal" data-hc-index=""><i class="fas fa-project-diagram"></i></button>';
  if (Number(myProjectIndex) != -1) {
    let privilegeLevel = developerHighestPrivilege(myProjectIndex);
    if (privilegeLevel === 'A') {
      listHTML +=
        '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="deleteProjectSetup()" data-hc-index=""><i class="fas fa-trash"></i></button>';
    }
    if (privilegeLevel === 'W' || privilegeLevel === 'A') {
      listHTML +=
        '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editProjectModal" data-hc-index=""><i class="fas fa-edit"></i></button>';
      listHTML +=
        '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewUserStoryModal" data-hc-index=""><i class="fas fa-newspaper"></i></button>';
      listHTML +=
        '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#createNewBugModal" data-hc-index=""><i class="fas fa-bug"></i></button>';
    }
  }
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" data-target="#editDeveloperModal" data-hc-index=""><i class="fas fa-user-edit"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-light dialogButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
  document.getElementById('footerItems').innerHTML = listHTML;
  listHTML = aboutUsDrowdown();
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(0)" data-hc-index=""><i class="fas fa-list"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(1)" data-hc-index=""><i class="fas fa-running"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(2)" data-hc-index=""><i class="fas fa-check"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(3)" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton button-primary-override" data-toggle="modal" onclick="setPhase(4)" data-hc-index=""><i class="fas fa-chart-bar"></i></button>';
  displayUserStoriesAndBugs(myProjectIndex);
  document.getElementById('navBarItems').innerHTML = listHTML;
  document.getElementById('videoInstructions').innerHTML = '';
}

function logoutAll() {
  clearInterval(myProjectUpdateTimer);
  clearInterval(myDeveloperUpdateTimer);
  showPopupMessage(
    'Good bye ' + myDeveloper.firstName + ' thanks for visiting!'
  );
  clearLocalStorage();
  displayUserStoriesAndBugs();
  loginMenu();
}

function aboutUsDrowdown() {
  let listHTML = '';
  listHTML += '<div class="btn-group">';
  listHTML +=
    '<button type="button" class="btn btn-primary dialogButton dropdown-toggle button-primary-override-dropdown" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-external-link-alt"></i></button>';
  listHTML += '<div class="dropdown-menu">';
  listHTML +=
    '<a class="dropdown-item" href="https://jimmysoftllc.com" target="_blank">JimmySoft LLC</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://embroiderywaresoftware.com" target="_blank">EmbroideryWare</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://www.heatercalc.com" target="_blank">Heater Calc</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://www.weathermany.com" target="_blank">Weather Many</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://www.mydynamodb.com" target="_blank">myDynamoDB</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://www.mysoftwarejourney.com" target="_blank">Blog</a>';
  listHTML +=
    '<a class="dropdown-item" href="https://www.youtube.com/channel/UCBjCjqpPynS3grLinevnAPA?view_as=subscriber" target="_blank">Videos</a>';
  listHTML += '</div>';
  listHTML += '</div>';
  return listHTML;
}
