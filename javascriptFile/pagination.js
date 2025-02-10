// Function to show posts for a specific page
function showPage(pageNumber) {
    const allStories = document.querySelectorAll('.story');
    allStories.forEach(story => {
        if (story.getAttribute('data-page') === pageNumber.toString()) {
            story.style.display = 'flex'; // Show posts for the current page
        } else {
            story.style.display = 'none'; // Hide posts for other pages
        }
    });

    // Update active state of pagination links
    document.querySelectorAll('.page-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageNumber.toString()) {
            link.classList.add('active');
        }
    });
}

// Function to handle pagination clicks
document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior

        const pageNumber = this.getAttribute('data-page');
        if (pageNumber) {
            showPage(pageNumber); // Show the selected page
        } else if (this.classList.contains('next')) {
            // Handle "Next" button click
            const activeLink = document.querySelector('.page-link.active');
            const nextPage = parseInt(activeLink.getAttribute('data-page')) + 1;
            if (nextPage <= document.querySelectorAll('.page-link[data-page]').length) {
                showPage(nextPage);
            }
        }
    });
});

// Show the first page by default
showPage(1);