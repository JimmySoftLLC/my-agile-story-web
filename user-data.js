function DeveloperObject(_id, firstName, lastName, email, password, bio, role) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.bio = bio;
    this.role = role;
    this.projects = [];
}

function ProjectObject(_id, name, description) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.developerIds = [];
    this.userStoryIds = [];
}

function UserStoryObject(_id, userStoryTitle, userRole, userWant, userBenefit, acceptanceCriteria, estimate, phase, percentDone) {
    this._id = _id;
    this.userStoryTitle = userStoryTitle;
    this.userRole = userRole;
    this.userWant = userWant;
    this.userBenefit = userBenefit;
    this.acceptanceCriteria = acceptanceCriteria;
    this.estimate = estimate;
    this.phase = phase;
    this.percentDone = percentDone;
}

let myDeveloper = {};
let myProjects = [];
let myUserStorys = [];