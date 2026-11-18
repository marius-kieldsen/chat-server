import crypto from 'crypto'


const algorithm ='aes-256-cbc'
const key = crypto.randomBytes(32)  // gem key som fast nøgle så ingen tidligere misset beskeder

function encrypt(text) {
    const iv = crypto.randomBytes(16)
    // resterende kode her
}