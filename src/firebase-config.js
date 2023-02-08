import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD-0loLAX3sQQP167xkYs6hp5JuXn8n4UE",
  authDomain: "fir-9-e902b.firebaseapp.com",
  projectId: "fir-9-e902b",
  storageBucket: "fir-9-e902b.appspot.com",
  messagingSenderId: "995809805787",
  appId: "1:995809805787:web:d50bb9fae1520813ef13fe",
  measurementId: "G-7N86SE9VXB",
}

// if we want to connect firebase we have to initilize it first

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
