const fs = require('fs')
const localSettings = JSON.parse(fs.readFileSync('local.settings.json', 'utf8'))
module.exports = {
  storageConnectionString: localSettings.storageConnectionString,
  corsUrl: 'http://localhost:1234'
}
