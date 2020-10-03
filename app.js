const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");

const app= express();

app.set('view engine',ejs);

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/")

//Users schema

const userSchema=
{
firstname:String,
lastname:String,
password:String,
mail_id:String,
created_at    : { type: Date },
updated_at    : { type: Date }
}

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
//model
const User=mongoose.model("User",userSchema);

app.route("/users")
.post(function(req,res))
{
  const newUser=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    lastname:req.body.password,
    mail_id:req.body.mail,
  })
}
