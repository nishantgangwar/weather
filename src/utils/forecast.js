const request = require('request');



const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+ '&lon='+ encodeURIComponent(longitude)+'&appid=5c93db55c3774ad68939ca8f1da93ea1&units=metric'
    request ({url, json: true} , (error,{body }) => {
       if(error){
          callback("Unable to connect Internet ",undefined)
       }
       else if(body.error){
          callback("Unable to find the location",undefined)
       }
       else{
          callback(undefined,'Your Temperature is ' + body.main.temp + ' And it looks like ' + body.weather[0].description)
       }
    })
 }

 
 module.exports= forecast;