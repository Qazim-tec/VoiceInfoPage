// document.addEventListener('DOMContentLoaded', function () {
//     const authLink = document.getElementById('auth-link');
//     const authDropdown = document.getElementById('auth-dropdown');

//     // Check if user data exists in localStorage
//     const userData = JSON.parse(localStorage.getItem('user'));

//     if (userData) {
//         // User is logged in, update the UI
//         authLink.innerHTML = `
//             <img src="path/to/generic/avatar.png" alt="User Avatar" class="avatar">
//             ${userData.firstName} <span>&#9662;</span>
//         `;

//         // Update the dropdown content for logout
//         const dropdownContent = authDropdown.querySelector('.dropdown-content');
//         dropdownContent.innerHTML = `
//             <a href="#" onclick="logout()">Logout</a>
//         `;
//     } else {
//         // User is not logged in, keep the default login link
//         authLink.innerHTML = 'Login <span>&#9662;</span>';
//     }
// });

// // Logout function
// function logout() {
//     localStorage.removeItem('user');
//     window.location.href = '/loginSignUp/login.html'; // Redirect to login page
// }