import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIhbPrKDg4je6pq_DAY52FIoge2iI7cy8",
  authDomain: "ancap-map.firebaseapp.com",
  projectId: "ancap-map",
  storageBucket: "ancap-map.appspot.com",
  messagingSenderId: "306255771606",
  appId: "1:306255771606:web:ac37cc90e38e8bef29d677",
  measurementId: "G-8YX94PZEDV",
};

// Inicializar o Firebase App (somente uma vez)
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializar o Auth com AsyncStorage
let auth;
try {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Fallback para `getAuth` caso o Auth já tenha sido inicializado
  auth = getAuth(firebaseApp);
}

// Inicializar o Firestore
const firestore = getFirestore(firebaseApp);

// Exportar as instâncias
export { firebaseApp, auth, firestore };
