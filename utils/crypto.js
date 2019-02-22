const crypto = require('crypto')
const algorithm = 'aes-192-cbc'
const password = 'WPVD0Wya7bT88MliorYQF4orngAv6jQ6'
const salt = 'qx7sChFJopmQp9U4'
const iv = '2ryoUDFkSpczi1Bm'
let key
crypto.scrypt(password, salt, 24, (err, derivedKey) => {
    if (err) throw err
    key = derivedKey
})

const encrypt = data => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

const decrypt = data => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

module.exports = { encrypt, decrypt }
