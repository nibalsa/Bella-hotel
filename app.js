var express = require("express");
var path = require("path");
var ejs = require("ejs");
var app = express();
var port = process.env.port || 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressValidator = require('express-validator');

app.use(function(req,res,next) {
    res.locals.errors = null;
    next();
});

// From - https://github.com/ctavan/express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/bella_hotel");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.promise = global.promise;

var contactSchema = new mongoose.Schema({
   fName: String,
    email: String,
    phone: Number,
    comment: String
});

var contact = mongoose.model("contact", contactSchema);

//ROUTES GOES HERE !!!//

//ROOTS ROUTE - home page
app.get("/", function(req, res){
res.sendFile(path.join(__dirname+'/index.html'));
});



//INDEX - displays all the contacts that we have in the DB
app.get("/contacts", function(req,res){
    contact.find({}, function(err, allContacts){
       if(err){
           console.log(err)
       }else {
           res.render(path.join(__dirname+'/html/contacts.ejs'),{contacts:allContacts});

       };
    });
});

//CREATE - add new contacts to the DB
app.post("/contacts", function(req, res){
  req.check('email')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('Must be an email')

    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail();

  // Check Input Field
  req.check('fName', 'First Name is required').notEmpty();
  req.check('phone', 'Phone number is required').notEmpty();
  req.check('comment', 'Comment is required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    res.render(path.join(__dirname+'/html/contact-form.ejs'),{
        errors : errors
    });
  } else {
    var fName = req.body.fName;
    var email = req.body.email;
    var phone = req.body.phone;
    var comment = req.body.comment;
    var newContact = {fName:fName,email:email, phone:phone, comment:comment};
    contact.create(newContact, function(err, newlyAdded){
      if(err){
        console.log(err)
      } else {
        res.redirect("/contacts");
      }
    });
  }
});


//FORM - displays a form to make new contact
app.get("/contacts/form", function(req, res){
   res.render(path.join(__dirname+'/html/contact-form.ejs'));
});

//SHOW - shows one particular contact
app.get("/contacts/:id", function(req, res){
    contact.findById(req.params.id, function(err, foundContact){
       if(err){
           console.log(err)
       } else {
           res.render(path.join(__dirname+'/html/show.ejs'), {contact: foundContact});

       }
    });
});


//EDIT - the info we had
app.get("/contacts/:id/edit", function(req, res){
   contact.findById(req.params.id, function(err, foundContact){
      if(err){
          res.redirect("/contacts");
      } else {
          res.render(path.join(__dirname+'/html/edit.ejs'), {contact: foundContact});
      }
});


});

//UPDATE - the info we just edited
app.put("/contacts/:id", function(req, res){
   contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err, updatedContact){
       if(err){
           res.redirect("/contacts");
       } else {
           res.redirect("/contacts/" + req.params.id);
       }
   });
});

//DELETE - a contact from the list
app.delete("/contacts/:id", function(req, res){
   contact.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/contacts");
      } else {
          res.redirect("/contacts");
      }
   });

});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port);
console.log('Server running on http://localhost:%s', port);

module.exports = app ;
