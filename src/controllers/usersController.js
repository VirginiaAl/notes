const User = require("../models/User");
const passport = require('passport')

const userCtrl = {}

userCtrl.SignupForm = (req, res) => {
    res.render('users/signup')
}

userCtrl.SignUp = async (req, res) => {
  const errors = []
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "password does not match" });
  }
   if (name==="" || email === "" || password==="") {
     errors.push({ text: "Please, introduce your name, email, password" });
   }
  if(errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password}) //para que el cliente no tenga que volver a escribirlo
  } else {
    const emailUser = await User.findOne({email})
    if(emailUser) {
      req.flash("error_msg", "The email already exists");
      res.redirect("/signup");
    }else {
      const newUser = new User({name, email, password})
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save()
      req.flash("success_msg", "You are registered :)");
      res.redirect('/login')
    }
  }  
}

userCtrl.LoginForm = (req, res) => {
  res.render("users/login");
};

userCtrl.LogIn = passport.authenticate('local', {
    failureRedirect: '/login', 
    successRedirect: '/notes',
    failureFlash: true
})

userCtrl.LogOut = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect("/");
};

module.exports = userCtrl;
