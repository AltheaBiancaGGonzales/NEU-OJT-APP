import { signInWithGoogle } from "./GoogleAuth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from "./GoogleAuth.js";

// Navigation function to switch between pages
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));  // Hide all pages
    document.getElementById(pageId).classList.remove('hidden');  // Show the target page
}

// Ensure that the Next Page button on the Main Page properly navigates to the Choices Page
document.getElementById("nextPageButton").addEventListener("click", () => {
    navigateTo('choices-page');  // Navigates to the choices-page
});

// Log out function
function logout() {
    auth.signOut().then(() => {
        navigateTo('login-page');
    }).catch((error) => {
        console.error("Error during sign-out:", error);
    });
}

// Update user profile in UI
function updateUserProfile(user) {
    document.getElementById("userName").textContent = `Welcome, ${user.displayName}`;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userProfilePicture").src = user.photoURL || "./logo/default-profile.png";
    navigateTo("main-page");
}

// Handle Google sign-in
document.getElementById("googleSignInButton").addEventListener("click", async () => {
    const user = await signInWithGoogle();

    if (user) {
        updateUserProfile(user);
    } else {
        alert("Please use your institutional email (@neu.edu.ph) to sign in.");
    }
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user && user.email.endsWith("@neu.edu.ph")) {
        updateUserProfile(user);
    } else {
        navigateTo("login-page");
    }
});
