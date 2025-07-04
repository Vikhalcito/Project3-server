const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new mongoose.Schema(
   {
    name: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: 2,
      maxlength: 60,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/,
        'Email format not valid',
      ],
    },

    password: {
      type: String,
      required: [true, 'Passoword is required'],
      minlength: 8,
      
    },

    age: {
      type: Number,
      min: 0,
      max: 99,
    },

    userImg: {
      type: String, // URL
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg))?$/i,
        'URL not valid',
      ],
    },

    weight: {
      type: Number, // kg
      min: 0,
    },

    height: {
      type: Number, // cm
      min: 0,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },

    description: {
      type: String,
      
    },

    userType: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    routines: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Routines',
    }
    ]
  },
  {
    timestamps: true, // Fecha de createdAt - updatedAt
    versionKey: false,
  }
);


module.exports = mongoose.model('User', userSchema )
