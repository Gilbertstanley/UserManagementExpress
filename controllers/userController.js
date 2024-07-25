let User = require('../model/user')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

let profile = async(req,res) => {
      res.send("this is profile page")
}

let transaction = async(req,res) => {  
    res.send("this is transaction page")
}

let wishlist = async(req,res) => {  
    res.send("this is wishlist page")
}

let login = async(req,res) => {
    let {inp_email,inp_password} = req.body

    let user = await User.findOne({email:inp_email}) 
    let isValidPwd = await bcrypt.compare(inp_password,user.password)
  /*   let user = await User.findOne({email:inp_email,password:inp_password})  */

  if(!isValidPwd){
    res.send("user not found")
}
else{
    let payload = {id: user.id}

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h'
        }, (err, token) => {
            if (err){
                throw err
            }
            else{
                res.send(token)
            }
        })
}
}


/* 
  if(!user){
    res.send("user not found")
}
else{
    res.json(user)
}
} */


let register = async (req,res) => {
   /*  let email = req.body.email
    let name = req.body.name
    let password = req.body.password
    console.log(req.body) */

    let {email,name,password} = req.body
    console.log(email,name,password)

////////////////////////////////// these are for bcrypt

let salt = await bcrypt.genSalt(10)
password = await bcrypt.hash(password,salt)


////////////////////////////

    let user = new User({email,name,password})
    await user.save()

////////////////////////////  these are once after jwt

let payload = {id:user.id}

jwt.sign(
    payload,
    process.env.jwt_secret,{
        expiresIn:'1h'

    },  
    (err,token) => {
        if(err){
            throw err
        }
        else{   
            res.send(token)
        }
    }
).catch(() => {
    console.log(`error signing jwt`)
})
  /*   res.send(user) */
}

module.exports={login,register,profile,transaction,wishlist}