// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let totalProjectPoints = 0;
let sprints = [];
let todo = [];
let done = [];
let labelsForChart = [];
let burndown = [];
let myXs = [];


class UserStoryBugsEstimates {
  constructor(sprint, estimate) {
    this.sprint = sprint;
    this.estimate = estimate;
  }
}

function showBurnDownChart() {
  var myProjectIndex = (document.getElementById('select-project').value);
  if (myProjectIndex != -1) {
    totalProjectPoints = 0;
    orderUserStorysBugsBySprintId();
    generateBurnChartData();
    document.getElementById('user-story-bug-elements').innerHTML = "";
    let listHTML = '';
    listHTML += '<div class="row user-story-div">';
    listHTML += '   <div class="col-lg-12">';
    listHTML += '      <div class="card mb-3">';
    listHTML += '         <div class="card-header">';
    listHTML += '            <i class="fas fa-chart-bar"></i>';
    listHTML += `               Burndown for project: ` + myProjects[myProjectIndex].name + `</div>`;
    listHTML += '            <div class="card-body">';
    listHTML += '                <canvas id="myBarChart" width="100%" height="50"></canvas>';
    listHTML += '            </div>';
    listHTML += '         <div class="card-footer small text-muted"></div>';
    listHTML += '      </div>';
    listHTML += '   </div>';
    listHTML += '</div>';
    document.getElementById('graph-elements').innerHTML = listHTML;
    showChartNow();
  }
}

function hideBurnDownChart() {
  document.getElementById('graph-elements').innerHTML = "";
}

function orderUserStorysBugsBySprintId() {
  sprints = [];
  myUserStoriesBugsEstimate = [];

  for (let i = 0; i < myUserStorys.length; i++) {
    myUserStoriesBugsEstimate.push(new UserStoryBugsEstimates(myUserStorys[i].sprint, myUserStorys[i].estimate));
  }

  for (let i = 0; i < myBugs.length; i++) {
    myUserStoriesBugsEstimate.push(new UserStoryBugsEstimates(myBugs[i].sprint, myBugs[i].estimate));
  }

  myUserStoriesBugsEstimate.sort(function (obj1, obj2) {
    return obj1.sprint - obj2.sprint;
  });

  //console.log(myUserStoriesBugsEstimate);

  let mySprindId = 0;

  for (i = 0; i < myUserStoriesBugsEstimate.length; i++) {
    if (mySprindId != myUserStoriesBugsEstimate[i].sprint) {
      mySprindId = myUserStoriesBugsEstimate[i].sprint;
      sprints.push(0);
    }
    if (sprints.length > 0) {
      sprints[sprints.length - 1] += myUserStoriesBugsEstimate[i].estimate;
    }
    totalProjectPoints += myUserStoriesBugsEstimate[i].estimate;
  }
}

function generateBurnChartData() {
  todo = [];
  done = [];
  burndown = [];
  done.push(0);
  tempDoneSoFar = 0;
  myXs = [];

  for (i = 0; i < sprints.length; i++) {
    todo.push(totalProjectPoints - sprints[i] - done[i]);
    done.push(sprints[i] + tempDoneSoFar);
    myXs.push(i);
    burndown.push(totalProjectPoints - tempDoneSoFar);
    tempDoneSoFar += sprints[i];
  }
  StraightLineFit();
}

function StraightLineFit() {
  var mySlopeIntercept = linearRegression(burndown, myXs);
  var i = 0;
  labelsForChart = [];
  burndown = [];
  burndown.push(mySlopeIntercept.slope * i + mySlopeIntercept.intercept);
  var myitem = "S" + (i + 1);
  labelsForChart.push(myitem);
  while (burndown[i] > 0 && i < sprints.length + 10) {
    i += 1;
    burndown.push(mySlopeIntercept.slope * i + mySlopeIntercept.intercept);
    myitem = "S" + (i + 1);
    labelsForChart.push(myitem);
  }
}

function linearRegression(y, x) {
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {

    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i] * y[i]);
    sum_xx += (x[i] * x[i]);
    sum_yy += (y[i] * y[i]);
  }

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
  lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

  return lr;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showChartNow() {
  // Bar Chart Example
  var ctx = document.getElementById("myBarChart");
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsForChart,
      datasets: [{
          label: "Velocity",
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(255,0,0,1)",
          data: burndown,
          type: 'line'
        },
        {
          label: "To Do",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: todo,
        }, {
          label: "Sprint",
          backgroundColor: "rgba(0,125,0,1)",
          borderColor: "rgba(2,117,216,1)",
          data: sprints,
        }
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'Days'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 20
          },
          stacked: true
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: totalProjectPoints * 1.2,
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          },
          stacked: true
        }],
      },
      legend: {
        display: false
      }
    }
  });
}