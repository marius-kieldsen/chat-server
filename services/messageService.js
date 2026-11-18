import {addDoc, collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore'
import {db} from '../config/firebase.js'
import {Message} from '../models/Message.js'
import {encrypt, decrypt} from './cryptoService.js'




const messageConverter = {
    toFirestore: message => {
        return {
            message: encrypt(message.text),
            owner: message.owner,
            chatId: message.chatId,
            createDate: message.createDate
        }
    }
}
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Message(snapshot.id, decrypt(data.message), data.owner, data.chatId, data.createDate.toDate())
    }
}

const messageCollection = collection(db, 'messages').withConverter(messageConverter)

export async function createMessage(message) {

}
export async function getMessage(id) {

}
export async function getMessagesbyChat(chatId) {

}
export async function getMessagebyOwner(userId) {

}