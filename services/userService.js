import {addDoc, collection, deleteDoc, doc, getDoc, getDocs} from 'firebase/firestore'
import {db} from "../config/firebase.js";
import {User} from "../models/User.js";

const userConverter = {
    toFirestore: user => {
        return {
            username: user.username,
            password: user.password,
            accessLevel: user.accessLevel,
            dateCreated: user.dateCreated
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const id = snapshot.id;
        return new User(id, data.username, data.password, data.accessLevel, data.dateCreated);

    }
}
const userCollection = collection(db, "users").withConverter(userConverter);

export async function addUser(user) {
    const ref = await addDoc(userCollection, user);
    return ref.id;
}

export async function getUser(id) {
    const userQueryDocument = await getDoc(doc(userCollection, id))
    return userQueryDocument.data()
}

export async function deleteUser(id) {
    await deleteDoc(doc(userCollection, id))
}

export async function getUsers() {
    const userQuerySnapshot = await getDocs(userCollection)
    return userQuerySnapshot.docs.map(doc => doc.data())
}