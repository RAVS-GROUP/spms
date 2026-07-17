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

    alert(message);

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

        const response=await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                action:"registerCandidate",

                data:formData

            })

        });

        const result=await response.json();

        if(result.success){

            alert(

                "Registration Successful!\n\nCandidate ID : "

                + result.data.candidateID

            );

            $("registrationForm").reset();

            updateProgress();

        }

        else{

            alert(result.message);

        }

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to connect to server."

        );

    }

}
