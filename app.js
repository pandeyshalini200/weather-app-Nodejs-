const { response } = require("express");
const express = require("express");
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post('/',(req,res)=>{
    
    const querry = req.body.cityName
    const apiKey = "6bc361bfd8bbbc1e83df74563642fda9"
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ querry +'&appid='+apiKey+'&units=metric'
    https.get(url, (response) => {
        // console.log(response.statusCode)
        response.on('data',(data) =>{
            // console.log(data);
            const weatheData = JSON.parse(data);
            // console.log(weatheData);
            const temp = weatheData.main.temp;
            const description = weatheData.weather[0].description
            // console.log(description);
            res.write("<h1>The temperature in "+querry+" is " + temp + " degree celcius</h1>")
            res.write("<p>the weather description is " + description + "</p>" )
        })
    })
})



app.listen(8000, () => console.log("our server is running at port 8000"))