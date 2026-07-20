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
        console.log("API Result:", result);

        if(result.success){

            fillProfileForm(result.data.profile);
            updateProfileCompletion(result.data.profile.profileCompletion);

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
    console.log("Profile Data:", profile);

    Object.keys(profile).forEach(function(key){

        const field = $(key);

        if(field){

            field.value = profile[key];

        }

    });

}

/******************************************************
 * SAVE PROFILE
 ******************************************************/

async function saveProfile(){

    const profile = {};

    const fields = [

        "fullName",
        "fatherName",
        "motherName",
        "dob",
        "gender",
        "mobile",
        "alternateMobile",
        "email",

        "state",
        "district",
        "city",
        "address",
        "pincode",

        "qualification",
        "stream",
        "passingYear",
        "percentage",

        "centre",
        "course",
        "batch",

        "experienceType",
        "experienceYears",
        "currentEmployer",
        "currentSalary",

        "technicalSkills",
        "softSkills",
        "languages",

        "preferredRole",
        "preferredIndustry",
        "preferredState",
        "preferredDistrict",
        "preferredCity",

        "expectedSalary",
        "readyToRelocate"

    ];

    fields.forEach(function(id){

        const field = $(id);

        if(field){

            profile[id] = field.value;

        }

    });

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"updateCandidateProfile",

                data:{

                    candidateID:
                    sessionStorage.getItem("candidateID"),

                    profile:profile

                }

            })

        });

        const result = await response.json();

        console.log("Save Result:",result);

        if(result.success){

            showToast(

                "Success",

                "Profile Updated Successfully.",

                "success"

            );

            updateProfileCompletion(

                result.data.profileCompletion

            );

            loadProfile();

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

        showToast(

            "Error",

            "Unable to save profile.",

            "error"

        );

    }

}

/******************************************************
 * UPDATE PROFILE COMPLETION
 ******************************************************/

function updateProfileCompletion(value){

    if(!value) return;

    const percentage = parseInt(value);

    if($("profilePercentage")){

        $("profilePercentage").textContent =
        percentage + "%";

    }

    if($("profileProgressBar")){

        $("profileProgressBar").style.width =
        percentage + "%";

    }

}
