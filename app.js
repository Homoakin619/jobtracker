require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const nunjucks = require('nunjucks')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression')
const helmet = require('helmet')


const apiAuthRoute = require('./routes/api/authRoute');
const jobApiRoute = require('./routes/api/jobRoute');
const pageAuthRoute = require('./routes/pages/authRoute')
const pageRoute = require('./routes/pages/pageRoute')
const errorHandler = require('./errors/error-handler');
const notFound = require('./errors/not-found')
const sessionMiddleware = require('./middlewares/sessionMiddleware');

app.use(express.json())
app.use(compression())
// app.use(helmet())

app.set('trust proxy', 1) // trust first proxy
const limit = 60 * 60 * 24 * 1000
app.use(session({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: limit}
}))
app.use(cookieParser())

app.use('/',pageAuthRoute);
app.use('/page',
sessionMiddleware,
pageRoute);
app.use('/api/v1',apiAuthRoute);
app.use('/api/v1',jobApiRoute);;


app.set("views",path.join(__dirname,"views"));
app.set("view engine","html")
nunjucks.configure("views",{
    autoescape:true,express:app
})

app.use(express.static(path.join(__dirname,"public")))
app.use(errorHandler)
app.use(notFound)


const port = process.env.PORT || 3000;
const start =  () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        app.listen(port,console.log(`Server running at ${port}`))    
    } catch (error) {
        console.log(error);
    }
}

start()