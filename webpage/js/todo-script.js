/* Code in this section executes when all HTML contents are loaded */
document.addEventListener('DOMContentLoaded', function () {

/* **************** VARIABLES SECTION BEGIN **************** */
    /* logout variables declarations */
    const buttonLogout = document.getElementById('button-logout');

/* **************** VARIABLES SECTION END **************** */

/* **************** LOGOUT BUTTON BEGIN **************** */
    buttonLogout.addEventListener('click', function () {
        console.log("LOGGING OUT");
        window.location.href = "main.html";
    });
/* **************** LOGOUT BUTTON BEGIN **************** */

});
