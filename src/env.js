const fs = require('fs')
const localSettings = JSON.parse(fs.readFileSync('local.settings.json', 'utf8'))
module.exports = {
  apiBaseUrl: 'http://localhost:3000',
  storageConnectionString: localSettings.storageConnectionString,
  corsUrl: 'http://localhost:1234'
}
