import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
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

const db = getDatabase();
const auth = getAuth();

let employeeInp = document.getElementById('employeeInp');
let typeInp = document.getElementById('typeInp');
let destInp = document.getElementById('destInp');
let reqCodeInp = document.getElementById('reqCodeInp');
let autoReqCode = document.getElementById('autoReqCode');



let addBtn = document.getElementById('addBtn');

function addData() {
    set(ref(db, 'reqVehicle/' + reqCodeInp.value), {
        requestcode: reqCodeInp.value,
        employeecode: employeeInp.value,
        vehicletype: typeInp.value,
        destination: destInp.value,
        repairment: false,
        approved: false
    }).then(() => {
        alert("Data Added Successfully");
    }).catch(() => {
        alert("Unsuccessful");
        console.log(error);
    })
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function generateRandomString() {
    const randomStringLength = 10; // Adjust the desired length here
    const randomString = makeid(randomStringLength);
    document.getElementById("reqCodeInp").value = randomString;
}


addBtn.addEventListener('click', addData);
autoReqCode.addEventListener('click', generateRandomString);

getBtn.addEventListener('click', (e) => {
    $('#dataTbl td').remove();

    var rowNum = 0;
    const dbRef = ref(db, 'reqVehicle/');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            // ...
            rowNum += 1;
            var column = "<tr><td>" + childData.requestcode + "<td>" + childData.employeecode + "<td>" + childData.vehicletype + "<td>" + childData.destination + "<td>" + childData.approved + "<td>" + childData.repairment + "<tr>"

            $(column).appendTo('#dataTbl')
        });
    }, {
        onlyOnce: true
    });
})

signoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert("Signed out successfully!")
      window.location.href = ('../login/index.html');
    }).catch((error) => {
      // An error happened.
      alert("Sign out error:")
      console.error(error);
    });
  });