/******************************************************
 * Profile Module
 * --------------------------------------------
 * Version 1.0
 ******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    // Session Check
    checkSession();

    // Logout
    $("logoutBtn")?.addEventListener(
        "click",
        logout
    );

    // Load Profile
    loadProfile();

    // Save Profile
    $("profileForm")?.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            saveProfile();

        }
    );

});


/******************************************************
 * LOAD PROFILE
 ******************************************************/

async function loadProfile(){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"getCandidateProfile",

                data:{

                    candidateID:
                    sessionStorage.getItem("candidateID")

                }

            })

        });

        const result = await response.json();

        if(result.success){

            fillProfileForm(
                result.data.profile
            );

        }
        else{

            showToast(
                "Error",
                result.message,
                "error"
            );

        }

    }
    catch(error){

        console.error(error);

    }

}


/******************************************************
 * FILL PROFILE FORM
 ******************************************************/

function fillProfileForm(profile){

    Object.keys(profile).forEach(function(key){

        const field = $(key);

        if(field){

            field.value = profile[key];

        }

    });

}
