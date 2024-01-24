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
        login();
        clearLoginForm();
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
        register();
    });
/* **************** REGISTER POPUP SECTION END **************** */

    // Function to handle user registration
    function register() {
        console.log("Trying to register up");
        const email = document.getElementById('register-input-email').value.trim();
        const password = document.getElementById('register-input-password').value.trim();

        /* Empty password or email safety mechanism */
        if (!email || !password) {
            console.error('Tried to register with empty email or password');
        } else {
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("Registered successfully");
                    // ok create user specified todo to and switch page
                    window.location.href = "todo.html";
                } else if (response.status === 400) {
                    throw new Error(`E-mail and password cannot be empty`);
                } else if (response.status === 409) {
                    clearRegisterForm();
                    throw new Error(`Account already created`);
                } else {
                    throw new Error(`Failed with status: ${response.status}`);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            })
        }
    }

    // Function to handle user login
    function login() {
      const username = document.getElementById('login-input-email').value.trim();
      const password = document.getElementById('login-input-password').value.trim();

      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(response => {
          if (response.status === 200) {
            document.getElementById('login-message').innerText = 'Login successful';
          } else {
            document.getElementById('login-message').innerText = 'Invalid username or password';
          }
        })
        .catch(error => console.error('Error during login:', error));
    }
});
