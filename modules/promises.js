const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { exec } = require("child_process");
let isAndriod = false
let isEmpty = false
const platform = 'android'

const checkOS = async (os) => {
  return new Promise((resolve, reject) => {
    if(os === platform){
      isAndriod = true
      resolve(isAndriod)
    }else{
      reject(isAndriod)
    }
  }).catch((err) => {
    return err
  })
}

const asyncExec = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if(error || stderr) return reject(
        error ?? stderr
      )
      resolve(stdout)
    })
  })
} 

const ask = async (que) => {
  console.log(que)
  return new Promise((resolve, reject) => {
    rl.question('~> ', (answer) => {
      if(answer){
        resolve(answer)
      }
      reject(answer)
    })
  })
}

module.exports = {
  checkOS,
  asyncExec,
  ask,
}
