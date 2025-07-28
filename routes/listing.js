const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const listing=require("../models/listing.js");
const { isloggedin, isowner, validatelisting} = require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapasync(listingcontroller.index))
.post(
    isloggedin,
    upload.single('listing[image]'),
    validatelisting, 
    wrapasync(listingcontroller.createlisting));

//new route
router.get("/new", isloggedin, listingcontroller.rendernewform);

//search route
router.get("/search", listingcontroller.searchinglistrender);

router.route("/:id")
.get( listingcontroller.showlisting)
.put(
    isloggedin,
    isowner,
    upload.single('listing[image]'),
    validatelisting,
    wrapasync(listingcontroller.updatelisting)
)    
.delete(
    isloggedin,
    isowner,
    wrapasync(listingcontroller.deletelisting)
);

//edit route
router.get("/:id/edit",
    isloggedin,
    isowner,
    wrapasync(listingcontroller.rendereditform));

module.exports= router;