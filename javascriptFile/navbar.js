// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('active');
});

window.onload = () => {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');

    if (token && firstName) {
        const firstLetter = firstName.charAt(0).toUpperCase();

        // Update the navbar to show the user badge and menu
        const authContainer = document.getElementById('auth-link');
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="user-container">
                    <span class="user-badge" id="userBadge">${firstLetter}</span>
                    <div class="user-menu" id="userMenu">
                        <a href="/dashboard.html">Dashboard</a>
                        <a href="/profile.html">Profile</a>
                        <a href="#" id="sign-out">Sign Out</a>
                    </div>
                </div>`;
            authContainer.removeAttribute("href"); // Prevent it from acting like a link
        }

        // Mobile navbar update
        const mobileAuthContainer = document.getElementById('mobile-auth-link');
        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <div class="user-container">
                    <span class="user-badge" id="mobileUserBadge">${firstLetter}</span>
                    <div class="user-menu" id="mobileUserMenu">
                        <a href="/dashboard.html">Dashboard</a>
                        <a href="/profile.html">Profile</a>
                        <a href="#" id="mobile-sign-out">Sign Out</a>
                    </div>
                </div>`;
            mobileAuthContainer.removeAttribute("href"); // Prevent it from acting like a link
        }

        // Function to toggle dropdown menu
        function toggleMenu(event) {
            event.stopPropagation();
            const menu = this.nextElementSibling;
            menu.classList.toggle("active");
        }

        // Add event listeners for toggling menu
        document.getElementById('userBadge')?.addEventListener('click', toggleMenu);
        document.getElementById('mobileUserBadge')?.addEventListener('click', toggleMenu);

        // Hide menu when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.user-menu').forEach(menu => menu.classList.remove('active'));
        });

        // Sign Out function
        function signOut() {
            localStorage.clear();
            window.location.href = '/index.html';
        }

        document.getElementById('sign-out')?.addEventListener('click', signOut);
        document.getElementById('mobile-sign-out')?.addEventListener('click', signOut);
    }
};
