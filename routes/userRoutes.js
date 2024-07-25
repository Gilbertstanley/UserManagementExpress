const express = require('express')
let router = express.Router()

/* const verify_token = (req,res,next) => {

let token = req.header('Authorization')
if(token){
    console.log(token)
next()
}
else{
    res.send("No Access !!")
}
} */




// these are later imported to userController

/* let profile = (req,res) => {
    res.send(`this is profile page`)
}

let login = (req,res) => {
    res.send(`this is login page`)
}


let register = (req,res) => {
    res.send(`this is register page`)
}
 */

let {register,login,profile,transaction,wishlist} = require('../controllers/userController')
let verify_token = require('../middleware/verification')

/* router.get('/register/',register) */

router.post('/register/',register)
router.get('/login/',login)

router.post('/profile/',verify_token,profile)
router.get('/transaction',verify_token,transaction)
router.get('/wishlist',verify_token,wishlist)

module.exports = router