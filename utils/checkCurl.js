const { exec } = require('child_process')

const checkCurl = () => {
  return new Promise((resolve, reject) => {
    exec('curl --version', (err, stdout, stderr) => {
      if(err || stderr) return reject(false)
      resolve(true)
    })
  }).catch(e => console.log(e))
}

module.exports = checkCurl