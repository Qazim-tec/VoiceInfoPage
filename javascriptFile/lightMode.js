// Function to apply stored theme on page load
function applyStoredTheme() {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light

    body.classList.toggle('dark-mode', savedTheme === 'dark');
    body.classList.toggle('light-mode', savedTheme !== 'dark');

    updateThemeButton(savedTheme); // Update button icon
}

// Function to toggle theme
function toggleMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDarkMode);

    const newTheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme); // Save theme selection

    updateThemeButton(newTheme); // Update button icon
}

// Function to update theme button icons
function updateThemeButton(theme) {
    document.querySelectorAll('.desktop-mode-toggle, .mobile-mode-toggle').forEach(button => {
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

// Ensure script runs after header is loaded
document.addEventListener('DOMContentLoaded', () => {
    const waitForHeader = setInterval(() => {
        const themeButtons = document.querySelectorAll('.desktop-mode-toggle, .mobile-mode-toggle');
        if (themeButtons.length > 0) {
            clearInterval(waitForHeader); // Stop checking

            applyStoredTheme(); // Apply saved theme

            // Attach event listeners to the theme toggle buttons
            themeButtons.forEach(button => {
                button.addEventListener('click', toggleMode);
            });
        }
    }, 100); // Check every 100ms until buttons are found
});
