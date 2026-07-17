/******************************************************
 * UDAYAN CARE PLACEMENT PORTAL
 * Frontend JavaScript
 * Version : 1.0.0
 ******************************************************/

/* =====================================================
   DOM HELPERS
===================================================== */

const $ = (id) => document.getElementById(id);


/* =====================================================
   COMMON UTILITIES
===================================================== */

/**
 * Remove Extra Spaces
 */

function clean(value){

    return value.trim();

}


/**
 * Show / Hide Password
 */

function togglePassword(inputID, toggleID){

    const input = $(inputID);

    const icon = $(toggleID);

    if(!input || !icon) return;

    icon.addEventListener("click",()=>{

        if(input.type==="password"){

            input.type="text";

            icon.textContent="🙈";

        }

        else{

            input.type="password";

            icon.textContent="👁";

        }

    });

}


/* =====================================================
   PROFILE COMPLETION
===================================================== */

function updateProgress(){

    const fields=[

        "shaliniID",
        "fullName",
        "mobile",
        "email",
        "dob",
        "gender",
        "password",
        "confirmPassword"

    ];

    let filled=0;

    fields.forEach(id=>{

        const field=$(id);

        if(field && clean(field.value)!==""){

            filled++;

        }

    });

    const percentage=Math.round(

        (filled/fields.length)*100

    );

    if($("progressBar")){

        $("progressBar").style.width=percentage+"%";

    }

    if($("progressText")){

        $("progressText").textContent=

            percentage+"%";

    }

}


/* =====================================================
   EVENT BINDING
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    /* Password Toggle */

    togglePassword(

        "password",

        "togglePassword"

    );

    togglePassword(

        "confirmPassword",

        "toggleConfirmPassword"

    );


    /* Progress */

    const ids=[

        "shaliniID",

        "fullName",

        "mobile",

        "email",

        "dob",

        "gender",

        "password",

        "confirmPassword"

    ];

    ids.forEach(id=>{

        const field=$(id);

        if(field){

            field.addEventListener(

                "input",

                updateProgress

            );

            field.addEventListener(

                "change",

                updateProgress

            );

        }

    });

    updateProgress();
   /* Registration Form */

const form=$("registrationForm");

if(form){

    form.addEventListener("submit",function(e){

        e.preventDefault();

        if(validateForm()){

    registerCandidate();

}

    });

}

});
/* =====================================================
   VALIDATION
===================================================== */

/**
 * Show Alert
 */

function showAlert(message){

    showToast(

        "Validation",

        message,

        "warning"

    );

}


/**
 * Validate Email
 */

function validEmail(email){

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(clean(email));

}


/**
 * Validate Mobile
 */

function validMobile(mobile){

    return /^[6-9]\d{9}$/.test(clean(mobile));

}


/**
 * Validate Password
 */

function validPassword(password){

    const regex=

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/;

    return regex.test(password);

}


/**
 * Validate Form
 */

function validateForm(){

    const shaliniID=clean($("shaliniID").value);

    const fullName=clean($("fullName").value);

    const mobile=clean($("mobile").value);

    const email=clean($("email").value);

    const dob=clean($("dob").value);

    const gender=clean($("gender").value);

    const password=$("password").value;

    const confirmPassword=$("confirmPassword").value;


    if(shaliniID===""){

        showAlert("Please enter Shalini ID.");

        return false;

    }


    if(fullName===""){

        showAlert("Please enter Full Name.");

        return false;

    }


    if(!validMobile(mobile)){

        showAlert("Please enter a valid Mobile Number.");

        return false;

    }


    if(!validEmail(email)){

        showAlert("Please enter a valid Email Address.");

        return false;

    }


    if(dob===""){

        showAlert("Please select Date of Birth.");

        return false;

    }


    if(gender===""){

        showAlert("Please select Gender.");

        return false;

    }


    if(!validPassword(password)){

        showAlert(

        "Password must contain minimum 8 characters with uppercase, lowercase, number and special character."

        );

        return false;

    }


    if(password!==confirmPassword){

        showAlert("Passwords do not match.");

        return false;

    }


    if(!$("terms").checked){

        showAlert(

        "Please accept Terms & Conditions."

        );

        return false;

    }


    return true;

}
/* =====================================================
   REGISTER CANDIDATE API
===================================================== */

async function registerCandidate(){

    const formData={

        shaliniID:clean($("shaliniID").value),

        fullName:clean($("fullName").value),

        mobile:clean($("mobile").value),

        email:clean($("email").value),

        dob:$("dob").value,

        gender:$("gender").value,

        password:$("password").value

    };

    try{

        setButtonLoading(true);

        const response = await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"registerCandidate",

                data:formData

            })

        });

        const result = await response.json();

        setButtonLoading(false);

        if(result.success){

            showToast(

                "Registration Successful",

                "Candidate ID : " +

                result.data.candidateID,

                "success"

            );

            $("registrationForm").reset();

            updateProgress();

            setTimeout(()=>{

                window.location.href="login.html";

            },3000);

        }

        else{

            showToast(

                "Registration Failed",

                result.message,

                "error"

            );

        }

    }

    catch(error){

        console.error(error);

        setButtonLoading(false);

        showToast(

            "Connection Error",

            "Unable to connect to server.",

            "error"

        );

    }

}
/* =====================================================
   TOAST NOTIFICATION
===================================================== */

function showToast(title, message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <div class="toast-title">${title}</div>

        <div class="toast-message">${message}</div>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3500);

}
/* =====================================================
   BUTTON LOADING
===================================================== */

function setButtonLoading(isLoading){

    const btn = $("registerBtn");

    if(!btn) return;

    if(isLoading){

        btn.disabled = true;

        btn.classList.add("btn-loading");

        btn.innerHTML =

        `<span class="loader"></span> Creating Profile...`;

    }

    else{

        btn.disabled = false;

        btn.classList.remove("btn-loading");

        btn.innerHTML =

        "Create Your Profile";

    }

}
