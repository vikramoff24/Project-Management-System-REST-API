//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");

const app= express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/pmsDB",{useNewUrlParser:true,useUnifiedTopology: true })

//Users schema

const userSchema= {
  id:String,
firstname:String,
lastname:String,
mail_id:String,
password:String,
};

//model
const User=mongoose.model("User",userSchema);
app.route("/users")
.get(function(req,res)
{
  User.find(function(err,foundUsers)
  {
    if(!err)
    {
      res.send(foundUsers);
    }
    else{
      res.send(err);
    }
  });
})
.post(function(req,res)
{
  const newUser=new User({
    id:req.body.id,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    mail_id:req.body.mail_id,
    password:req.body.password
  });
  newUser.save(function(err)
  {
    if(!err)
    {
      res.send("Successfully added a new user.");
    }
    else{
    res.send(err);
    }
  });
})
.delete(function(req,res)
{
  User.deleteMany(function(err)
{
  if(!err)
  {
    console.log("Successfully deleted all the articles");
  }
  else{
    console.log(err)
  }
})
});
//////////////request targeting a specific users/////////
app.route("/users/:id")
.get(function(req,res)
{
  User.findOne({id:req.params.id},function(err,foundUser)
{
  if(foundUser)
  {
  res.send(foundUser);
  }
  else{
    res.send("No user matching with this id");
  }
});
})
.put(function(req,res)
  {
  User.update(
      {id:req.params.id},
      {id:req.body.id,
        firstname:req.body.firstname,
      lastname:req.body.lastname,
    mail_id:req.body.mail_id,
      password:req.body.password},
  {overwrite:true},
      function(err)
      {
        if(!err)
        {
          res.send("Successfully Updated users");
        }
        else(err)
        {
          console.log(err);
        }
      }
    );
  }).


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
