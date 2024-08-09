// Import and configure Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle registration with email and password
document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registration successful
            alert('Registration successful!');
            // Redirect or handle success
        })
        .catch((error) => {
            // Handle errors
            console.error(error.message);
            alert('Registration failed: ' + error.message);
        });
});

// Google registration
document.getElementById('google-register-button').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Successful registration
            alert('Registered with Google!');
            // Redirect or handle success
        })
        .catch((error) => {
            // Handle errors
            console.error(error.message);
            alert('Google registration failed: ' + error.message);
        });
});

// Facebook registration
document.getElementById('facebook-register-button').addEventListener('click', () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Successful registration
            alert('Registered with Facebook!');
            // Redirect or handle success
        })
        .catch((error) => {
            // Handle errors
            console.error(error.message);
            alert('Facebook registration failed: ' + error.message);
        });
});
