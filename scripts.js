import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsfIKXHr0AY8RneP2VWpjdR038aMNkCsw",
    authDomain: "out-of-bounds-ojt-app.firebaseapp.com",
    projectId: "out-of-bounds-ojt-app",
    storageBucket: "out-of-bounds-ojt-app.firebasestorage.app",
    messagingSenderId: "1059978490785",
    appId: "1:1059978490785:web:d08f9e40b5b0e58efed1e0"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleLogin = document.getElementById("google-signin");

googleLogin.addEventListener("click", async () => {
  const auth = getAuth(app); 
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Sign-In Successful", user);
    navigateTo('main-page'); 
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    alert("Error: " + error.message); 
  }
});


function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}
