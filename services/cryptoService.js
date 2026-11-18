import crypto from 'crypto'
import fs from 'node:fs'

if (!fs.existsSync('./privat_noegle.pem')) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    })
    fs.writeFileSync('./offentlig_noegle.pem', publicKey)
    fs.writeFileSync('./privat_noegle.pem', privateKey)
}

const publicKey = fs.readFileSync('./offentlig_noegle.pem', 'utf-8')
const privateKey = fs.readFileSync('./privat_noegle.pem', 'utf-8')

const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('Sensitive Data'))
console.log('Encrypted:', encrypted.toString('base64'))

const decrypted = crypto.privateDecrypt(privateKey, encrypted)
console.log('Decrypted:', decrypted.toString())