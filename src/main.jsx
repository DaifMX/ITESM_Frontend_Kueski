import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";

import './index.css'

import App from './App.jsx'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNm84a9yKFOaDVdhRCy4330xpydsmJ0gY",
  authDomain: "ch-react-daaf8.firebaseapp.com",
  projectId: "ch-react-daaf8",
  storageBucket: "ch-react-daaf8.firebasestorage.app",
  messagingSenderId: "563765118521",
  appId: "1:563765118521:web:72559d48992bd956b62fe8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
<StrictMode>
</StrictMode>,

*/
createRoot(document.getElementById('root')).render(
    <App />
)