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
mail_id:String,
password:String,
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
    mail_id:req.body.mail_id,
    password:req.body.password
  });
  newUser.save(function(err))
  {
    if(!err)
    {
      res.send("Successfully added a new user.");
    }
    else{
    res.send(err);
    }
  });
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
