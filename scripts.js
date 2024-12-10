import { signInWithGoogle } from "./GoogleAuth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from "./GoogleAuth.js";

function navigateTo(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

function logout() {
    // Clear user session data if needed
    console.log("User logged out.");
    navigateTo("login-page");
}

// Update user profile in UI
function updateUserProfile(user) {
    document.getElementById("userName").textContent = `Welcome, ${user.displayName}`;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userProfilePicture").src = user.photoURL || "./logo/default-profile.png";
    navigateTo("main-page");
}

// Attach event listener to the Google sign-in button
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
