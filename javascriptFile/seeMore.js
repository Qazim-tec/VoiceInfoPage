document.addEventListener("DOMContentLoaded", () => {
    const seeMoreButtons = document.querySelectorAll(".see-more");

    seeMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const hiddenPosts = button.previousElementSibling.querySelector(".hidden-posts");
            hiddenPosts.style.display = "grid"; // Show hidden posts
            button.style.display = "none"; // Hide the "See More" button
        });
    });
});