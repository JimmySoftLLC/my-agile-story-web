function updateStatus(message) {
    document.getElementById('footer-message').innerHTML = '<p>' + message + '</p>';
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
    modal.find('.modal-body input.edit-user-story-phase').val(myUserStorys[myIndex].phase);
    modal.find('.modal-body input.edit-user-story-percent-done').val(myUserStorys[myIndex].percentDone);
    
    let listHTML = '';
    listHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    listHTML = `<button type="button" class="btn btn-primary" onclick="editUserStory(`+ myIndex +`)">Save Changes</button>`;
    document.getElementById('edit-user-story-buttons').innerHTML = listHTML;    
})

$('#createUserStoryModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body input.user-story-title').val("");
    modal.find('.modal-body input.user-story-user-role').val("");
    modal.find('.modal-body input.user-story-user-want').val("");
    modal.find('.modal-body input.user-story-user-benefit').val("");
    modal.find('.modal-body textarea.user-story-acceptance-criteria').val("");
    modal.find('.modal-body textarea.user-story-conversation').val("");
    modal.find('.modal-body input.user-story-estimate').val("");
    modal.find('.modal-body input.user-story-phase').val("");
    modal.find('.modal-body input.user-story-percent-done').val("");  
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

function loginMenu() {
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
    updateStatus("Hi login or register to continue");
}

function loggedinMenu() {
    let listHTML = '';
    listHTML += aboutUsDrowdown();
    listHTML += '<li class="nav-item" style = "margin-right:10px;">';
    listHTML += '   <select class="form-control" id="select-project" onchange="selectProjectDropDownChanged()">';
    listHTML += '       <option selected value = "-1" >Select Project</option>';
    for ( var j = 0; j < myProjects.length; j++) {
        listHTML += `<option value = "`+j+`">` + myProjects[j].name + `</option>`;
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
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="editProject()" data-hc-index=""><i class="fas fa-edit"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#createNewUserStoryModal" data-hc-index=""><i class="fas fa-newspaper"></i></button>';
    listHTML += '</li>';
    document.getElementById('nav-bar-items-left').innerHTML = listHTML;
    listHTML = '';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-list"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-running"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-check"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-info addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
    listHTML += '</li>'; 
    document.getElementById('nav-bar-items-right').innerHTML = listHTML;
    updateStatus("Welcome " + myDeveloper.firstName + ', to begin create or select a project');   
}

function loggedinSelectedProject() {
    let listHTML = ''; 
    listHTML += aboutUsDrowdown();
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#createNewProjectModal" data-hc-index="">Create User Story</button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" data-target="#selectProjectModal" data-hc-index="">Select Project</button>';
    listHTML += '</li>';
    document.getElementById('nav-bar-items-left').innerHTML = listHTML;
    listHTML = '';  
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-list"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-running"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-check"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="" data-hc-index=""><i class="fas fa-hands-helping"></i></button>';
    listHTML += '</li>';
    listHTML += '<li class="nav-item">';
    listHTML += '    <button type="button" class="btn btn-primary addItemButton" data-toggle="modal" onclick="logoutAll()" data-hc-index=""><i class="fas fa-sign-out-alt"></i></button>';
    listHTML += '</li>'; 
    document.getElementById('nav-bar-items-right').innerHTML = listHTML;
}

function logoutAll(){
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

if(!localStorage.getItem('lastDeveloper')) {
    setMyAglileStoryDeveloperStorage();
    loginMenu();
} else {
    getMyAglileStoryDeveloperStorage();
    loggedinMenu();
}

function setMyAglileStoryDeveloperStorage() {
    localStorage.setItem('lastDeveloper', JSON.stringify(myDeveloper)); 
}

function getMyAglileStoryDeveloperStorage() {
    myDeveloper = JSON.parse(localStorage.getItem('lastDeveloper'));
}

function displayUserStories() {
    let listHTML = `<div class ="row" style = "padding-top:0rem; padding-bottom:7rem;">`;
    for (let i = 0; i < myUserStorys.length; i++) {
        let myUserStory = myUserStorys[i];
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
        listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick =""><i class="fas fa-arrow-up"> </i></button>`; 
        listHTML += `           <button type="button" class="btn btn-secondary addItemButton" onclick =""><i class="fas fa-arrow-down"> </i></button>`; 
        listHTML += `       </div>`;
        listHTML += `   </div>`;
        listHTML += `</div>`;
    }
    listHTML += `</div>`;  
    document.getElementById('user-story-elements').innerHTML = listHTML;
}


