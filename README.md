# my-agile-story-web
 
## Overview 

Overview
My Agile Story is a virtual Agile board that organizes items into four sections: to do, doing, verify and done.

The user adds story cards for a project. Then user stories can be assign to sprints and later project velocity can be measured using a burn down chart.

>**Note:** This is the front end of the app.  See [my-agile-story-api](https://github.com/JimmySoftLLC/my-agile-story-api) for the server side of the code base.

## Provisioning

Currently [myAgileStory.com](https://github.com/JimmySoftLLC/my-agile-story-api) is provisioned at [a2hosting.com](https://www.a2hosting.com) and the backend is on [heroku.com](https://www.a2hosting.com).

To save server time the heroku server spins up when web requests are received and sleeps after 30 minutes of inactivity.  

This is not the best user experience since there is a delay when logging on.

To solve the delay lambda functions will be explored on aws.

## Home screen

When a user arrives at [myAgileStory.com](https://github.com/JimmySoftLLC/my-agile-story-api) they will be presented with the following screen which shows the definition of the buttons and a 11 minute video on its' use.

![alt text](https://myagilestory.com/img/startup-screen.jpg)

## Logged in screen

When a user is logged into their account they will be presented with the following screen.

They will either create a new project or pick one that already exist from the **select project drop down**.

![alt text](https://myagilestory.com/img/logged-in-screen.jpg)

## Screen with a selected project

The following is a screen from the **MyAgileStory** project.  The screen shows user stories that are in the backlog.

![alt text](https://myagilestory.com/img/project-screen.jpg)

## User story dialog

When a developer creates a new user story or edits one a dialog like below will be displayed.

The developer fill out the fields as appropriate.  A Non zero sprint value will indicate that user story is in that sprint.  These are used for the burn down chart.

![alt text](https://myagilestory.com/img/edit-user-story.jpg)

## Project burn down chart

The project burn down chart shows the team velocity as a fitted line between all the sprints.  

If there is enough sprint data it will cross zero at the expected sprint when the project is complete.  

>**Note:** It is assumed that each sprint has the same period, typically two weeks.

![alt text](https://myagilestory.com/img/burn-down-chart.jpg)

