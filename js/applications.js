/******************************************************
 * Applications Module
 ******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    checkSession();

    $("logoutBtn")?.addEventListener(
        "click",
        logout
    );

    loadApplications();

});


/******************************************************
 * LOAD APPLICATIONS
 ******************************************************/

async function loadApplications(){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"getMyApplications",

                data:{

                    candidateID:

                    sessionStorage.getItem("candidateID")

                }

            })

        });

        const result = await response.json();

        console.log(result);

        if(result.success){

            renderApplications(

                result.data.applications

            );

        }

        else{

            $("applicationsContainer").innerHTML=

            "<h2>No Applications Found</h2>";

        }

    }

    catch(error){

        console.error(error);

    }

}


/******************************************************
 * RENDER APPLICATIONS
 ******************************************************/

function renderApplications(applications){

    const container=$("applicationsContainer");

    container.innerHTML="";

    if(applications.length===0){

        container.innerHTML=`

        <div class="profile-card">

            <h2>

            No Applications Yet

            </h2>

            <p>

            You have not applied for any jobs.

            </p>

        </div>

        `;

        return;

    }

    applications.forEach(function(app){

        container.innerHTML+=`

        <div class="profile-card">

            <h2>

            ${app.jobTitle}

            </h2>

            <h3>

            ${app.companyName}

            </h3>

            <p>

            📍 ${app.city}, ${app.state}

            </p>

            <p>

            📅 Applied :

            ${app.applyDate}

            </p>

            <p>

            <b>Status :</b>

            <span class="status-badge">

            ${app.currentStatus}

            </span>

            </p>

            <button

            class="btn-primary"

            onclick="viewApplication('${app.applicationID}')">

            View Details

            </button>

        </div>

        `;

    });

}


/******************************************************
 * VIEW APPLICATION
 ******************************************************/

function viewApplication(applicationID){

    sessionStorage.setItem(

        "selectedApplicationID",

        applicationID

    );

    alert(

        "Application Details Module Coming Next."

    );

}
