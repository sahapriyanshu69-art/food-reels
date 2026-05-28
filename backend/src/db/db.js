const mongoose=require('mongoose');


function connectDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongodb connected");
        
    })
    .catch((err)=>{
        console.log("mongodb connection error: ",err);
        
    })
}

module.exports=connectDb;