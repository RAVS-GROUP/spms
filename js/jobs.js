/******************************************************
 * Jobs Module
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

    // Load Jobs
    loadJobs();

});


/******************************************************
 * LOAD JOBS
 ******************************************************/

async function loadJobs() {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "getAllJobs"

            })

        });

        const result = await response.json();

        console.log("Jobs API Result :", result);

        if (result.success) {

            renderJobs(result.data.jobs);

        }
        else {

            $("jobsContainer").innerHTML = `
                <div class="profile-card">
                    <h2>Error</h2>
                    <p>${result.message}</p>
                </div>
            `;

        }

    }
    catch (error) {

        console.error(error);

    }

}


/******************************************************
 * RENDER JOBS
 ******************************************************/

function renderJobs(jobs) {

    const container = $("jobsContainer");

    container.innerHTML = "";

    if (jobs.length === 0) {

        container.innerHTML = `

            <div class="profile-card">

                <h2>No Jobs Available</h2>

                <p>

                    Currently there are no active jobs.

                </p>

            </div>

        `;

        return;

    }

    jobs.forEach(function (job) {

        container.innerHTML += `

        <div class="profile-card">

            <h2>${job.jobTitle}</h2>

            <h3>${job.companyName}</h3>

            <p>📍 ${job.city}, ${job.state}</p>

            <p>💼 Experience : ${job.experience}</p>

            <p>🎓 Qualification : ${job.qualification}</p>

            <p>💰 ₹${job.salaryMin} - ₹${job.salaryMax}</p>

            <p>👥 Vacancies : ${job.vacancies}</p>

            <button
                class="btn-primary"
                onclick="viewJob('${job.jobID}')">

                View Details

            </button>

        </div>

        `;

    });

}


/******************************************************
 * VIEW JOB
 ******************************************************/

function viewJob(jobID) {

    console.log("Selected Job :", jobID);

    sessionStorage.setItem(

        "selectedJobID",

        jobID

    );

    window.location.href = "job-details.html";

}
