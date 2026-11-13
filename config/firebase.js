import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'
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

export default db;