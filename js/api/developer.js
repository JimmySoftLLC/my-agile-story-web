function loginDeveloper() {
    updateLoginMessage('Logging on to the server please wait');
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    fetch(URL_Address + '/get/developer', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body.developer;
                setMyAglileStoryDeveloperStorage();
                myToken = obj.body.token;
                setMyAglileStoryTokenStorage();
                getProjects(myDeveloper, -1, false);
                showPopupMessage('Welcome ' + myDeveloper.firstName);
            } else {
                showErrorMessage('Error', obj.body.error);
            }
            $('#loginModal').modal('hide');
        });
}

function loginDemoUser() {
    updateLoginMessage('Logging on to the server please wait');
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    fetch(URL_Address + '/get/developer/demo', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body.developer;
                setMyAglileStoryDeveloperStorage();
                myToken = obj.body.token;
                setMyAglileStoryTokenStorage();
                getProjects(myDeveloper, -1, false);
                showPopupMessage('Welcome ' + myDeveloper.firstName);
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}

const checkDeveloperTimeStamp = async () => {
    try {
        const res = await fetch(URL_Address + '/get/developer/byEmail', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerEmail: myDeveloper.email,
            }),
        })
        try {
            const data = await res.json()
            if (res.status === 200) {
                if (data.timeStampISO !== myDeveloper.timeStampISO) {
                    myDeveloper = data;
                    hideAllDialogs();
                    showPopupMessage('Your user data is being updated please wait for a moment.')
                    setMyAglileStoryDeveloperStorage();
                    getProjects(myDeveloper, -1, false);
                }
            } else {
                showErrorMessage('Error', data.error);
            }
        } catch (error) {
            showErrorMessage('Error', error.message);
        }
    } catch (error) {
        showErrorMessage('Error', error.message);
    }
}

const getDeveloperByEmail = async (developerEmail, myProjectIndex) => {
    try {
        const res = await fetch(URL_Address + '/get/developer/byEmail', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerEmail: developerEmail,
            }),
        })
        try {
            const data = await res.json()
            if (res.status === 200) {
                let developer = data;
                myProjectDevelopers.push({
                    developerId: developer._id,
                    canWrite: document.getElementById('project-edit-permissions-write').checked,
                    canAdmin: document.getElementById('project-edit-permissions-admin').checked,
                    firstName: developer.firstName,
                    lastName: developer.lastName,
                    email: developer.email,
                });
                updateDevelopersInProject(myProjectIndex, myProjectDevelopers)
            } else {
                showErrorMessage('Error', data.error);
            }
        } catch (error) {
            showErrorMessage('Error', error.message);
        }
    } catch (error) {
        showErrorMessage('Error', error.message);
    }
}

function removeDeveloperByEmail(developerEmails, myProjectIndex) {
    fetch(URL_Address + '/delete/developer/byEmail', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerEmails: developerEmails,
                projectId: myProjects[myProjectIndex]._id
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                let developers = obj.body;
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}

function addDeveloperByEmail(developerEmails, myProjectIndex) {
    fetch(URL_Address + '/put/developer/byEmail', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerEmails: developerEmails,
                projectId: myProjects[myProjectIndex]._id
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                let developers = obj.body;
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}

function createNewDeveloper() {
    updateDeveloperMessage('Creating new developer please wait');
    var email = document.getElementById('developer-email').value;
    var password = document.getElementById('developer-password').value;
    var firstName = document.getElementById('developer-first-name').value;
    var lastName = document.getElementById('developer-last-name').value;
    var bio = document.getElementById('developer-bio').value;
    var role = 'admin'; // TODO document.getElementById('developer-role').value;

    fetch(URL_Address + '/developer', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                role: role,
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body;
                setMyAglileStoryDeveloperStorage();
                $('#createNewDeveloperModal').modal('hide');
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}

function editDeveloper() {
    updateEditDeveloperMessage('Editing developer please wait');
    var firstName = document.getElementById('edit-developer-first-name').value;
    var lastName = document.getElementById('edit-developer-last-name').value;
    var email = document.getElementById('edit-developer-email').value;
    var bio = document.getElementById('edit-developer-bio').value;
    var role = 'admin'; //TODO change the dialog to have roles
    fetch(URL_Address + '/put/developer', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerId: myDeveloper._id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio,
                role: role,
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body;
                setMyAglileStoryDeveloperStorage();
                $('#editDeveloperModal').modal('hide');
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}

function editPassword() {
    updateEditPasswordMessage('Editing developer password please wait');
    var oldPassword = document.getElementById('edit-password-old-password').value;
    var password = document.getElementById('edit-password-new-password').value;
    fetch(URL_Address + '/put/developer/changePassword', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-auth-token': myToken,
            },
            body: JSON.stringify({
                developerId: myDeveloper._id,
                firstName: myDeveloper.firstName,
                lastName: myDeveloper.lastName,
                email: myDeveloper.email,
                password: myDeveloper.password,
                bio: myDeveloper.bio,
                role: myDeveloper.role,
                oldPassword: oldPassword,
                password: password,
            }),
        })
        .then(res =>
            res.json().then(data => ({
                status: res.status,
                body: data,
            }))
        )
        .then(obj => {
            if (obj.status === 200) {
                myDeveloper = obj.body;
                setMyAglileStoryDeveloperStorage();
                $('#editPasswordModal').modal('hide');
            } else {
                showErrorMessage('Error', obj.body.error);
            }
        });
}