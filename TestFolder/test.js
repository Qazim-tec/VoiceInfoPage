document.addEventListener("DOMContentLoaded", () => {
    const modeToggle = document.getElementById("mode-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const body = document.body;
    const mobileMenu = document.querySelector(".mobile-menu");

    // Dark Mode Toggle
    modeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        modeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });
});
