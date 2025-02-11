document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showErrorMessage("Both fields are required.");
        return;
    }

    const loginData = { email, password };
    const loginLoadingOverlay = document.getElementById("loginLoadingOverlay");
    const loginSuccessOverlay = document.getElementById("loginSuccessOverlay");

    // Show loading spinner
    loginLoadingOverlay.style.display = "flex";

    try {
        const response = await fetch("https://localhost:7094/api/User/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        loginLoadingOverlay.style.display = "none"; // Hide loading spinner

        if (!response.ok) {
            const textResponse = await response.text();
            try {
                const jsonResponse = JSON.parse(textResponse);
                showErrorMessage(jsonResponse.message || "Invalid login details.");
            } catch (error) {
                showErrorMessage("Invalid login details.");
            }
            return;
        }

        const data = await response.json();
        const { userId, email, token, role, firstName } = data;

        // Store user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("firstName", firstName); // Store first name

        // Show success checkmark
        loginSuccessOverlay.style.display = "flex";
        setTimeout(() => {
            window.location.href = "/index.html"; // Redirect after success
        }, 2000);

        // Call the navbar update function to immediately reflect the login
        updateNavbar(firstName);

    } catch (error) {
        loginLoadingOverlay.style.display = "none";
        showErrorMessage("Something went wrong. Please try again.");
    }
});

// Function to update the navbar with the first letter of the user's first name
function updateNavbar(firstName) {
    const firstLetter = firstName.charAt(0).toUpperCase(); // Get the first letter and capitalize it

    // Update the desktop navbar login link to show the user's first letter
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        authLink.innerHTML = `<span class="user-badge">${firstLetter}</span>`; // Update desktop link
    }

    // Update the mobile navbar login link to show the user's first letter
    const mobileAuthLink = document.getElementById('mobile-auth-link');
    if (mobileAuthLink) {
        mobileAuthLink.innerHTML = `<span class="user-badge">${firstLetter}</span>`; // Update mobile link
    }
}