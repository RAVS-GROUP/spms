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

});
