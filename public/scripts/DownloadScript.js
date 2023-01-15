const form = document.querySelector("form");
const codeInput = document.getElementById("code-input");
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileID",codeInput.value);
    
    const response = await fetch("http://localhost:3500/DownloadFile",{
        method:"POST",
        body : formData
    }).catch((err)=>{
        const error = document.getElementById("statusMessage");
        error.textContent = "Something went wrong TRY AGAIN";
        //console.log("Error Occured");
    });
    try{
        const json = await response.json();
        console.log(json);
        if(json.message !== "Invalid CODE Entered" && json.message !== "CODE Expired")
        {
            const error = document.getElementById("statusMessage");
            error.textContent = "Downloading File";
            console.log("File download if block");
            const fileURL = json.message;
            const fileName = fileURL.split("/")[4];
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute("download",fileName);
            document.body.appendChild(link);
            link.click();
        }
        else{
            console.log("Error message else block")
            const error = document.getElementById("statusMessage");
            error.textContent = `${json.message}`;
        }
        
    }catch(err){
        const error = document.getElementById("statusMessage");
        error.textContent = "Something went wrong TRY AGAIN";
        console.log("IN catch block ");
    }
})