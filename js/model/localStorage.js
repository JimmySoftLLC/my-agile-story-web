//Local storage for lastBugs-----------------------
if (!localStorage.getItem('lastBugs')) {
    setMyAglileStoryBugStorage();
} else {
    getMyAglileStoryBugStorage();
}

function setMyAglileStoryBugStorage() {
    localStorage.setItem('lastBugs', JSON.stringify(myBugs));
}

function getMyAglileStoryBugStorage() {
    myBugs = JSON.parse(localStorage.getItem('lastBugs'));
}

//Local storage for lastProjects-----------------------
if (!localStorage.getItem('lastProjects')) {
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
if (!localStorage.getItem('lastSelectedProject')) {
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
if (!localStorage.getItem('lastSelectedPhase')) {
    setMyAglileStorylastSelectedPhaseStorage();
} else {
    getMyAglileStorylastSelectedPhaseStorage();
}

function setMyAglileStorylastSelectedPhaseStorage() {
    localStorage.setItem('lastSelectedPhase', myLastSelectedPhase);
}

function getMyAglileStorylastSelectedPhaseStorage() {
    myLastSelectedPhase = localStorage.getItem('lastSelectedPhase');
}

//Local storage for lastDeveloper-----------------------
if (!localStorage.getItem('lastDeveloper')) {
    setMyAglileStoryDeveloperStorage();
    loginMenu();
} else {
    getMyAglileStoryDeveloperStorage();
    if (Object.keys(myDeveloper).length === 0) {
        loginMenu();
    } else {
        loggedinMenu(myLastSelectedProject);
    }
}

function setMyAglileStoryDeveloperStorage() {
    localStorage.setItem('lastDeveloper', JSON.stringify(myDeveloper));
}

function getMyAglileStoryDeveloperStorage() {
    myDeveloper = JSON.parse(localStorage.getItem('lastDeveloper'));
}

//Local storage for token-----------------------
if (!localStorage.getItem('token')) {
    setMyAglileStoryTokenStorage();
} else {
    getMyAglileStoryTokenStorage();
}

function setMyAglileStoryTokenStorage() {
    localStorage.setItem('token', JSON.stringify(myToken));
}

function getMyAglileStoryTokenStorage() {
    myToken = JSON.parse(localStorage.getItem('token'));
}


//Local storage for lastUserStories-----------------------
if (!localStorage.getItem('lastUserStorys')) {
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

function clearLocalStorage() {
    localStorage.removeItem('lastDeveloper');
    localStorage.removeItem('lastProjects');
    localStorage.removeItem('lastUserStorys');
    localStorage.removeItem('lastBugs');
    localStorage.removeItem('token');
    myDeveloper = {};
    myProjects = [];
    myUserStorys = [];
    myBugs = [];
    myToken = '';
}