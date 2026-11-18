import {addDoc, collection, deleteDoc, doc, getDoc, getDocs} from 'firebase/firestore'
import {db} from "../config/firebase.js"
import {Chat} from "../models/Chat.js"


const chatConverter = {
    toFirestore: chat => {
        return {
            name: chat.name,
            owner: chat.owner,
            dateCreated: chat.dateCreated
        }
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Chat(data.name, data.owner, snapshot.id, data.dateCreated.toDate())
    }
}
const chatCollection = collection(db,"chats").withConverter(chatConverter)

export async function getChats() {
    const snapshot = await getDocs(chatCollection)
    return snapshot.docs.map(doc => doc.data())
}

export async function getChat(id) {
    const chatDoc = await getDoc(doc(chatCollection, id))
    return chatDoc.data()
}

export async function deleteChat(id) {
    await deleteDoc(doc(chatCollection, id))
}

export async function createChat(chat) {
    const ref = await addDoc(chatCollection, chat)
    return ref.id
}

