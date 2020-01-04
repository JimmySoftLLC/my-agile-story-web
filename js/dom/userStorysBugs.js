function displayUserStoriesAndBugs() {
    let listHTML = `<div class ="row user-story-div">`;
    if (myLastSelectedPhase === 4) {
        showBurnDownChart();
    } else {
        let userStoryIndex = 0;
        let bugIndex = 0
        for (let priorityNumb = 1; priorityNumb < 11; priorityNumb++) {
            if (myLastSelectedProject != -1) {
                for (let i = userStoryIndex; i < myUserStorys.length; i++) {
                    if (myUserStorys[i].priority === priorityNumb) {
                        listHTML += displayUserStory(i);
                        userStoryIndex = i;
                    }
                }
            }
            if (myLastSelectedProject != -1) {
                for (let i = bugIndex; i < myBugs.length; i++) {
                    if (myBugs[i].priority === priorityNumb) {
                        listHTML += displayBug(i);
                        bugIndex = i;
                    }
                }
            }
        }
        listHTML += `</div>`;
        document.getElementById('user-story-bug-elements').innerHTML = listHTML;
    }
}