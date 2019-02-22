const otplib = require('otplib')

const secret = 'OU3EYVSIHFXWY3TNK43GY2KTGN5FE43E'

const verify = token => {
    return otplib.authenticator.check(token, secret)
}

module.exports = { verify }
