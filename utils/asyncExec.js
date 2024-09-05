const { exec } = require("child_process")
const error = require('./error.js')

const asyncExec = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if(error || stderr) return reject(
        error ?? stderr
      )
      resolve(stdout)
    })
  }).catch(e => error(e))
}

module.exports = asyncExec