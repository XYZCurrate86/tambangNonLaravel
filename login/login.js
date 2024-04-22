
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZ6I4_GY_NDjel5xknN8Sd7IXw4oqrJqs",
    authDomain: "tambang-api.firebaseapp.com",
    databaseURL: "https://tambang-api-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tambang-api",
    storageBucket: "tambang-api.appspot.com",
    messagingSenderId: "505750074416",
    appId: "1:505750074416:web:3a2bd8eccdfc0891e0a9f5",
    measurementId: "G-V46D6TBX4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener('click', function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Logging In...")

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

    auth.onAuthStateChanged((user) => {
        if (user) {
            const role = user.customClaims?.role; // Check if custom claim exists
            if (email === "admin@gmail.com") {
                window.location.href = ('../admin/index.html');
            } else {
                window.location.href = ('../approval/index.html');
            }
        } else {
            // User is not signed in
        }
    });

})
