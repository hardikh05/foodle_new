const express = require('express');
const { RestModel } = require('../datab');
const userRouter = require("./food");
const { check2 } = require("../zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} =require("../autho");
const { authMiddleware } = require('../middleware');



const router = express.Router();
router.use("/food", userRouter);


 router.post("/restoadd",async(req,res)=>{
  const restoo=req.body;
  try {
    const exist = await RestModel.findOne({ email: restoo.email });
        if (exist) {
            res.status(400).json({
                error: "Email is already taken"
            });
            return ;
        }

        const parseDen = check2.safeParse(restoo);
        if (!parseDen.success) {
            res.status(400).json({ 
                error: "Wrong inputs",
            });
              return;
        }

        await RestModel.create({
          name: req.body.nameu,
          password: req.body.password,
          email: req.body.email, 
          location: req.body.locs,
          imageSrc:req.body.imgs,
          descr:req.body.descr
       
      })
      res.json({
        msg: "You restaurent is registered",
    });
    
  } catch (error) {
    console.error("Error creating user:");
    res.status(500).json({
        msg: "Internal server error",
    });
}

 });


router.post("/restLog",async(req,res)=>{
  try {
    
    const user = await RestModel.findOne({
      email: req.body.email,
      password: req.body.password
  });
  if (user) {
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    

    res.json({
        token: token
    })
    return;
} else if(!user){
  res.status(400).json({
      error: "email or password is wrong",
  });
  return ;
}
    
  } catch (error) {
    console.log("error");
  }
})




router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";
   
    const users=await RestModel.find({
  $or:[{
      location:{
          "$regex":filter
      }
  }]
  
    })
  
    res.json({
      user:users.map(user=>({
          nameu:user.name,
          locs:user.location,
          imgs:user.imageSrc,
          _id:user._id
      }))
    })
  })

  router.get("/restoName",async(req,res)=>{
  const user=await RestModel.findOne({
    _id:req.query.id
  })
  res.json({
    name:user.name,
    des:user.descr
  })
})

router.get("/restoDetails",authMiddleware, async(req,res)=>{
  const user=await RestModel.findOne({
    _id:req.userId
  })
  res.json({
    name:user.name,
    des:user.descr
  })
})





module.exports = router;
