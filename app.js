

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");


})
app.post("/" , function(req , res) {
  const Query = req.body.cityName;
  const ApiKey = "2a6d8bf9b2f6cc7c4df6763fcc95ae65";
  const unit = "metric";


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+Query+"&APPID="+ApiKey+"&units="+unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const wDescription = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p> The Weather is currently " + wDescription + " in "+ Query +"</p>");
      res.write("<h1>The temp in "+ Query+" is " + temp + "degrees Celsius</h1>");
      res.write("<img src = " + imgurl + ">");



     res.send();

   })
  })
})



// app.listen(process.env.PORT || 3000, function() {
// console.log("Server is running on port 3000");
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
