import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: process.env.REACT_APP_KEY,
        authDomain: process.env.REACT_APP_KEY_AUTH,
        projectId: process.env.REACT_APP_KEY_ID,
        storageBucket: process.env.REACT_APP_KEY_BUCKET,
        messagingSenderId: process.env.REACT_APP_KEY_SENDER,
        appId: process.env.REACT_APP_KEY_AID,
      }
    
  
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database ={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
// export default firebase;