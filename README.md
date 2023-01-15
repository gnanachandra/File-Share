# File-Share
File sharing
Website Link : **https://decent-glazing-373304.el.r.appspot.com/**

Technology Stack :

Frontend : HTML5 , CSS3 , JS

Backend : NodeJS,Express

**Storage and Deployment :**

Files are stored in Google cloud storage bucket .

Deployed on Google cloud app engine flexible environment (node version - 16)

**How it works**

**Upload Part**

The home page (index.html) will be displayed to the use when the user enters the website
1. user clicks on **Browse** and select the file to be uploaded
2. After the file is selected a request is made to the backend (/uploadFile) to upload the file to google cloud storage bucket
3. when the file is successfully uploaded to google cloud storage an URL is created for the file.
4. The created URL is mapped with a unique id (generated by the npm package) and is stored in mongodb database
5. The unique id is returned in the response and is displayed to the user.

User copies the code and shares it to the person to whom he wants to share the file.

**Download part**
1. In the home page a link is provided to redirect to download page
2. When the user enters into download page he must enter the code (unique id) and click on download file
3. A request is sent to backend to verify the unique id (checks the database for the corresponding id)
4. if the entered id is correct the file will be displayed in the browser
5. if the entered id is wrong an error message "INVALID CODE ENTERED" will be displayed.

**TO BE IMPLEMENTED**

<del>1. code expires in 10 min</del> -> implemented

2. Responsive CSS

-> The file is being displayed in the browser instead of being downloaded because of the external url being provided.

**Sources that helped me to do this project :**

Frontend design by padhega India youtube channel : https://youtu.be/moAgOJVQw28

learned backend  (node and express) from tutorials by dave gray youtube channel : https://youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw

I have completed my Google cloud digital leader certification exam so I have little knowledge about google cloud services.
