const express = require('express');
const router = express.Router();
const { check3 } = require("../zod");
const{foodel, data1}=require("../datab");
const { authMiddleware } = require('../middleware');

router.post("/about", authMiddleware, async (req, res) => {
  const resi = req.body;
  try {
    const parseDen = check3.safeParse(resi);
    if (!parseDen.success) {
      res.status(400).json({ 
        error: "Wrong inputs",
      });
      return;
    }

    const exist = await foodel.findOne({
      foodName: req.body.foodName,
      restId: req.userId 
    });

    if (exist) {
      res.status(400).json({
        error: "Food name already taken"
      });
      return;
    }

    const tt = await foodel.create({
      restId: req.userId,
      foodName: req.body.foodName,
      foodPrice: req.body.foodPrice,
      foodDes: req.body.foodDes,
      foodImg: req.body.foodImg
    });

    res.json({
      msg: "Your food is registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while registering the food"
    });
  }
});




router.get("/find", async (req, res) => {
    try {
      const filter = req.query.filter;
      const restId = req.query.id;
  
      if (typeof filter !== "string") {
        // Return an error message or a default result set
        res.status(400).json({ message: "Invalid filter input" });
        return;
      }
  
      const users = await foodel.find({
        restId: restId,
        $or: [{
          foodName: {
            $regex: filter
          }
        }]
      });
  
      res.json({
        foodlist: users.map(foodlist => ({
          foodName: foodlist.foodName,
          foodPrice: foodlist.foodPrice,
          foodDes: foodlist.foodDes,
          _id: foodlist._id,
          foodImg: foodlist.foodImg,
          restId: foodlist.restId
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get("/findFood",authMiddleware, async (req, res) => {
    try {
      const restId = req.userId;
  
      
      const users = await foodel.find({
        restId: restId,
       
      });
  
      res.json({
        foodlist: users.map(foodlist => ({
          foodName: foodlist.foodName,
          foodPrice: foodlist.foodPrice,
          foodDes: foodlist.foodDes,
          _id: foodlist._id,
          foodImg: foodlist.foodImg,
          restId: foodlist.restId
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
    router.post("/Order",authMiddleware,async(req,res)=>{
        const data=req.body.order_data
        await data.splice(0,0,{Order_date:req.body.date})
        
        const eId=await data1.findOne({userId:req.userId})
        if(eId===null){
            try {
                await data1.create({
                    userId:req.userId,
                    order_data:[data]

                }).then(()=>{
                    res.json({success:true})
                })
            } catch (error) {
                console.log("error")
            }
            
        }
        else{
            try {
                await data1.findOneAndUpdate({userId:req.userId},
                    {$push:{order_data:data}}
                ).then(()=>{
                    res.json({success:true})
                })
            } catch (error) {
                console.log("error")
            }
        }
    })

    router.post('/myOrderData',authMiddleware,async (req, res) => {
        try {
            const eId = await data1.findOne({ 'userId': req.userId })
            //console.log(eId)
            res.json({orderData:eId})
        } catch (error) {
            res.send("Error",error.message)
        }
        
    
    });
    
module.exports = router;
