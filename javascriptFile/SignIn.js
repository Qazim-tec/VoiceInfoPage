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
            const textResponse = await response.text(); // Read response as text
            try {
                const jsonResponse = JSON.parse(textResponse); // Attempt to parse JSON
                showErrorMessage(jsonResponse.message || "Invalid login details.");
            } catch (error) {
                showErrorMessage("Invalid login details."); // Show generic error if JSON parsing fails
            }
            return;
        }

        const data = await response.json();
        const { userId, email, token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        // Show success checkmark
        loginSuccessOverlay.style.display = "flex";
        setTimeout(() => {
            window.location.href = "/index.html"; // Redirect after success
        }, 2000);
    } catch (error) {
        loginLoadingOverlay.style.display = "none";
        showErrorMessage("Something went wrong. Please try again.");
    }
});

// Function to display error message
function showErrorMessage(message) {
    let errorMessage = document.getElementById("loginErrorMessage");
    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.id = "loginErrorMessage";
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "10px";
        document.querySelector(".login-form").appendChild(errorMessage);
    }
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}
