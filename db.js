const mongoose = require('mongoose');
const mongoURI= "mongodb+srv://anirudhk002:Krishna12@cluster0.krcwd.mongodb.net/spicebox?retryWrites=true&w=majority&appName=Cluster0"

const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,res)=>{
        console.log("Connected");
        const fetched_data=  mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(function(err,data){
            const foodCategory=mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                            global.food_items=data;
                            global.foodCategory=catData;
                        }
                        })
                });
        }
    )
}

module.exports= mongoDB;
