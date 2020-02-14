function displayUserStoriesAndBugs() {
    let listHTML = `<div class ="row user-story-div">`;
    if (myLastSelectedPhase === 4) {
        showBurnDownChart();
    } else {
        let myLocalUserStoriesBugs = orderUserStorysBugsBySprintId();
        if (myLastSelectedProject != -1) {
            for (let i = 0; i < myLocalUserStoriesBugs.length; i++) {
                switch (myLocalUserStoriesBugs[i].userStoryOrBug) {
                    case 0: //user story
                        listHTML += displayUserStory(myLocalUserStoriesBugs[i].index, myLastSelectedProject);
                        break;
                    case 1: //bug
                        listHTML += displayBug(myLocalUserStoriesBugs[i].index, myLastSelectedProject);
                        break;
                    default:
                }
            }
        }
        listHTML += `</div>`;
        document.getElementById('user-story-bug-elements').innerHTML = listHTML;
    }
}