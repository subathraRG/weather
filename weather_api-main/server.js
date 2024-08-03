let http=require("http")
let fs=require("fs")
let url=require("url")
let https=require("https")


http.createServer((req,res)=>{

    console.log(req.url);
    if(req.url=="/") fs.readFile("./index.html",(err,dat)=>res.end(dat));
    else if(req.url=="/post"){
        console.log(req.headers);
        let end=""
        req.on("data",d=>{
            end+=d.toString();
        })
        req.on("end",()=>{
            
            console.log(end);
            end=JSON.parse(end)
            let key="4fe0bea221bc34a53a22568fac10267e";

            let link=`https://api.openweathermap.org/data/2.5/weather?q=${end.location}&appid=${key}`
            
            let ee="";
            https.get(link,re=>{
                re.on("data",d=>{
                    ee+=d.toString();
                    
                })
                
                re.on("end",e=>{
                    res.end(ee);
                    console.log(ee);
                })
                re.on("error",e=>{
                    console.log(e);
                })
            })
        })
            // let xhr=new XMLHttpRequest()
            // xhr.onreadystatechange=()=>{
            //     if(xhr.readyState==4&&xhr.status==200){
            //         console.log(xhr.responseText);
            //     }
            // }
            // xhr.open("get",link)
            // xhr.send()
            // fetch(link)
            //         .then(dat=>dat.json())
            //         .then(dat=>{
            //             result.innerHTML=Math.round( (dat.main.temp_min-273))+" &deg;C";
            //             console.log(dat);
            //         })

            
            
    }
    else fs.readFile("."+url.parse(req.url).pathname,(err,dat)=>res.end(dat))

}).listen(8066)