const newTweetForm = document.querySelector("#newTweet");
newTweetForm.addEventListener("submit", e => {
  e.preventDefault();
  const postObj = {
    body: document.querySelector("#newTweetInput").value
  };
  fetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});

const allTagForms = document.querySelectorAll(".addTagForm");

allTagForms.forEach(tagForm => {
  tagForm.addEventListener("submit", e => {
    e.preventDefault();
    const newTweetData = {
      tagname: tagForm.querySelector("input[type='text']").value
    };
    const thisId = tagForm.querySelector("input[type='hidden']").value;
    fetch(`/api/tweets/addtag/${thisId}`, {
      method: "POST",
      body: JSON.stringify(newTweetData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
    console.log(newTweetData);
  });
});

const allEditForms = document.querySelectorAll(".editForm");
allEditForms.forEach(editForm => {
  editForm.addEventListener("submit", e => {
    e.preventDefault();
    const editObj = {
      body: editForm.querySelector("textarea").value
    };
    const thisId = editForm.querySelector("input[type='hidden']").value;

    fetch(`/api/tweets/${thisId}`, {
      method: "PUT",
      body: JSON.stringify(editObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  });
});

const allDelBtns = document.querySelectorAll(".delBtn")
allDelBtns.forEach(delBtn=>{
    delBtn.addEventListener("click",e=>{
        console.log(e.target.dataset.id)
        fetch(`/api/tweets/${e.target.dataset.id}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})
