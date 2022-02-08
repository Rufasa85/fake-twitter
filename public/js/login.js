console.log("i am login!")

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const loginObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(loginObj);
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
        //    alert("login successful!")
        location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})