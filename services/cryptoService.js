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

export function encrypt(text) {
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64')
}

export function decrypt(encrypted) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString()
}