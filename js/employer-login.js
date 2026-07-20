/******************************************************
 Employer Login
******************************************************/

async function loginEmployer(){

    const email=$("email").value.trim();

    const password=$("password").value.trim();

    if(!email||!password){

        alert("Please enter Email & Password.");

        return;

    }

    try{

        const response=await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"loginEmployer",

                data:{

                    email:email,

                    password:password

                }

            })

        });

        const result=await response.json();

        console.log(result);

        if(result.success){

            sessionStorage.setItem(

                "employerSession",

                JSON.stringify(

                    result.data.employer

                )

            );

            alert(

                "Login Successful."

            );

            window.location.href=

                "employer-dashboard.html";

        }

        else{

            alert(

                result.message

            );

        }

    }

    catch(error){

        console.error(error);

    }

}
