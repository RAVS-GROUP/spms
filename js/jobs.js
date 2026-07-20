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

    const container = $("jobsContainer");

    container.innerHTML = "";

    if(jobs.length===0){

        container.innerHTML=`

            <div class="profile-card">

                <h2>No Jobs Available</h2>

                <p>
                    Currently there are no active jobs.
                </p>

            </div>

        `;

        return;

    }

    jobs.forEach(function(job){

        container.innerHTML += `

        <div class="profile-card">

            <h2>${job.jobTitle}</h2>

            <h3>${job.companyName}</h3>

            <p>

                📍 ${job.city}, ${job.state}

            </p>

            <p>

                💼 ${job.experience}

            </p>

            <p>

                🎓 ${job.qualification}

            </p>

            <p>

                💰 ₹${job.salaryMin} - ₹${job.salaryMax}

            </p>

            <p>

                👥 Vacancies : ${job.vacancies}

            </p>

            <button

                class="btn-primary"

                onclick="viewJob('${job.jobID}')">

                View Details

            </button>

        </div>

        `;

    });

    /******************************************************
 * View Job
 ******************************************************/

function viewJob(jobID){

    sessionStorage.setItem(

        "selectedJobID",

        jobID

    );

    window.location.href =

        "job-details.html";

}

}
