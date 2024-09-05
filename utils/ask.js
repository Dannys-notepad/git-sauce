const error = require('./error.js')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = async (que) => {
  console.log(que)
  return new Promise((resolve, reject) => {
    rl.question('~> ', (answer) => {
      if(answer){
        resolve(answer)
      }
      reject(answer)
    })
  }).catch(e => error(e))
}

module.exports = ask