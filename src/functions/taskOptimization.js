export { sortTasks, updateFactor }

const factors = {
  "importance": 10,
  "enjoyment": 10,
  "difficulty": 10,
  "drowsiness": 10
}

const bufferTimeMins = 30;
const drowsiness = 0;

export function sortTasks(taskList, drowsiness, totalTime) { // totalTime: total time available to do all tasks
  drowsiness = drowsiness;

  if (taskList.length <= 1) {
    return taskList;
  }

  if (totalTime - getTotalDuration(taskList) < bufferTimeMins) {
    taskList.sort(compareImportance);
    // sort within each importance level
    var grouped = groupByImportance(taskList);
    for (var i = 0; i < grouped.length; ++i) {
      grouped[i].sort(comparePriority);
    }
    taskList = [].concat.apply([], grouped);
  } else {
    taskList.sort(comparePriority);
  }
}

export function updateFactor(factor, newValue) {
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

function getPriority(enjoyment, difficulty) {
  return (
    enjoyment*factors["enjoyment"]
    - drowsiness*factors["drowsiness"] * difficulty*factors["difficulty"]
  );
}

function comparePriority(a, b) {
  var aPriority = getPriority(a.enjoyment, a.difficulty, drowsiness);
  var bPriority = getPriority(b.enjoyment, b.difficulty, drowsiness)
  if (aPriority <  bPriority){
    return -1;
  } else if (aPriority > bPriority) {
    return 1;
  }
  return 0;
}

function compareImportance(a, b) {
  if (a.importance <  b.importance){
    return -1;
  } else if (a.importance > b.importance) {
    return 1;
  }
  return 0;
}

function getTotalDuration(taskList) {
  duration = 0;
  for (var i = 0; i < taskList.length; ++i) {
    const task = taskList[i];
    duration += task.time;
  }
  return duration;
}