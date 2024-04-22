import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, child, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
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
let repairInp = document.getElementById('repairInp')


let retBtn = document.getElementById('retBtn');
let repBtn = document.getElementById('repBtn');
let appBtn = document.getElementById('appBtn');

function retData() {

    const dbRef = ref(db);

    get(child(dbRef, 'reqVehicle/' + reqCodeInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            reqCodeInp.value = snapshot.val().requestcode;
            employeeInp.value = snapshot.val().employeecode;
            typeInp.value = snapshot.val().vehicletype;
            destInp.value = snapshot.val().destination;
            repairInp.value = snapshot.val().repairInp;
        }
        else {
            alert("Request Code Does Not Exist");
        }
    })
        .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
        })
}

function repairData() {
    update(ref(db, 'reqVehicle/' + reqCodeInp.value), {
        repairment: true,
    })
        .then(() => {
            alert("Vehicle Repaired Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
        })
}

function approveData() {
    update(ref(db, 'reqVehicle/' + reqCodeInp.value), {
        approved: true,
    })
        .then(() => {
            alert("Request Approved Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
        })
}

retBtn.addEventListener('click', retData);
repBtn.addEventListener('click', repairData);
appBtn.addEventListener('click', approveData);

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
            var column = "<tr><td>" + childData.requestcode + "<td>" + childData.employeecode + "<td>" + childData.vehicletype + "<td>" + childData.destination + "<td>" + childData.repairment + "<td>" + childData.approved + "<tr>"

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