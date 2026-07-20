/******************************************************
 * Profile Module
 * --------------------------------------------
 * Version 1.0
 ******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    checkSession();

    $("logoutBtn")?.addEventListener(
        "click",
        logout
    );

});
