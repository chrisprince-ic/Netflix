// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       
       // Store user info in Firestore
       await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: name,
          authProvider: 'local',
          email
       });

       toast.success("Signup successful!");

    } catch (error) {
        console.error("Signup Error:", error);
        toast.error(error.message || "Signup failed");  
    }
}

const login = async (email, password) => {
    try {
        // Ensure login completes before continuing
        const res = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");

        return res.user; // Optional: return user data if needed

    } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.message || "Login failed");
    }
}

const logout = async () => {
    try {
        await signOut(auth);
        toast.info("Logged out successfully.");
    } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Logout failed.");
    }
}

export { signup, login, logout, db, auth };
