const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
      select: false, // Evita que se devuelva por defecto en los querys.
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

    hight: {
      type: Number, // cm
      min: 0,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },

    userType: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Fecha de createdAt - updatedAt
    versionKey: false,
  }
);

const User = model("User", userSchema);

module.exports = User;
