const asyncExec = require('../../utils/asyncExec.js')
const checkInternet = require('../../utils/internetConnection.js')

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')

const config = require('../../config.json')
const userName = config[0].userName
const repoName = config[0].nameOfRepository
const gitLink = config[0].githubLink + userName
const tempRepo = gitLink.replace('[]@', '')
const repoUrl = tempRepo + '/' + repoName

const pullChanges = async () => {
  let internet = await checkInternet()
  if(internet){
    let pull = await asyncExec(`git pull "${repoUrl}" ${config[0].branch}`)
    console.log(pull)
  }else{
    error('Can\'t pull refs without internet connection')
  }
}

module.exports = pullChanges