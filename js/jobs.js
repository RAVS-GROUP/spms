/******************************************************
 * Jobs Module
 ******************************************************/

document.addEventListener("DOMContentLoaded",function(){

    checkSession();

    $("logoutBtn")?.addEventListener(
        "click",
        logout
    );

    loadJobs();

});


async function loadJobs(){

    try{

        const response=await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"getAllJobs"

            })

        });

        const result=await response.json();

        console.log(result);

        if(result.success){

            renderJobs(result.data.jobs);

        }

    }

    catch(error){

        console.error(error);

    }

}


function renderJobs(jobs){

    const container=$("jobsContainer");

    container.innerHTML="";

    if(jobs.length===0){

        container.innerHTML=

        "<h3>No Jobs Available.</h3>";

        return;

    }

    jobs.forEach(job=>{

        container.innerHTML+=`

        <div class="profile-card">

            <h2>${job.jobTitle}</h2>

            <p><b>${job.companyName}</b></p>

            <p>${job.city}, ${job.state}</p>

            <p>

                ₹ ${job.salaryMin}

                -

                ₹ ${job.salaryMax}

            </p>

            <button class="btn-primary">

                View Details

            </button>

        </div>

        `;

    });

}
