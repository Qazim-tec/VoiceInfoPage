// Get elements
const passwordInput = document.getElementById('password');
const lengthRequirement = document.getElementById('length-requirement');
const uppercaseRequirement = document.getElementById('uppercase-requirement');
const numberRequirement = document.getElementById('number-requirement');
const specialRequirement = document.getElementById('special-requirement');
const form = document.querySelector('.signup-form');
const loadingOverlay = document.getElementById('signupLoadingOverlay');
const successOverlay = document.getElementById('signupSuccessOverlay');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordErrorMessage = document.getElementById('password-error');

// Validate password on input
passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;

    // Check length (at least 8 characters)
    lengthRequirement.classList.toggle('valid', password.length >= 8);
    lengthRequirement.classList.toggle('invalid', password.length < 8);

    // Check for at least one uppercase letter
    uppercaseRequirement.classList.toggle('valid', /[A-Z]/.test(password));
    uppercaseRequirement.classList.toggle('invalid', !/[A-Z]/.test(password));

    // Check for at least one number
    numberRequirement.classList.toggle('valid', /\d/.test(password));
    numberRequirement.classList.toggle('invalid', !/\d/.test(password));

    // Check for at least one special character
    specialRequirement.classList.toggle('valid', /[!@#$%^&*]/.test(password));
    specialRequirement.classList.toggle('invalid', !/[!@#$%^&*]/.test(password));
});

// Handle sign-up form submission
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Show loading spinner
    loadingOverlay.style.display = 'flex';

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Check if passwords match
    if (password !== confirmPassword) {
        passwordErrorMessage.style.display = 'block';
        passwordErrorMessage.style.color = 'red';
        passwordErrorMessage.textContent = 'Passwords do not match.';
        loadingOverlay.style.display = 'none'; // Hide spinner
        return;
    } else {
        passwordErrorMessage.style.display = 'none';
    }

    // Construct the request body
    const requestBody = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    };

    try {
        // Make API request
        const response = await fetch('https://localhost:7094/api/User/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        // Hide loading spinner
        loadingOverlay.style.display = 'none';

        if (response.ok && result.id) {
            // Show success checkmark
            successOverlay.style.display = 'flex';

            // Store user info
            localStorage.setItem('userInfo', JSON.stringify(result));

            // Redirect to login after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            alert(result.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error during sign-up:', error);
        alert('An error occurred. Please try again later.');
        loadingOverlay.style.display = 'none'; // Hide spinner on error
    }
});
