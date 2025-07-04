const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");


//Add the routes

router.get("/profile", async (req, res, next) => {

    const {_id} = req.payload

    try{
         const user  = await User.findById(_id).select("_id email name");
         res.json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
   

})

router.put("/profile", async (req, res, next) => {

    const {_id} = req.payload
    const {email, name} = req.body
    try{
         const updatedUser  = await User.findByIdAndUpdate(_id, {email, name}, {new:true}).select("_id email name");
         res.json(updatedUser)
    }catch(error){
        res.status(500).json({message: error.message})
    }
   

})


module.exports = router;