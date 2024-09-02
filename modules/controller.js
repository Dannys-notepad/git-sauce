const fs = require('fs')

const { asyncExec } = require('./promises')

const config = require('../config')
const filePath = config[0].path
const accessToken = config[0].accessToken
const userName = config[0].userName
const userEmail = config[0].userEmail
const repoName = config[0].nameOfRepository
const gitLink = config[0].githubLink + userName
const tempRepo = gitLink.replace('[]', accessToken)
const repoUrl = tempRepo + '/' + repoName


const changeDir = async () => {
  try {
    const pathExits = await fs.existsSync(filePath)
    if(pathExits){
      process.chdir(filePath)
      return true
    }
  } catch (e) {
    console.error(e)
  }
}


const gitInit = async () => {
  try {
    await asyncExec('git config --global --replace-all init.defaultBranch ' + config[0].branch)
    await asyncExec('git init')
    await asyncExec(`git config --global user.email ${userEmail}`)
    await asyncExec(`git config --global user.name ${userName}`)
    await asyncExec(`git branch -m ${config[0].branch}`)
    await asyncExec(`git remote add origin ${repoName}`)
    await asyncExec('git add .')
    console.log('Initialization process completed without errors')
    
  } catch (e) {
    console.error(e)
  }
}

const pushToRepo = async () => {
  try {
    await asyncExec('git add .')
    await asyncExec(`git commit -m "${config[0].commitMessage}"`)
    await asyncExec(`git push -u ${repoUrl} ${config[0].branch}`)
    await console.log('Successfully pushed refs to remote repo ' + repoName)
  } catch (e) {
    console.error(e)
  }
}


module.exports = {
  changeDir,
  gitInit,
  pushToRepo
}

