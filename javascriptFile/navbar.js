// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    const firstName = localStorage.getItem('firstName');  // Retrieve first name from localStorage

    // Check if the user is logged in
    if (token && firstName) {
        updateNavbar(firstName); // Update the navbar with the first letter of the user's first name
    } else {
        // If no token or firstName is found, show default "Login" text
        const authLink = document.getElementById('auth-link');
        if (authLink) {
            authLink.innerHTML = 'Login <span>&#9662;</span>';
        }

        // Update the mobile navbar login link to default "Login"
        const mobileAuthLink = document.getElementById('mobile-auth-link');
        if (mobileAuthLink) {
            mobileAuthLink.innerHTML = 'Login';
        }
    }
});