const form = document.querySelector("form");
const codeInput = document.getElementById("code-input");
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileID",codeInput.value);
    //https://decent-glazing-373304.el.r.appspot.com/DownloadFile
    const response = await fetch("https://decent-glazing-373304.el.r.appspot.com/DownloadFile",{
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
        if(json.message !== "Invalid CODE Entered")
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