import {addDoc, collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore'
import {db} from '../config/firebase.js'
import {Message} from '../models/Message.js'
import {encrypt, decrypt} from './cryptoService.js'




const messageConverter = {
    toFirestore: message => {
        return {
            message: encrypt(message.message),
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
    const ref = await addDoc(messageCollection, message)
    return ref.id
}
export async function getMessage(id) {
    const messageDoc = await getDoc(doc(messageCollection, id))
    return messageDoc.data()
}
export async function getMessagesByChat(chatId) {
    const snapshot = await getDocs(query(messageCollection, where('chatId', '==', chatId)))
    return snapshot.docs.map(d => d.data())
}

export async function getMessagesByUser(userId) {
    const snapshot = await getDocs(query(messageCollection, where('owner', '==', userId)))
    return snapshot.docs.map(d => d.data())
}