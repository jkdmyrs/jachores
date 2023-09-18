const fs = require('fs')

const configFile = 'env.tokenized.js'
let configContent = fs.readFileSync(configFile, 'utf8')
configContent = configContent.replace('__STORAGECONN__', process.env.STORAGECONN)
fs.writeFileSync(configFile, configContent, 'utf8')
