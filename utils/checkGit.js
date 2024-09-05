const { exec } = require('child_process')

const checkGit = () => {
  return new Promise((resolve, reject) => {
    exec('git --version', (err, stdout, stderr) => {
      if(err || stderr) return reject(false)
      resolve(true)
    })
  }).catch(e => console.log(e))
}

module.exports = checkGit