/* Code in this section executes when all HTML contents are loaded */
document.addEventListener('DOMContentLoaded', function () {

/* **************** VARIABLES SECTION BEGIN **************** */
    /* login variables declarations */
    const buttonShowLogin = document.getElementById('button-show-login');
    const popupLogin = document.querySelector('.popup-login');
    const buttonSignin = document.getElementById('button-signin');

    /* register variables declarations */
    const buttonShowRegister = document.getElementById('button-show-register');
    const popupRegister = document.querySelector('.popup-register');
    const buttonSignup = document.getElementById('button-signup');

/* **************** VARIABLES SECTION END **************** */

/* **************** LOGIN POPUP SECTION BEGIN **************** */
    /* Shows the login popup when the login button is clicked */
    buttonShowLogin.addEventListener('click', function () {
        popupLogin.classList.add('active');
    });
    /* Hides the login popup and clears the input forms when x is clicked */
    document.querySelector('.popup-login .button-close').addEventListener('click', function () {
        popupLogin.classList.remove('active');
        clearLoginForm();
    });
    /*  */
    function clearLoginForm() {
        document.getElementById("login-input-email").value =
            document.getElementById("login-input-email").defaultValue;
        document.getElementById("login-input-password").value =
            document.getElementById("login-input-password").defaultValue;
    }
    /* Handles Sign up button click */
    buttonSignin.addEventListener('click', function () {
        console.log("LOGGING IN");

        /* if logging in is successful */
        clearLoginForm();
        // TODO jump to todo.html page
        window.location.href = "todo.html";
    });
/* **************** LOGIN POPUP SECTION END **************** */

/* **************** REGISTER POPUP SECTION BEGIN **************** */
    /* Shows the register popup when the register button is clicked */
    buttonShowRegister.addEventListener('click', function () {
        popupRegister.classList.add('active');
    });
    /* Hides the register popup and clears the input forms when x is clicked */
    document.querySelector('.popup-register .button-close').addEventListener('click', function () {
        popupRegister.classList.remove('active');
        clearRegisterForm();
    });
    /*  */
    function clearRegisterForm() {
        document.getElementById("register-input-email").value =
            document.getElementById("register-input-email").defaultValue;
        document.getElementById("register-input-password").value =
            document.getElementById("register-input-password").defaultValue;
    }
    /* Handles Sign in button click */
    buttonSignup.addEventListener('click', function () {
        console.log("REGISTERING UP")
        window.location.href = "todo.html";
    });
/* **************** REGISTER POPUP SECTION END **************** */


    /*
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
                popupRegister.classList.remove('active');
            } else {
                // Handle registration error
                console.error('Error registering user');
            }
        } catch (error) {
            console.error('Error registering user', error);
        }
    });
    */
});
