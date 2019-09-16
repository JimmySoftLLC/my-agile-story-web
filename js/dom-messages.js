function updateStatus(message) {
    document.getElementById('footer-message').innerHTML = '<p>' + message + '</p>';
    setTimeout(clearStatus,2000) 
}

function clearStatus() {
  document.getElementById('footer-message').innerHTML = '<p></p>';
}

$('#editUserStoryModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    //
    modal.find('.modal-body input.edit-user-story-title').val(myUserStorys[myIndex].userStoryTitle);
    modal.find('.modal-body input.edit-user-story-user-role').val(myUserStorys[myIndex].userRole);
    modal.find('.modal-body input.edit-user-story-user-want').val(myUserStorys[myIndex].userWant);
    modal.find('.modal-body input.edit-user-story-user-benefit').val(myUserStorys[myIndex].userBenefit);
    modal.find('.modal-body textarea.edit-user-story-acceptance-criteria').val(myUserStorys[myIndex].acceptanceCriteria);
    modal.find('.modal-body textarea.edit-user-story-conversation').val(myUserStorys[myIndex].conversation);
    modal.find('.modal-body input.edit-user-story-estimate').val(myUserStorys[myIndex].estimate);
    if (myUserStorys[myIndex].phase === "" || myUserStorys[myIndex].phase === "null" || myUserStorys[myIndex].phase === "undefined" ) {
        myUserStorys[myIndex].phase = "0";
    }
    document.getElementById(`edit-user-story-phase-`+myUserStorys[myIndex].phase).checked = true;
    modal.find('.modal-body input.edit-user-story-percent-done').val(myUserStorys[myIndex].percentDone);
    modal.find('.modal-body input.edit-user-story-priority').val(myUserStorys[myIndex].priority);
    let listHTML = `<div class="col-sm-11">`;
    listHTML += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="editUserStory(`+ myIndex +`)">Save Changes</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="splitUserStory(`+ myIndex +`)">Split</button>`;
    listHTML += `<button type="button" class="btn btn-primary" style= "margin-left: .25rem;" onclick="mergeUserStory(`+ myIndex +`)">Merge</button>`;
    listHTML += ` </div>`
    document.getElementById('edit-user-story-buttons').innerHTML = listHTML;    
})

$('#createNewUserStoryModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.user-story-title').val("");
    modal.find('.modal-body input.user-story-user-role').val("");
    modal.find('.modal-body input.user-story-user-want').val("");
    modal.find('.modal-body input.user-story-user-benefit').val("");
    modal.find('.modal-body textarea.user-story-acceptance-criteria').val("");
    modal.find('.modal-body textarea.user-story-conversation').val("");
    modal.find('.modal-body input.user-story-estimate').val("");
    modal.find('.modal-body input.user-story-priority').val("1");
    document.getElementById(`user-story-phase-` + 0).checked =true;
    modal.find('.modal-body input.user-story-percent-done').val("0");  
})

$('#createNewDeveloperModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.developer-email').val("");
    modal.find('.modal-body input.developer-password').val("");
    modal.find('.modal-body input.developer-first-name').val("");
    modal.find('.modal-body input.developer-last-name').val("");
    modal.find('.modal-body textarea.developer-bio').val("");
})

$('#editDeveloperModal').on('show.bs.modal', function (event) {
    console.log("Edit developer modal");
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    modal.find('.modal-body input.edit-developer-email').val(myDeveloper.email);
    modal.find('.modal-body input.edit-developer-password').val(myDeveloper.password);
    modal.find('.modal-body input.edit-developer-first-name').val(myDeveloper.firstName);
    modal.find('.modal-body input.edit-developer-last-name').val(myDeveloper.lastName);
    modal.find('.modal-body textarea.edit-developer-bio').val(myDeveloper.bio);
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML = `<button type="button" class="btn btn-primary" onclick="editDeveloper()">Save Changes</button>`;
    document.getElementById('edit-developer-buttons').innerHTML = listHTML;    
})

$('#loginModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.login-email').val("");
    modal.find('.modal-body input.login-password').val("");
})

$('#createNewProjectModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.project-name').val("");
    modal.find('.modal-body textarea.project-description').val("");
})

$('#editProjectModal').on('show.bs.modal', function (event) {
    var myProjectIndex = (document.getElementById('select-project').value);
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    modal.find('.modal-body input.edit-project-name').val(myProjects[myProjectIndex].name);
    modal.find('.modal-body textarea.edit-project-description').val(myProjects[myProjectIndex].description);  
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML = `<button type="button" class="btn btn-primary" onclick="editProject(`+ myProjectIndex +`)">Save Changes</button>`;
    document.getElementById('edit-project-buttons').innerHTML = listHTML;    
})

function showConfirmDeletePopup(functionName,functionValue,functionMessage) {
    let listHTML = '';
    listHTML = `<i class="fas fa-exclamation-triangle"></i> Delete warning`;
    document.getElementById('confirm-delete-title').innerHTML = listHTML;
    listHTML = `You about to delete ` + functionMessage + `.  This process is irreversable are you sure?`;
    document.getElementById('confirm-delete-message').innerHTML = listHTML;
    listHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>`;
    listHTML += `<button type="button" class="btn btn-danger btn-ok" onclick="` + functionName + `(` + functionValue + `)">Delete</button>`;
    document.getElementById('confirm-delete-buttons').innerHTML = listHTML;
    $('#confirm-delete').modal('show');
}

function loginMenu(statusMessage) {
    let listHTML = ''; 
    listHTML += aboutUsDrowdown();
    document.getElementById('nav-bar-items-left').innerHTML = listHTML;  
    listHTML = '';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#createNewDeveloperModal" data-hc-index=""><i class="fas fa-user-plus"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#loginModal" data-hc-index=""><i class="fas fa-sign-in-alt"></i></button>';
    listHTML += '</li>';
    document.getElementById('nav-bar-items-right').innerHTML = listHTML;
    displayUserStories();
}

function loggedinMenu(myProjectIndex) {
    console.log(myProjectIndex);
    let listHTML = '';
    listHTML += aboutUsDrowdown();
    listHTML += '<li class="nav-item" style = "margin-right:10px;">';
    listHTML += '   <select class="form-control select-project" id="select-project" onchange="selectProjectDropDownChanged()">';
    if (Number(myProjectIndex) === -1 ) {
            listHTML += '       <option selected value = "-1" >Select Project</option>';
            for ( var j = 0; j < myProjects.length; j++) {
                listHTML += `<option value = "`+j+`">` + myProjects[j].name + `</option>`;
            }
        }else{
            listHTML += '       <option value = "-1" >Select Project</option>';
            for ( var j = 0; j < myProjects.length; j++) {
                if (j === Number(myProjectIndex)) {
                    listHTML += `<option selected value = "`+j+`">` + myProjects[j].name + `</option>`;
                }else{
                    listHTML += `<option value = "`+j+`">` + myProjects[j].name + `</option>`;  
                }
            }   
    }
    listHTML += '   </select>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#createNewProjectModal" data-hc-index=""><i class="fas fa-project-diagram"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="deleteProjectSetup()" data-hc-index=""><i class="fas fa-trash"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#editProjectModal" data-hc-index=""><i class="fas fa-edit"></i></button>';
    listHTML += '</li>';

    document.getElementById('nav-bar-items-left').innerHTML = listHTML;
    listHTML = '';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#createNewUserStoryModal" data-hc-index=""><i class="fas fa-newspaper"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="setPhase(0)" data-hc-index=""><i class="fas fa-list"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="setPhase(1)" data-hc-index=""><i class="fas fa-running"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="setPhase(2)" data-hc-index=""><i class="fas fa-check"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="setPhase(3)" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#editDeveloperModal" data-hc-index=""><i class="fas fa-user-edit"></i></button>';
    listHTML += '</li>'; 
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
    listHTML += '</li>'; 
    document.getElementById('nav-bar-items-right').innerHTML = listHTML;
    displayUserStories();
}

function displayUserStories() {
    console.log("Updating user stories.")
    let listHTML = `<div class ="row" style = "padding-top:0rem; padding-bottom:7rem;">`;
    for (let i = 0; i < myUserStorys.length; i++) {
        console.log ("if statement " + parseInt(myUserStorys[i].phase) + " === " + parseInt(myLastSelectedPhase) ); 
        if (parseInt(myUserStorys[i].phase) === parseInt(myLastSelectedPhase)) {
                listHTML += `<div class ="col test-case-card">`;
                listHTML += `   <div class="card jims-card">`;
                listHTML += `       <div class="card-body">`;
                listHTML += `           <h5 class="card-title">` + myUserStorys[i].userStoryTitle + `</h5>`;
                listHTML += `           <p class="card-text">As a ` + myUserStorys[i].userRole + `, I want ` + myUserStorys[i].userWant + ` so that ` + myUserStorys[i].userBenefit + `</p>`;
                listHTML += `           <div class="progress">`;
                listHTML += `               <div class="progress-bar" role="progressbar" style="width: ` + myUserStorys[i].percentDone + `%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">`+ myUserStorys[i].percentDone +`%</div>`;
                listHTML += `           </div>`;
                listHTML += `       </div>`;
                listHTML += `       <div class="row" style="margin:auto;">`;
                listHTML += `           <button type="button" class="btn btn-secondary addItemButton" data-toggle="modal" data-target="#editUserStoryModal" data-hc-index="` +  i + `"><i class="fas fa-edit"></i></button>`;
                listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick ="DeleteUserStorySetup(` + i + `)"><i class="fas fa-trash"></i></button>`;
                listHTML += `           <input select id="user-story-priority-slider-`+i+`" type="range" min="1" max="10" value="` + myUserStorys[i].priority + `" onchange="editUserStoryPriority(` + i + `)">`;
                switch(myUserStorys[i].phase) {
                    case "0":
                        listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-running"></i></button>`;
                        break;
                    case "1":
                        listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-check"></i></button>`;
                        break;
                    case "2": 
                        listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick ="moveUserToNextPhase(` + i + `)"><i class="fas fa-hands-helping"></i></button>`;
                        break;
                    default:
                        break;
                }
                listHTML += `       </div>`;
                listHTML += `   </div>`;
                listHTML += `</div>`;
            }
    }
    listHTML += `</div>`;  
    document.getElementById('user-story-elements').innerHTML = listHTML;
}

function logoutAll(){
    updateStatus("Good bye " + myDeveloper.firstName + " thanks for visiting!")
    localStorage.removeItem('lastDeveloper');
    localStorage.removeItem('lastProjects');
    localStorage.removeItem('lastUserStorys');
    myDeveloper = {};
    myProjects = [];
    myUserStorys = [];
    loginMenu();
}

function aboutUsDrowdown() {
    let listHTML = '';  
    listHTML += '<li class="nav-item dropdown">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-external-link-alt"></i></button>';
    listHTML += '    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
    listHTML += '        <a class="dropdown-item" href="https://jimmysoftllc.com" target="_blank">JimmySoft LLC</a>';
    listHTML += '        <a class="dropdown-item" href="https://embroiderywaresoftware.com" target="_blank">EmbroideryWare</a>';
    listHTML += '        <a class="dropdown-item" href="https://www.heatercalc.com" target="_blank">Heater Calc</a>';
    listHTML += '        <a class="dropdown-item" href="https://www.buttonbudget.com" target="_blank">Button Budget</a>';
    listHTML += '        <a class="dropdown-item" href="https://www.weathermany.com" target="_blank">Weather Many</a>';
    listHTML += '    </div>';
    listHTML += '</li>';
    return listHTML;
}

//Local storage for lastUserStories-----------------------
if(!localStorage.getItem('lastUserStorys')) {
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

//Local storage for lastProjects-----------------------
if(!localStorage.getItem('lastProjects')) {
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
if(!localStorage.getItem('lastSelectedProject')) {
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
if(!localStorage.getItem('lastSelectedPhase')) {
    setMyAglileStorylastSelectedPhaseStorage();
} else {
    getMyAglileStorylastSelectedPhaseStorage();
}

function setMyAglileStorylastSelectedPhaseStorage() {
    localStorage.setItem('lastSelectedPhase', myLastSelectedPhase);
    console.log("My last selected phase set to " + myLastSelectedPhase);
}

function getMyAglileStorylastSelectedPhaseStorage() {
    myLastSelectedPhase = localStorage.getItem('lastSelectedPhase');    
    console.log("My last selected phase is " + myLastSelectedPhase);
}

//Local storage for lastDeveloper-----------------------
if(!localStorage.getItem('lastDeveloper')) {
    setMyAglileStoryDeveloperStorage(); 
    loginMenu();
} else {
    getMyAglileStoryDeveloperStorage();  
    if (Object.keys(myDeveloper).length === 0) {
        loginMenu();
    }else{
        loggedinMenu(myLastSelectedProject);
    }
}

function setMyAglileStoryDeveloperStorage() {
    localStorage.setItem('lastDeveloper', JSON.stringify(myDeveloper)); 
}

function getMyAglileStoryDeveloperStorage() {
    myDeveloper = JSON.parse(localStorage.getItem('lastDeveloper'));
}




