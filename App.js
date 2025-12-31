// Yi amfani da Config dinka da kika samar
const firebaseConfig = {
  apiKey: "AIzaSyBdKV8-6-ZGqlEd992kBJkSSBrgSJGve8Y",
  authDomain: "sani-sk.firebaseapp.com",
  databaseURL: "https://sani-sk-default-rtdb.firebaseio.com",
  projectId: "sani-sk",
  storageBucket: "sani-sk.firebasestorage.app",
  messagingSenderId: "811888329988",
  appId: "1:811888329988:web:fc6a67cf841a542a1dbc51"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// 1. Rijista
function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, pass)
        .then((user) => {
            alert("Rijista ta kammala!");
            saveUser(user.user.uid, email);
        }).catch(err => alert(err.message));
}

// 2. Login
function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
            loadNews();
        }).catch(err => alert(err.message));
}

// 3. Labarai
function loadNews() {
    const news = [
        "Yadda zaka zama babban mawaki",
        "Labarin soyayya tsakanin Sani da Maryam",
        "Sirrin zaman lafiya a Sk-abokai",
        "Abubuwan mamaki 5 da ke faruwa a duniyar AI",
        "Yadda ake cin abinci mai gina jiki"
    ];
    const list = document.getElementById('news-list');
    list.innerHTML = news.map(n => `<li>${n}</li>`).join('');
}

// 4. Canza Shafuka
function showTab(tabName) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
          }
              
