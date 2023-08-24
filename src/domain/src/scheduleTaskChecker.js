const ScheduleRow = require('./scheduleRow.js')

function getCompletedTasksSchedule(schedule, weekNumber, dayNumber, tasks) {
  const completedScheduleRows = []
  schedule.map(code => new ScheduleRow(code)).forEach(scheduleRow => {
    if (scheduleRow.cc == "W" || scheduleRow.cc == "A") {
      const searchTasks = scheduleRow.toTaskCodes(weekNumber)
      if (searchTasks.filter(item1 => tasks.some(item2 => item2.code === item1)).some(Boolean)) {
        completedScheduleRows.push(scheduleRow)
      }
    }
    if (scheduleRow.cc == "2") {
      const searchTasks = scheduleRow.toTaskCodes(weekNumber)
      const serachResults = searchTasks.filter(item1 => tasks.some(item2 => item2.code === item1))
      if (serachResults.length == 2) {
        completedScheduleRows.push(scheduleRow)
      }
    }
    if (scheduleRow.cc == "D") {
      const searchTask = scheduleRow.toTaskCode(dayNumber)
      if (tasks.some(task => task.code == searchTask)) {
        completedScheduleRows.push(scheduleRow)
      }
    }
  })
  return completedScheduleRows.map(scheduleRow => scheduleRow.code)
}

function getRemainingTasksSchedule(schedule, weekNumber, dayNumber, tasks) {
  const completedTasks = getCompletedTasksSchedule(schedule, weekNumber, dayNumber, tasks)
  return schedule.filter(code => !completedTasks.includes(code)).map(code => new ScheduleRow(code)).map(scheduleRow => {
    if (scheduleRow.cc == "2") {
      const searchTasks = scheduleRow.toTaskCodes(weekNumber)
      const serachResults = searchTasks.filter(item1 => tasks.some(item2 => item2.code === item1))
      if (serachResults.length == 1) {
        return new ScheduleRow(`${scheduleRow.tc}${scheduleRow.rc}1`).code
      }
    }
    return scheduleRow.code
  })
}

module.exports = {
  getCompletedTasksSchedule,
  getRemainingTasksSchedule
}