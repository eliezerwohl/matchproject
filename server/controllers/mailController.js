var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport([]);

exports.mail=function(req,res){
debugger
 
// create reusable transporter object using the default SMTP transport 

 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address 
    to: 'eliezerwohl@gmail.com.com', // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<b>Hello world 🐴</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
    	debugger
        return console.log(error);
    }
    debugger
    console.log('Message sent: ' + info.response);
});
}