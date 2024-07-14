/*Git-sauce v2.0*/
/*From Dannys-notepad*/
/*For Termux/Andriod users only*/

const fs = require('fs')

const config = require('./config')
const repoName = config[0].nameOfRepository
const filePath = config[0].path
const OS = process.config.variables.OS

const gitFolder = '.git'

const { asyncExec, checkOS, ask } = require('./modules/promises')
  const { changeDir, gitInit, pushToRepo } = require('./modules/controller')

const subProcess1 = async () => {
  try {
    const gitVersion = await asyncExec('git -v')
    console.log(gitVersion)
    if(!fs.existsSync(gitFolder)){
      await gitInit()
      //console.log('Current git status is....')
      //await asyncExec('git status')
    }
  }catch (e) {
    console.error(e)
  }
}

const subProcess2 = async () => {
  try{
    await pushToRepo()
  } catch (e) {
    console.error(e)
  }
}

const startScript = async () => {
  console.clear()
  const start = await checkOS(process.config.variables.OS)
  if(start){
    console.log('Script Started')
    const changedir = await changeDir()
    if(changedir){
      await subProcess1()
      console.log('Welcome to Git-sauce v2.0')
      console.log(`/*****${filePath}*****/\n`)
      console.log(' 1. Push to remote repo\n 2. Delete remote repo \n')
      let askQue = await ask('What git operation would you like to try out')
      switch(+askQue){
        case 1:
          await subProcess2()
          process.exit()
          break
        case 2:
          console.log('>_< this feature is under development')
          process.exit()
          break
        default:
          console.log('Oops...you entered an invalid input, try again')
          process.exit()
      }
    } else {
      console.log(`The directory ${filePath} does not exist, recheck the path specified in the config file`)
      process.exit(0)
    }

  }else{
    console.error('Sorry you\'re not an Andriod user')
    process.exit()
  }
}

startScript()
