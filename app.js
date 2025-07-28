if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
    require('dotenv').config();

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const expresserror=require("./utils/expresserror.js");
const session=require("express-session");
const mongostore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const localstrategy=require("passport-local");
const user=require("./models/user.js");

const listingrouter=require("./routes/listing.js");
const reviewrouter=require("./routes/review.js");
const userrouter=require("./routes/user.js");

const dburl=process.env.ATLASDB_URL;

const store=mongostore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
  touchAfter: 24*3600,  
});

store.on("error", (err) => {
    console.log("error in mongo session store", err);
});

const sessionoptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxage: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));


app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.curruser=req.user;
    next();
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingrouter);
app.use("/listings/:id/reviews", reviewrouter);
app.use("/", userrouter);

app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong"}=err;
    console.log(err);
    res.render("error.ejs", {message});
    next();
});

app.listen(8080, ()=> {
    console.log("server is listening to port 8080");
});
