// INDEX page
document.addEventListener('DOMContentLoaded', function () {
    const showLoginButton = document.getElementById('show-login');
    const showRegisterButton = document.getElementById('show-register');
    const loginPopup = document.querySelector('.login-popup');
    const registerPopup = document.querySelector('.register-popup');
    const registerButton = document.getElementById('register-button');

    // Show the login popup when the login button is clicked
    showLoginButton.addEventListener('click', function () {
        loginPopup.classList.add('active');
    });

    // Show the register popup when the register button is clicked
    showRegisterButton.addEventListener('click', function () {
        registerPopup.classList.add('active');
    });

    // Close the login popup when the close button is clicked
    document.querySelector('.login-popup .close-btn').addEventListener('click', function () {
        clearLoginForm();
        loginPopup.classList.remove('active');
    });

    // Close the register popup when the close button is clicked
    document.querySelector('.register-popup .close-btn').addEventListener('click', function () {
        clearRegisterForm();
        registerPopup.classList.remove('active');
    });

    // Register button click logic
    registerButton.addEventListener('click', async function () {
        // Get provided information
        const newEmail = document.getElementById('new-email').value;
        const newPassword = document.getElementById('new-password').value;

        // Send a POST request to the server to register the user
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newEmail,
                    newPassword,
                }),
            });

            if (response.ok) {
                // Handle successful registration
                console.log('User registered successfully');
                clearRegisterForm();
                registerPopup.classList.remove('active');
            } else {
                // Handle registration error
                console.error('Error registering user');
            }
        } catch (error) {
            console.error('Error registering user', error);
        }
    });

    function clearLoginForm() {

        // TODO: Add logic to clear login form inputs
    }

    function clearRegisterForm() {
        // TODO: Add logic to clear register form inputs
    }

    // Log in button
    // log in logic here
});
