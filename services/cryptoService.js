import crypto from 'crypto'
import fs from 'node:fs'



crypto.generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
}, (err, publicKey, privateKey) => {
    if (err) return console.error('Error generating keys:', err)

    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('Sensitive Data'))
    console.log('Encrypted with public key:', encrypted.toString('base64'))

    const decrypted = crypto.privateDecrypt(privateKey, encrypted)
    console.log('Decrypted with private key:', decrypted.toString())
})
