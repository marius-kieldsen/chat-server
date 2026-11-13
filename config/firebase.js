import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBraYCua6ZV_TFvaGjQnbbfRbozXlIPFk4",
    authDomain: "chat-server-9853a.firebaseapp.com",
    projectId: "chat-server-9853a",
    storageBucket: "chat-server-9853a.firebasestorage.app",
    messagingSenderId: "428646575982",
    appId: "1:428646575982:web:360efdd78cd344de6f9b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
const userCollection = collection(db, "users")

function addUser(user) {
    addDoc(userCollection.withConverter(userConverter), user)
}

async function getUser(id) {
    const userQueryDocument = await getDoc(doc(userCollection, id))
    return userQueryDocument.data()
}

function deleteUser(user) {
    try {
        deleteDoc(doc(userCollection, user.id))
    } catch (error) {
        console.log(error)
    }
}

export default app;
