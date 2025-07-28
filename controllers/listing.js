const { query } = require("mongoose");
const listing = require("../models/listing");
const mbxgeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const maptoken=process.env.MAP_TOKEN;
const geocodingclient= mbxgeocoding({accessToken: maptoken})

module.exports.index=async (req, res) => {
    const listings= await listing.find({});
    res.render("listings/index.ejs", {listings});
}

module.exports.rendernewform=(req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showlisting=async(req, res) => {
    let {id}=req.params;
    const foundlisting= await listing.findById(id)
    .populate({path: "reviews", populate: {path: "author"}})
    .populate("owner");
    if(!foundlisting){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing: foundlisting});
};

module.exports.createlisting=async(req, res, next) => {
    let response=await geocodingclient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send();

    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url, "..", filename);
    const newlisting= new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url, filename};
    newlisting.geometry=response.body.features[0].geometry;
    let savedlisting=await newlisting.save();
    console.log(savedlisting);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.rendereditform=async(req, res) => {
    let {id}=req.params;
    const foundlisting= await listing.findById(id);
    if(!foundlisting){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalimageurl=foundlisting.image.url;
    originalimageurl=originalimageurl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing: foundlisting, originalimageurl});
};

module.exports.updatelisting=async(req, res) => {
    let {id}=req.params;
    let updatedlist=await listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        updatedlist.image={url, filename};
        await updatedlist.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletelisting=async(req, res) => {
    let {id}=req.params;
    let deletedlisting=await listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};

///searching bar 

module.exports.searchinglistrender=async (req, res) => {
  let searchTerm = req.query.query.trim().toLowerCase();
  console.log("User searched for:", searchTerm);
  const searchwords=searchTerm.split(/\s+/);
  const skipwords=["in", "on", "at", "the", "a", "an", "and", "of"];
try{
    for(let word of searchwords){
         if (skipwords.includes(word)) {
        continue; // skip common words
      }
        const regex = new RegExp(`^.*${word}.*$`, "i");
        const searchlistingsfound = await listing.find({
        $or: [
          { title: regex },
          { location: regex },
          { country: regex }
        ]
      });
      if(searchlistingsfound.length > 0) {
        console.log(`Matched word: "${word}"`);
        searchlistingsfound.forEach(list => {
        console.log(list);
        });
        return res.render("listings/searchlist.ejs", {listing: searchlistingsfound, searchQuery: req.query.query});
      }
    }
    console.log("no results found");
    return res.render("listings/searchlist.ejs", { listing: [], searchQuery: req.query.query });
}catch(err){
    console.log(err);
    req.flash("error", "something went wrong");
    return res.redirect("/listings");
};
};