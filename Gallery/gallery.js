let jsonData;
let max = 0;

//get json data from given url
(async () => {
    jsonData = await get()
    show();
    download(jsonData, 'my-json.json', 'application/json');
})()


async function get() {
    let url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
    let obj = await (await fetch(url)).json();
    return obj;
}

//download json data as file
function download(myJsonData, fileName, contentType) {
    let data = JSON.stringify(myJsonData);
    let a = document.createElement("a");
    let file = new Blob([data], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

//display gallery
function show(){
            for(let i=jsonData.length-1 ; i>0 ; i-=1){  
            $("#img").append(`<div class="col-md-2" >
                  <div class="card-body" >
                          <button class="button" id= "x${i}" >X</button>
                          <img class="img-small" id="${i}" src="${jsonData[i]["thumbnailUrl"]}" width="150" height="150" >
                  </div>                        
            </div>`)
        }
} 

    //challenge: add image to gallery
    $(document).on('change','#image-file',(e)=>{
          const file = e.target.files[0];
          const objectURL = URL.createObjectURL(file)
          //let title=$("#title").val();
          let lastId=jsonData[jsonData.length-1]["id"];
          jsonData.push({albumId:1,id: lastId+1,title:"title",url:objectURL,thumbnailUrl:objectURL})
          $("#img").empty();
          show();

    })

    //enlarge image on click
    $(document).on('click','.img-small',(e)=>{
          $("#zoomPic").empty();
            $("#zoomPic").append(`<div id="zoomPicContent"> 
               <img class="img-lrg" src="${jsonData[e.currentTarget.id]["url"]}" width="600" height="600">
            </div>`)
    })

    //back to thumbnail
    $(document).on('click','.img-lrg',()=>{
            $("#zoomPic").empty();
    })

    //remove image from gallery   
    $(document).on('click','.button',(e)=>{
         e.currentTarget.parentElement.remove();
    })
   

