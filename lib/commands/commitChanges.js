const asyncExec = require('../../utils/asyncExec.js')
const internetConnection = require('../../utils/internetConnection.js')

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')

const config = require('../../config.json')
const accessToken = config[0].accessToken
const userName = config[0].userName
const repoName = config[0].nameOfRepository
const gitLink = config[0].githubLink + userName
const tempRepo = gitLink.replace('[]', accessToken)
const repoUrl = tempRepo + '/' + repoName

const commitChanges = async () => {
  let internet = await internetConnection()
  if(internet){
    await asyncExec('git add .')
    await asyncExec(`git commit -m "${config[0].commitMessage}"`)
    let commit = await asyncExec(`git push -u ${repoName} ${config[0].branch}`)
  }else if(!internet){
    error('Internet connection is need to commit changes to remote repo')
  }
}

module.exports = commitChanges