const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port =process.env.PORT || 3000;

//Define Paths for Express Config
const viewPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPAth = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and iews location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPAth);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nishant Gangwar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nishant Gangwar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Nishant Gangwar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "The addresss Must be Provided",
    });
  }

  geocode(req.query.address,(error, {latitude,longitude, location} ={}) => {
      if(error) {
          return res.send({error})
      }
      forecast(latitude, longitude,(error, forecastData) => {
        if(error){
          return res.send({error})
        }
        
         res.send({
             forecast: forecastData,
             location,
             address: req.query.address
         })  
    })
  })
//   res.send({
//     forecast: "It is snowing",
//     location: "Philadelphia",
//     address: req.query.address,
//   });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Your Server is started" + port);
});
