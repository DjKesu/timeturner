export { sortedTasks, updateFactor, printTaskList }

const factors = {
  //"importance": 10,
  "enjoyment": 10,
  "difficulty": 10,
  "drowsiness": 10
}

const bufferTimeMins = 30;
const drowsiness = 0;

// version without importance
function sortedTasks(taskList, drowsiness) {
  console.log("Before");
  printTaskList(taskList);

  drowsiness = drowsiness;
  if (taskList.length <= 1) {
    return taskList;
  }
  taskList.sort(comparePriority);

  console.log();
  console.log("After");
  printTaskList(taskList);
  return taskList;
}

function printTaskList(taskList) {
  for (var i = 0; i < taskList.length; i++) {
    console.log(
      "task: ", taskList[i].taskName,
      "difficulty: ", taskList[i].difficulty,
      "enjoyment: ", taskList[i].enjoyment,
      "duration: ", taskList[i].duration
    );
  }
}
// export function sortTasks(taskList, drowsiness, totalTime) { // totalTime: total time available to do all tasks
//   drowsiness = drowsiness;

//   if (taskList.length <= 1) {
//     return taskList;
//   }

//   if (totalTime - getTotalDuration(taskList) < bufferTimeMins) {
//     taskList.sort(compareImportance);
//     // sort within each importance level
//     var grouped = groupByImportance(taskList);
//     for (var i = 0; i < grouped.length; ++i) {
//       grouped[i].sort(comparePriority);
//     }
//     taskList = [].concat.apply([], grouped);
//   } else {
//     taskList.sort(comparePriority);
//   }
// }

function updateFactor(factor, newValue) {
  if ((factor in factors) && (typeof newValue ==='number')) {
    factors[factor] = newValue;
  }
}

function groupByImportance(taskList) {
  var grouped = {};
  for (var i=0; i < taskList.length; i++) {
    var p = taskList[i].importance;
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(taskList[i]);
  }
  return grouped;
}

function calculatePriority(enjoyment, difficulty) {
  return (
    enjoyment*factors["enjoyment"]
    - drowsiness*factors["drowsiness"] * difficulty*factors["difficulty"]
  );
}

function comparePriority(a, b) {
  var aPriority = calculatePriority(a.enjoyment, a.difficulty, drowsiness);
  var bPriority = calculatePriority(b.enjoyment, b.difficulty, drowsiness);
  console.log(a.taskName, aPriority, b.taskName, bPriority);
  if (aPriority < bPriority){
    return 1;
  } else if (aPriority > bPriority) {
    return -1;
  }
  return 0;
}

function compareImportance(a, b) {
  if (a.importance <  b.importance){
    return 1;
  } else if (a.importance > b.importance) {
    return -1;
  }
  return 0;
}

function getTotalDuration(taskList) {
  var duration = 0;
  for (var i = 0; i < taskList.length; ++i) {
    const task = taskList[i];
    duration += task.time;
  }
  return duration;
}