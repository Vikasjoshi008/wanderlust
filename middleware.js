const listing=require("./models/listing.js");
const expresserror=require("./utils/expresserror.js");
const {listingschema, reviewSchema}=require("./schema.js");

module.exports.isloggedin=(req, res, next)=> {
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalUrl;
        req.flash("error", "you are not the owner of this listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirecturl=(req, res, next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
}

module.exports.isowner=async (req, res, next) => {
    let {id}=req.params;
    let updlisting=await listing.findById(id);
    if(!updlisting.owner.equals(res.locals.curruser._id)){
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting=(req, res, next) => {
    let {error}=listingschema.validate(req.body);
    if(error){
        console.log(error);
        let errmsg=error.details.map((el) => el.message).join(",");
        throw new expresserror(400, errmsg);
    }else{
        next();
    }
}

module.exports.validatereview=(req, res, next) => {
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el) => el.message).join(",");
        throw new expresserror(400, errmsg);
    }else{
        next();
    }
}

const Review=require("./models/review.js");

module.exports.isreviewauthor=async (req, res, next) => {
    const {id, reviewid}=req.params;
    const review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}