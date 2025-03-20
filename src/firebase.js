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
  apiKey: "AIzaSyAiFn8Ija_60-sP5zc-OIDd4ZxEwjMpdwU",
  authDomain: "netflix-clone-2d351.firebaseapp.com",
  projectId: "netflix-clone-2d351",
  storageBucket: "netflix-clone-2d351.firebasestorage.app",
  messagingSenderId: "804924235696",
  appId: "1:804924235696:web:8f4e87d3d9db87e9958075"
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
