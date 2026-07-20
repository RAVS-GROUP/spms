document.addEventListener(

    "DOMContentLoaded",

    function(){

        checkSession();

        console.log(

            sessionStorage.getItem(

                "selectedJobID"

            )

        );

    }

);
