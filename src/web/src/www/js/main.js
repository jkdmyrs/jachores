import * as bootstrap from 'bootstrap'

import * as CHORES from '../../../../domain/src/choresLookup.js'
import * as PERSON from '../../../../domain/src/personLookup.js'
import * as Task from '../../../../domain/src/task.js'
import * as ScheduleRow from '../../../../domain/src/scheduleRow.js'
import * as scheduleGenerator from '../../../../domain/src/scheduleGenerator.js'
import * as env from "../../../../env.js"

let checkboxIndex
let todaysSchedule
let user
let showPerson
function main(showPersonInput, optionalUser) {
  user = optionalUser
  showPerson = showPersonInput
  checkboxIndex = 0
  fetch(`${env.apiBaseUrl}/chores/tasks`)
    .then(x => x.json())
    .then(fromCodesToTasks)
    .then(tasks => {
      todaysSchedule = scheduleGenerator.generateScheduleForDay(tasks)
      if (user == "jack") {
        todaysSchedule = todaysSchedule.filter(code => new ScheduleRow(code).rc == "J" || new ScheduleRow(code).rc == "B")
      }
      else if (user == "alex") {
        todaysSchedule = todaysSchedule.filter(code => new ScheduleRow(code).rc == "A" || new ScheduleRow(code).rc == "B")
      }
      insertScheduleDOM(todaysSchedule, tasks, showPerson)
    })
    .then(_ => buildEventListeners())
}

function fromCodesToTasks(codes) {
  const tasks = []
  codes.forEach(code => {
    tasks.push(new Task(code))
  })
  return tasks
}

function insertScheduleDOM(scheduleCodes, tasks, showPerson) {
  const dailyContainer = document.getElementById('dailyChores')
  const otherContainer = document.getElementById('otherChores')
  dailyContainer.innerHTML = ""
  otherContainer.innerHTML = ""
  scheduleCodes.map(scheduleCode => new ScheduleRow(scheduleCode)).forEach(scheduleRow => createScheduleDOMRow(dailyContainer, otherContainer, scheduleRow, tasks, showPerson))
}

function createScheduleDOMRow(dailyContainer, otherContainer, scheduleRow, tasks, showPerson) {
  const chore = CHORES[scheduleRow.tc]
  const person = calculatePerson(scheduleRow, tasks)
  const checkboxCol = buildCheckboxCol(scheduleRow, tasks)
  const personRow = showPerson ? `<td>${person}</td>` : ""

  if (scheduleRow.cc == "D") {
    dailyContainer.innerHTML += `
    <tr>
      <th scope="row">${chore}</th>
      ${personRow}
      <td>${checkboxCol}</td>
    </tr>
    `
  }
  else {
    otherContainer.innerHTML += `
    <tr>
      <th scope="row">${chore}</th>
      ${personRow}
      <td>${checkboxCol}</td>
    </tr>
    `
  }
}

function calculatePerson(scheduleRow, tasks) {
  let person = PERSON[scheduleRow.rc]
  if (scheduleRow.rc == "B") {
    person = "Both"
  }
  return person
}

function buildCheckbox(id, checked, disabled) {
  const htmlId = disabled ? "" : `id="schedule-input-${id}"`
  return `<input class="form-check-input" type="checkbox" ${htmlId} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />`
}

function buildCheckboxCol(scheduleRow, tasks) {
  if (scheduleRow.cc == "2") {
    const checkboxes = `
    <div class="row">
      <div class="col-2">${buildCheckbox(checkboxIndex, false, false)}</div>
      <div class="col-2">${buildCheckbox(checkboxIndex, false, true)}</div>
    </div>
    `
    checkboxIndex++
    return checkboxes
  }
  if (scheduleRow.cc == "1") {
    const checkboxes = `
    <div class="row">
      <div class="col-2">${buildCheckbox(checkboxIndex, true, true)}</div>
      <div class="col-2">${buildCheckbox(checkboxIndex, false, false)}</div>
    </div>
    `
    checkboxIndex++
    return checkboxes
  }
  const checkbox = buildCheckbox(checkboxIndex)
  checkboxIndex++
  return checkbox
}

function buildEventListeners() {
  for (let i = 0; i < checkboxIndex; i++) {
    const checkbox = document.getElementById(`schedule-input-${i}`)
    if (checkbox) {
      checkbox.addEventListener('click', function (event) {
        const checkboxId = event.target.id.split('-')[2]
        const scheduleRow = new ScheduleRow(todaysSchedule[checkboxId])
        fetch(`${env.apiBaseUrl}/chores/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: `${scheduleRow.tc}${scheduleRow.rc}${scheduleGenerator.getDayNumber().toString().padStart(3, '0')}`
        }).then(_ => {
          setTimeout(() => {
            main(showPerson, user)
          }, 3000)
        })
      })
    }
  }
}

module.exports = {
  main
}