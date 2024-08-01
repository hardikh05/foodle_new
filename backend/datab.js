const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://hardikh05:qHBMaSAT5KuXuLrH@cluster0.4nficdg.mongodb.net/foodle")
const aodoSchema = mongoose.Schema({
    name: String,
    password: String,
    email:{
        type:String,
        unique:true 
    },
    mobile: {type:String,
        unique:true
     }
})


const resto=mongoose.Schema({
    name:String,
    password:String,
    email:{
        type:String,
        unique:true 
    },
    location:String,
    imageSrc:String,
    descr:String
})


const foode=mongoose.Schema({
    restId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restData',
        required:true
    },
    foodName:String,
    foodPrice:Number,
    foodDes:String,
    foodImg:String
})

const foodta=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Data',
        required:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

const data1=mongoose.model('MyOrders',foodta)
const foodel=mongoose.model('foodData',foode)
const RestModel=mongoose.model('restData',resto);
const DataModel =mongoose.model('Data', aodoSchema);

module.exports= {DataModel,RestModel,foodel,data1};
