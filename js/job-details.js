/******************************************************
 * Job Details Module
 ******************************************************/

document.addEventListener("DOMContentLoaded", function () {

    checkSession();

    $("logoutBtn")?.addEventListener(
        "click",
        logout
    );

    loadJobDetails();

});


/******************************************************
 * LOAD JOB DETAILS
 ******************************************************/

async function loadJobDetails() {

    try {

        const jobID = sessionStorage.getItem(
            "selectedJobID"
        );

        if (!jobID) {

            window.location.href =
                "jobs.html";

            return;

        }

        const response = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "getJobByID",

                data: {

                    jobID: jobID

                }

            })

        });

        const result = await response.json();

        console.log(result);

        if (result.success) {

            renderJob(
                result.data.job
            );

        }

        else {

            $("jobDetailsContainer").innerHTML =

                "<h2>Job Not Found</h2>";

        }

    }

    catch (error) {

        console.error(error);

    }

}


/******************************************************
 * RENDER JOB
 ******************************************************/

function renderJob(job) {

    $("jobDetailsContainer").innerHTML = `

<h2>

${job.jobTitle}

</h2>

<hr>

<p>

<b>Company :</b>

${job.companyName}

</p>

<p>

<b>Industry :</b>

${job.industry}

</p>

<p>

<b>Job Type :</b>

${job.jobType}

</p>

<p>

<b>Qualification :</b>

${job.qualification}

</p>

<p>

<b>Experience :</b>

${job.experience}

</p>

<p>

<b>Salary :</b>

₹ ${job.salaryMin} - ₹ ${job.salaryMax}

</p>

<p>

<b>Vacancies :</b>

${job.vacancies}

</p>

<p>

<b>Gender :</b>

${job.gender}

</p>

<p>

<b>Age :</b>

${job.minimumAge} - ${job.maximumAge}

</p>

<p>

<b>Location :</b>

${job.city},

${job.district},

${job.state}

</p>

<p>

<b>Interview Address :</b>

${job.interviewAddress}

</p>

<p>

<b>Interview Date :</b>

${job.interviewDate}

</p>

<p>

<b>Contact Person :</b>

${job.contactPerson}

</p>

<p>

<b>Contact Number :</b>

${job.contactNumber}

</p>

<p>

<b>Last Date To Apply :</b>

${job.lastDateToApply}

</p>

<h3>

Job Description

</h3>

<p>

${job.jobDescription}

</p>

<br>

<button

class="btn-primary"

onclick="applyJob()">

Apply Now

</button>

`;

}


/******************************************************
 * APPLY JOB
 ******************************************************/

async function applyJob() {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "applyJob",

                data: {

                    jobID: sessionStorage.getItem("selectedJobID"),

                    candidateID: sessionStorage.getItem("candidateID")

                }

            })

        });

        const result = await response.json();

        console.log(result);

        if (result.success) {

            alert("🎉 Job Applied Successfully.");

            window.location.href = "applications.html";

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}
