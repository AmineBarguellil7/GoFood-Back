const express = require('express')
const Router=express.Router()
const User=require("../models/User")

Router.post('/addUser',async(req,res)=> {
    try {
        await User.create(
            {
                name:"amine",
                password:"amine",
                email:"amine@gmail.com",
                location:"Tunis"
            }
        )
        res.json({success:true})
    }
    catch (error) {
        console.log(error);
        res.json({success:false})
    }
})


module.exports = Router;