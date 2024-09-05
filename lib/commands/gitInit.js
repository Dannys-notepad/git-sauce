const fs = require('fs')
const asyncExec = require('../../utils/asyncExec.js')
const emptyDir = require('../../utils/emptyDir.js')

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')


const config = require('../../config.json')
const filePath = config[0].path
const accessToken = config[0].accessToken
const userName = config[0].userName
const userEmail = config[0].userEmail
const repoName = config[0].nameOfRepository
const gitLink = config[0].githubLink + userName
const tempRepo = gitLink.replace('[]', accessToken)
const repoUrl = tempRepo + '/' + repoName

const gitInit = async () => {
  if(fs.existsSync('.git')){
    nuetral('Git has already been initialized in this directory')
  }else if(!fs.existsSync('.git')){
    await asyncExec('git config --global --replace-all init.defaultBranch ' + config[0].branch)
    await asyncExec('git init')
    await asyncExec(`git config --global user.email ${userEmail}`)
    await asyncExec(`git config --global user.name ${userName}`)
    await asyncExec(`git branch -m ${config[0].branch}`)
    await asyncExec(`git remote add ${repoName} ${repoUrl}`)
    await asyncExec('git add .')
    success('Git successfully initialized without errors')
  }
}

module.exports = gitInit