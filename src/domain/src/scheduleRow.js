class ScheduleRow {
  constructor(code) {
    this.tc = code[0]
    this.rc = code[1]
    this.cc = code[2]
    this.code = code
  }

  toAdjustedCode(rc) {
    return `${this.tc}${rc}${this.cc}`
  }

  toTaskCode(dayNumber) {
    return `${this.tc}${this.rc}${dayNumber.toString().padStart(3, '0')}`
  }

  toTaskCodes(weekNumber) {
    return daysInWeek(weekNumber)
      .map(day => day.toString().padStart(3, '0'))
      .map(dc => `${this.tc}${this.rc}${dc}`)
  }
}

function daysInWeek(weekNumber) {
  const startDay = weekNumber * 7

  return Array.from({ length: 7 }, (_, i) => startDay + i)
}

module.exports = ScheduleRow