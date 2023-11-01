const mongoose=require('mongoose');
const mongodb='mongodb://0.0.0.0:27017/Product-management-app'
mongoose.connect(mongodb,(err)=>{
    if(err)
    {
        console.log(`Unable to connect to the server : ${err}`);
    }
    else
    {
        console.log("MongoDB is connected.")
    }
});