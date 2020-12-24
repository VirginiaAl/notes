const express = require ('express')
const exhbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override') //Lets use HTTP verb DELETE where the client doesn't support it.
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");



//initializations
const app = express();
require('./config/passport')
//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true, //fix issues from hbs
      allowProtoMethodsByDefault: true, //fix issues from hbs
    },
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
const MongoStore = connectMongo(session);
app.use(
  session({
    secret: "Nico",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); //errores de passport
  res.locals.user = req.user || null; //validación del usuario
  next();
})
//routes
app.use(require('./routes/indexRoutes'));
app.use(require('./routes/notesRoutes'));
app.use(require('./routes/usersRoutes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;