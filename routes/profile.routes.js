const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");


//Add the routes

router.get("/profile", async (req, res, next) => {

    const {_id} = req.payload

    try{
         const user  = await User.findById(_id);
         res.json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
   

})

router.put("/profile", async (req, res) => {
  const { _id } = req.payload;
  const {
    email,
    name,
    username,
    age,
    weight,
    height,
    description,
    userImg,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        name,
        username,
        age,
        weight,
        height,
        description,
        userImg,
      },
      { new: true }
    ).select(
      "_id email name username age weight height description userImg"
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;