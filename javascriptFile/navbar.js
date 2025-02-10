// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-mobile');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.querySelector('.dropdown-content-mobile').style.display = 'none';
        }
    });
});

// Toggle dropdown on mobile
document.querySelectorAll('.dropdown-mobile > a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const dropdownContent = this.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
});