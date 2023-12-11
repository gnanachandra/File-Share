const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#file-input");
const browseBtn = document.querySelector(".browseBtn");

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged"))
    {
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    uploadFile();
    if(files.length)
    {
        fileInput.files =  files;
        uploadFile();
    }
        
})

browseBtn.addEventListener("click",()=>{
    fileInput.click();
})

const uploadFile = () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("uploadedFile",file);
    console.log("Form Data: ");
    console.log(formData);
}

fileInput.addEventListener("change",()=>{
    const outputSection = document.getElementById("output");
    outputSection.classList.add("invisible");
    const loadingSection = document.getElementById("loading-section");
    loadingSection.classList.remove("invisible");
    sendFiles();
})





const form = document.getElementById("file-upload-form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("Form Submitted");
    sendFiles();
})

const sendFiles = async () =>{
    const myFiles = document.getElementById("file-input").files[0];
    const formData = new FormData();
    formData.append('file-to-be-uploaded',myFiles);
    
    const response = await fetch("https://fileshare-dot-gnanachandra.el.r.appspot.com/uploadFile",{
        method:"POST",
        body:formData
    }).catch(err=>{
        const loadingSection = document.getElementById("loading-section");
        loadingSection.classList.add("invisible");
        const outputSection = document.getElementById("output");
        outputSection.classList.remove("invisible");
        const h2 = document.querySelector("h2");
        h2.textContent = "Something went wrong !"
    })
    try{
        const json = await response.json();
        console.log(json);

        const loadingSection = document.getElementById("loading-section");
        loadingSection.classList.add("invisible");
        const outputSection = document.getElementById("output");
        outputSection.classList.remove("invisible");

        const h2 = document.querySelector("h2");
        h2.textContent = `status : ${json?.status}`;
        const urlField = document.querySelector("#url-field");
        urlField.value = `${json?.message}`;
        console.log(urlField.value);
        console.log(json);
    }
    catch(err){
        console.log(err.message)
        const h2 = document.querySelector("h2");
        h2.textContent = "something went wrong";
    }
}

const icon = document.querySelector(".copyicon");
icon.addEventListener("click",()=>{
    const url = document.getElementById("url-field").value;
    navigator.clipboard.writeText(url);
})