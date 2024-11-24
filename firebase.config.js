import { initializeApp, getApps, getApp } from "firebase/app"; 
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// **Configuração do Firebase**
// Este objeto contém todas as credenciais necessárias para conectar o app ao Firebase.
// Informações como `apiKey`, `authDomain`, `projectId` e outros são fornecidas ao criar o projeto no Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDIhbPrKDg4je6pq_DAY52FIoge2iI7cy8", // Chave de API usada para autenticar chamadas ao Firebase.
  authDomain: "ancap-map.firebaseapp.com", // Domínio de autenticação para o login dos usuários.
  projectId: "ancap-map", // Identificador único do projeto no Firebase.
  storageBucket: "ancap-map.appspot.com", // Usado para armazenar arquivos no Firebase Storage.
  messagingSenderId: "306255771606", // ID usado para configurar notificações push (Firebase Cloud Messaging).
  appId: "1:306255771606:web:ac37cc90e38e8bef29d677", // ID exclusivo da aplicação.
  measurementId: "G-8YX94PZEDV", // ID usado para análises (opcional, relacionado ao Google Analytics).
};

// **Inicializar o Firebase App**
// Esta parte garante que o Firebase seja inicializado apenas uma vez.
// O `getApps()` verifica se o app já foi inicializado. Caso não, o `initializeApp()` é chamado.
// Isso evita erros de inicialização duplicada.
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// **Inicializar o Auth com AsyncStorage**
// `initializeAuth` configura o Firebase Authentication com suporte para persistência local no React Native.
// `AsyncStorage` é usado para armazenar o estado do login, garantindo que o usuário continue autenticado entre sessões.
let auth;
try {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage), // Define o AsyncStorage como mecanismo de persistência.
  });
} catch (error) {
  // Caso o Auth já tenha sido inicializado anteriormente, usamos `getAuth` para reutilizar a instância existente.
  auth = getAuth(firebaseApp);
}

// **Inicializar o Firestore**
// `getFirestore` retorna uma instância do Firestore, que é o banco de dados NoSQL do Firebase.
// Usado para salvar, buscar e gerenciar dados do aplicativo.
const firestore = getFirestore(firebaseApp);

// **Exportar as instâncias**
// Exporta o app Firebase (`firebaseApp`), a instância do Authentication (`auth`) e a do Firestore (`firestore`).
// Essas exportações permitem que outras partes do código usem esses serviços.
export { firebaseApp, auth, firestore };
