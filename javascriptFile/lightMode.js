// Toggle dark/light mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    const themeButtons = document.querySelectorAll('.desktop-mode-toggle, .mobile-mode-toggle');
    const isDarkMode = body.classList.contains('dark-mode');

    themeButtons.forEach(button => {
        button.textContent = isDarkMode ? '☀️' : '🌙';
    });
}

// Initialize theme buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.desktop-mode-toggle, .mobile-mode-toggle').forEach(button => {
        button.addEventListener('click', toggleMode);
    });
});