const review=require("../models/review.js");
const listing=require("../models/listing.js");

module.exports.createreview=async(req, res) => {
    let foundlisting=await listing.findById(req.params.id);
    let newreview= new review(req.body.review);
    newreview.author=req.user._id;
    console.log(newreview);
    foundlisting.reviews.push(newreview);
    await newreview.save();
    await foundlisting.save();
    req.flash("success", "New review created!");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.deletereview=async(req, res) => {
    let {id, reviewid}=req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
    await review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}