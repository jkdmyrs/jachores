const fs = require('fs')

const serverConfig = 'env_server.tokenized.js'
let serverConfigContent = fs.readFileSync(serverConfig, 'utf8')
// replacements
serverConfigContent = serverConfigContent.replace('__STORAGECONN__', process.env.STORAGECONN)
fs.writeFileSync(serverConfig, configContent, 'utf8')

const webConfig = 'env_web.tokenized.js'
let webConfigContent = fs.readFileSync(webConfig, 'utf8')
// replacements
fs.writeFileSync(webConfig, configContent, 'utf8')
