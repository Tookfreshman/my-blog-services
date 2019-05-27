const UserInfo = require('../models/userInfo.js')

/**
 *
 *
 * @param {*} userName
 * @returns
 */
function userInfoIsExist(userName) {
  return new Promise((resolve, reject) => {
    UserInfo.find({ userName: userName }, (err, result) => {
      let res = false
      if (err) {
        return reject(err)
      }
      if (!result.length) {
        res = false
      } else {
        res = true
      }
      return resolve(res)
    })
  })
}

module.exports = userInfoIsExist
