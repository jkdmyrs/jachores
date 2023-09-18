const SCHEDULE = require('./masterSchedule.js')
const ScheduleRow = require('./scheduleRow')
const scheduleTaskChecker = require('./scheduleTaskChecker.js')
const CHORES = require('./choresLookup.js')

// all weekly task codes: C, E, P
const fairShareWeeklyTaskCodes = ['C']

function generateScheduleForDay(tasks) {
  const weekNumber = getWeekNumber()
  const dayNumber = getDayNumber()
  const adjustedCodes = []
  SCHEDULE.map(code => new ScheduleRow(code)).filter(scheduleRow => scheduleRow.rc == "X").forEach(scheduleRow => {
    adjustedCodes.push(createAdjustedScheduleRow(scheduleRow, weekNumber, dayNumber))
  })
  const notAdjustedCodes = SCHEDULE.map(code => new ScheduleRow(code)).filter(scheduleRow => scheduleRow.rc != "X").map(scheduleRow => scheduleRow.code)
  let schedule = adjustedCodes.concat(notAdjustedCodes)
  schedule = mapBothTasksToIndividualTasks(schedule)
  const builtSchedule = scheduleTaskChecker.getRemainingTasksSchedule(schedule, weekNumber, dayNumber, tasks)
  return builtSchedule.sort((a, b) => getChoreNameFromScheduleCode(a).localeCompare(getChoreNameFromScheduleCode(b)))
}

function mapBothTasksToIndividualTasks(schedule) {
  const newSchedule = schedule.filter(x => new ScheduleRow(x).rc != 'B')
  schedule.filter(x => new ScheduleRow(x).rc == 'B').forEach(code => {
    const currentScheduleRow = new ScheduleRow(code)
    newSchedule.push(`${currentScheduleRow.tc}J${currentScheduleRow.cc}`)
    newSchedule.push(`${currentScheduleRow.tc}A${currentScheduleRow.cc}`)
  })
  return newSchedule
}

function createAdjustedScheduleRow(scheduleRow, weekNumber, dayNumber) {
  const isFairShareTask = fairShareWeeklyTaskCodes.some(tc => tc == scheduleRow.tc)

  if (isFairShareTask) {
    if (scheduleRow.cc == "W" || scheduleRow.cc == "2") {
      return scheduleRow.toAdjustedCode(weekNumber % 2 ? "J" : "A")
    }
    else if (scheduleRow.cc == "D") {
      return scheduleRow.toAdjustedCode(dayNumber % 2 ? "J" : "A")
    }
  }
  else {
    if (scheduleRow.cc == "W" || scheduleRow.cc == "2") {
      return scheduleRow.toAdjustedCode(weekNumber % 2 ? "A" : "J")
    }
    else if (scheduleRow.cc == "D") {
      return scheduleRow.toAdjustedCode(dayNumber % 2 ? "J" : "A")
    }
  }
}

function getWeekNumber() {
  const day0 = new Date(2023, 7, 7)
  const today = new Date()
  const differenceInMillis = today - day0
  const weeks = differenceInMillis / (7 * 24 * 60 * 60 * 1000)
  return Math.floor(weeks)
}

function getDayNumber() {
  const day0 = new Date(2023, 7, 7)
  const today = new Date()
  day0.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const differenceInMillis = today - day0
  const days = differenceInMillis / (24 * 60 * 60 * 1000)
  return Math.floor(days)
}

function getChoreNameFromScheduleCode(code) {
  return CHORES[new ScheduleRow(code).tc]
}

module.exports = {
  generateScheduleForDay,
  getDayNumber
}