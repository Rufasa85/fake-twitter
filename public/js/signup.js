console.log("i am signup!")

const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const signupObj = {
        username:document.querySelector("#signupUsername").value,
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(signupObj);
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
        //    alert("signup successful!")
        location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})