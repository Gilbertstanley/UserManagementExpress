let jwt = require('jsonwebtoken')
let User = require('../model/user')

let verify_token = async(req,res,next) => {
    let token = req.header('Authorization')
    if(token){
        try{
            let payload = jwt.verify(token,     process.env.jwt_secret)
            let user =  await User.findById(payload.id)
            req.user = user
            next()
        }
        catch{
            res.send('Invalid Token !!')
        }
    }
     else {
            res.send('No Access !!')
        }
    }
module.exports= verify_token