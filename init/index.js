const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB= async () => {
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj) => ({...obj, owner: "68286766da4ba8adb5e21572"}));
    await listing.insertMany(initdata.data);
    console.log("data was initialised");
}

initDB();