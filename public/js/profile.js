const newTweetForm = document.querySelector("#newTweet");
newTweetForm.addEventListener("submit",e=>{
    e.preventDefault();
    const postObj = {
        body:document.querySelector("#newTweetInput").value
    }
    fetch("/api/tweets",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

const allTagForms = document.querySelectorAll(".addTagForm");

allTagForms.forEach(tagForm=>{
    tagForm.addEventListener("submit",e=>{
        e.preventDefault();
        const newTweetData= {
            tagname:tagForm.querySelector("input[type='text']").value
        }
        const thisId = tagForm.querySelector("input[type='hidden']").value
        fetch(`/api/tweets/addtag/${thisId}`,{
            method:"POST",
            body:JSON.stringify(newTweetData),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
        console.log(newTweetData);
    })
})