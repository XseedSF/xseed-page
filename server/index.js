const express = require('express');
var nodemailer = require("nodemailer");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "website@xseed.com.uy",
    pass: "websiteP@ssword2016"
  }
});

/*------------------SMTP Over-----------------------------*/
/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get('/send',function(req,res){

  var mailText = `Contacto del usuario, 
  Nombre: ${req.query.name} 
  Mail: ${req.query.mail} 
  Mensaje: ${req.query.text}`;
  
  var mailOptions={
    to : 'dcaceres@xseed.com.uy',
    subject : req.query.subject,
    text : mailText
  }
  
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.json({error: 'errrrrror'});
      //res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      //res.end("sent");
      res.json({data: 'send'});
    }
  });
});

/*--------------------Routing Over----------------------------*/

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
