const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html")
});


app.post("/",function(req,res){

const query=req.body.cityName;
const key="33cca961a322480a96582825221010";
const url="https://api.weatherapi.com/v1/current.json?q="+ query +"&key="+key;
https.get(url,function(response){
  console.log(response.statusCode);


response.on("data",function(data){
const weatherData=JSON.parse(data);
const temp=weatherData.current.temp_c;
const tempCondition=weatherData.current.condition.text;
const iconUrl=weatherData.current.condition.icon;

res.write("<p>The weather is currently "+tempCondition+"<p>");
res.write("<h1>The temperature in " +query+ " is "+temp+" Degree Celcius</h1>");
res.write("<img src="+iconUrl+">");
res.send();

});
});
});



















app.listen(3000,function(){console.log("your server is listening on port 3000");});
