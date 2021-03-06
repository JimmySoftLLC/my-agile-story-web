const loginDeveloper = async () => {
  showPopupMessageNoClear('Starting remote server please wait');
  var email = document.getElementById('loginEmail').value;
  email = email.toLowerCase();
  var password = document.getElementById('loginPassword').value;
  try {
    const res = await fetch(URL_Address + '/get/developer', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const obj = await res.json();
    if (res.status === 200) {
      myDeveloper = obj.developer;
      setMyAglileStoryDeveloperStorage();
      myToken = obj.token;
      setMyAglileStoryTokenStorage();
      getProjects(myDeveloper, -1, false);
      showPopupMessage('Welcome ' + myDeveloper.firstName);
      $('#loginModal').modal('hide');
    } else {
      hidePopupMessage();
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    hidePopupMessage();
    showErrorMessage('Error', error.message);
  }
};

const loginDemoUser = async () => {
  showPopupMessageNoClear('Starting remote server please wait');
  try {
    const res = await fetch(URL_Address + '/get/developer/demo', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const obj = await res.json();
    if (res.status === 200) {
      myDeveloper = obj.developer;
      setMyAglileStoryDeveloperStorage();
      myToken = obj.token;
      setMyAglileStoryTokenStorage();
      getProjects(myDeveloper, -1, false);
      showPopupMessage('Welcome ' + myDeveloper.firstName);
    } else {
      hidePopupMessage();
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    hidePopupMessage();
    showErrorMessage('Error', error.message);
  }
};

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
    });
    const obj = await res.json();
    if (res.status === 200) {
      if (obj.timeStampISO !== myDeveloper.timeStampISO) {
        myDeveloper = obj;
        hideAllDialogs();
        showPopupMessage(
          'Your user data is being updated please wait for a moment.'
        );
        setMyAglileStoryDeveloperStorage();
        getProjects(myDeveloper, -1, false);
      }
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

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
    });
    const obj = await res.json();
    if (res.status === 200) {
      let developer = obj;
      myProjectDevelopers.push({
        developerId: developer._id,
        canWrite: document.getElementById('projectEditPermissionsWrite')
          .checked,
        canAdmin: document.getElementById('projectEditPermissionsAdmin')
          .checked,
        firstName: developer.firstName,
        lastName: developer.lastName,
        email: developer.email,
      });
      updateDevelopersInProject(myProjectIndex, myProjectDevelopers);
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const removeDeveloperByEmail = async (developerEmails, myProjectIndex) => {
  try {
    const res = await fetch(URL_Address + '/delete/developer/byEmail', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-auth-token': myToken,
      },
      body: JSON.stringify({
        developerEmails: developerEmails,
        projectId: myProjects[myProjectIndex]._id,
      }),
    });
    const obj = await res.json();
    if (res.status === 200) {
      let developers = obj;
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const addDeveloperByEmail = async (developerEmails, myProjectIndex) => {
  try {
    const res = await fetch(URL_Address + '/put/developer/byEmail', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-auth-token': myToken,
      },
      body: JSON.stringify({
        developerEmails: developerEmails,
        projectId: myProjects[myProjectIndex]._id,
      }),
    });
    const obj = await res.json();
    if (res.status === 200) {
      let developers = obj;
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const createNewDeveloper = async () => {
  updateDeveloperMessage('Creating new developer please wait');
  var email = document.getElementById('developerEmail').value;
  var password = document.getElementById('developerPassword').value;
  var firstName = document.getElementById('developerFirstName').value;
  var lastName = document.getElementById('developerLastName').value;
  var bio = document.getElementById('developerBio').value;
  var role = 'admin'; // TODO document.getElementById('developer-role').value;
  email = email.toLowerCase();
  try {
    const res = await fetch(URL_Address + '/developer', {
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
    });
    const obj = await res.json();
    if (res.status === 200) {
      myDeveloper = obj;
      setMyAglileStoryDeveloperStorage();
      $('#createNewDeveloperModal').modal('hide');
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const editDeveloper = async () => {
  updateEditDeveloperMessage('Editing developer please wait');
  var firstName = document.getElementById('editDeveloperFirstName').value;
  var lastName = document.getElementById('editDeveloperLastName').value;
  var email = document.getElementById('editDeveloperEmail').value;
  var bio = document.getElementById('editDeveloperBio').value;
  var role = 'admin'; //TODO change the dialog to have roles
  try {
    const res = await fetch(URL_Address + '/put/developer', {
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
    });
    const obj = await res.json();
    if (res.status === 200) {
      myDeveloper = obj;
      setMyAglileStoryDeveloperStorage();
      $('#editDeveloperModal').modal('hide');
    } else {
      showErrorMessage('Error', obj.error);
    }
  } catch (error) {
    showErrorMessage('Error', error.message);
  }
};

const editPassword = async () => {
  updateEditPasswordMessage('Editing developer password please wait');
  var oldPassword = document.getElementById('editPasswordOldPassword').value;
  var password = document.getElementById('editPasswordNewPassword').value;
  var retypedPassword = document.getElementById('editPasswordRetypeNewPassword')
    .value;
  if (password != retypedPassword) {
    showErrorMessage('Error', 'Retyped password does not match');
  } else {
    try {
      const res = await fetch(URL_Address + '/put/developer/changePassword', {
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
      });
      const obj = await res.json();
      if (res.status === 200) {
        myDeveloper = obj;
        setMyAglileStoryDeveloperStorage();
        $('#editPasswordModal').modal('hide');
      } else {
        showErrorMessage('Error', obj.error);
      }
    } catch (error) {
      showErrorMessage('Error', error.message);
    }
  }
};
