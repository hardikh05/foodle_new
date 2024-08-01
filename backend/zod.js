const zod=require("zod");

const check= zod.object({
    name: zod.string().max(9),
    password: zod.string().min(6),
    email:zod.string().email(),
    mobile: zod.string().min(10).max(15)
})


const check2=zod.object({
    nameu: zod.string().max(12),
    password: zod.string().min(6),
    email: zod.string().email(), 
    locs: zod.string(),
    imgs:zod.string(),
    descr:zod.string()
})

const check3=zod.object({
    foodName:zod.string(),
    foodDes:zod.string(),
   

})


module.exports={
    check:check,
    check2:check2,
    check3:check3
}